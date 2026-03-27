---
title: BLAS GEMM 接口
date: 2024-08-17 21:03:51
permalink: /pages/d787b3/
categories:
  - AI
description: BLAS 矩阵乘法接口
---

## 1. GEMM

BLAS (Basic Linear Algebra Subprograms) 是线性代数接口的规范。

GEMM（General Matrix to Matrix Multiplication，通用矩阵乘）是 BLAS 的一部分，核心就是将两个矩阵相乘。更准确地，是给定矩阵 $A, B, C$ 和数字 $\alpha, \beta$，计算：

$$C \leftarrow \alpha A B + \beta C$$

计算的结果会把 C 的内存覆盖。

GEMM 对 $\beta=0$ 有特殊处理，公式为 $C \leftarrow \alpha A B$，即使 C 有浮点数吉祥三宝（即 inf, -inf, nan）也能正常运算。因此 C **可以**是一块未初始化的内存。

## 2. 参数

BLAS 有两套接口，CBLAS 和 BLAS (FORTRAN)。

对于 CBLAS 接口，GEMM 有 14 个参数：order, transa, transb, m, n, k, alpha, a, lda, b, ldb, beta, c, ldc，含义如下：

- order: 指定行优先顺序 (row-major order) 或列优先顺序 (column-major order)
- transa, transb: 字符类型，控制矩阵 A, B 转置（字符 N 表示不转置 NO TRANSPOSE，T 表示转置，另外还支持 Hermitian 伴随，这个我们不关心）
- m: 整数，A 的第一维
- n: 整数，B 的第二维
- k: 整数，公共维（A 的第二维、B 的第一维）
- alpha, beta: 浮点数，即公式里的两个数字
- a, b, c: 指针，指向矩阵 A, B, C 首地址（首行首列元素）
- lda, ldb, ldc: 整数，是 A, B, C 矩阵的 stride，换个说法就是用 row-major `a[i * lda + j]` / column-major `a[i + j * lda]` 访问矩阵 A 的 i 行 j 列

对于 FORTRAN 接口，少了第一个参数（只能使用列优先顺序），接下来的参数同 CBLAS 接口。

## 3. 行列优先顺序

行优先顺序，其实就是一行的元素连续储存在内存上，而不同行就需要用 lda 来索引。列优先顺序，就是一列的元素连续储存在内存上。

由于深度学习都是行优先顺序，FORTRAN 接口是列优先顺序，所以需要做一些调整。（如果用 CBLAS 接口不需要）

显然，我们可以通过参数 transa, transb 来行列交换，这样矩阵 A, B 就不需要额外转置。

第二个问题，矩阵 C 也是列优先顺序，GEMM 不提供 transc 这样的参数，怎么办？答案是将 transa, transb 取反并交换 A, B，有公式：

$$\displaystyle \left(AB\right)^{\mathrm {T} }=B^{\mathrm {T} }A^{\mathrm {T} }$$

## 4. 一些扩展

类型扩展

标准的 GEMM 只支持 4 种数据类型：

1. sgemm: 单精度矩阵乘法 (s -> single)
2. dgemm: 双精度矩阵乘法 (d -> double)
3. cgemm: 单精度复数矩阵乘法
4. zgemm: 双精度复数矩阵乘法

一般在低精度场景下，就会有 bfloat16, half, int8 的矩阵乘需求

***

batch 扩展

BMM (Batched Matrix Multiplication) 是深度学习常见的算子，它可以同时进行多个规格相同的 GEMM 运算。我们希望在 bmm 接口内完成更合理的多线程策略来提升性能。

***

pack 扩展

一般来说 GEMM 会先对数据布局进行一些调整，又叫 pack。

pack 可以让真正 GEMM 计算时访存变得友好，从而提升性能。很显然，这一步也可以放在外面做，这样进行多次 GEMM 计算就不需要再 pack 了。onednn [参考](https://www.intel.com/content/www/us/en/developer/articles/technical/introducing-the-new-packed-apis-for-gemm.html)

例如：线性层 (linear) 的权重矩阵在推理时不会改变，那就不需要每次 pack 了。

***

算子融合

如果 GEMM 运算后面还要和 bias 向量做加法（如线性层中经常会出现 bias）。如果在 GEMM 里完成，就不需要反复读写矩阵 C 的内存。cublas [参考](https://docs.nvidia.com/cuda/cublas/#cublasltepilogue-t)

## 5. 实战

这里用 OpenBLAS 做一下演示。源码构建很简单，把 [OpenBLAS](https://github.com/OpenMathLib/OpenBLAS) clone 下来，在项目根目录执行命令 `make`。

关注这两个文件：项目根目录下的 `libopenblas.so` 和 `cblas.h`

这里的代码先用随机数填充矩阵 A, B，然后用朴素的矩阵乘法（三重循环）来计算 expect 结果，用 GEMM 接口计算矩阵 c，最后计算它们的误差。

在代码里，可以控制 A, B 随机数范围来限制 C 范围，这样就能用绝对误差来评判 GEMM 正确性了。

```cpp
#include <algorithm>
#include <cstdint>
#include <random>

#include "cblas.h"

const int64_t M = 5;
const int64_t N = 4;
const int64_t K = 10;
float a[M * K];
float b[K * N];
float c[M * N];
float expect[M * N];
const int64_t lda = K;
const int64_t ldb = N;
const int64_t ldc = N;

int main() {
    // 随机生成输入
    std::mt19937_64 gen(std::random_device{}());
    std::uniform_real_distribution<float> uniform(0, 1);
    for (int64_t i = 0; i < M; i++) {
        for (int64_t j = 0; j < K; j++) {
            a[i * lda + j] = uniform(gen);
        }
    }
    for (int64_t i = 0; i < K; i++) {
        for (int64_t j = 0; j < N; j++) {
            b[i * ldb + j] = uniform(gen);
        }
    }

    // 朴素矩阵乘法
    for (int64_t i = 0; i < M; i++) {
        for (int64_t j = 0; j < N; j++) {
            float t = 0;
            for (int64_t k = 0; k < K; k++) {
                t += a[i * lda + k] * b[k * ldb + j];
            }
            expect[i * ldc + j] = t;
        }
    }

    // 调 GEMM 接口
    cblas_sgemm(CblasRowMajor, CblasNoTrans, CblasNoTrans, M, N, K, 1, a, lda,
                b, ldb, 0, c, ldc);

    // 计算误差
    float err = 0;
    for (int64_t i = 0; i < N; i++) {
        for (int64_t j = 0; j < M; j++) {
            err = std::max(err, c[i * ldc + j] - expect[i * ldc + j]);
        }
    }
    printf("%.9f\n", err);
}
```

编译和运行命令如下：

（用静态链接）

```sh
export OpenBLAS_PATH=/path/to/openblas
g++ main.cc $OpenBLAS_PATH/libopenblas.a -I $OpenBLAS_PATH -o main
./main
```

（用动态链接）

```sh
export OpenBLAS_PATH=/path/to/openblas
g++ main.cc $OpenBLAS_PATH/libopenblas.so -I $OpenBLAS_PATH -o main
LD_LIBRARY_PATH=$OpenBLAS_PATH ./main
```

运行结果会输出绝对误差，大概在 $10^{-7}$ 量级，这是求和顺序不同导致结果不一致。
