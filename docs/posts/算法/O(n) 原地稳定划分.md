---
title: O(n) 原地稳定划分
date: 2026-05-02 00:08:00
permalink: /pages/0d69d8/
categories:
  - 算法
description: 本文深入解析 O(n) 原地稳定划分（0‑1 排序）的完整实现方案。通过提取缓冲区、在 Word 和缓冲区内编码目标位置、块同质化与块增长等技巧，将原论文中晦涩的部分简化为常数次分块倍增过程，最终以 200 余行 C++ 代码完整实现。文章兼顾算法思路、实现细节与踩坑记录，适合想要理解并复现该经典算法的读者。
---

![img](./assets/0d69d8-0.webp)

这是一个非常复杂的学术算法，研究过程非常曲折。原论文有点难懂，我只好自己构造算法框架，也算是对原论文做了一些简化。

主要参考的论文是 [Stable Minimum Space Partitioning in Linear Time](https://doi.org/10.1007/BF01994842)。

## 1. 问题定义

给定一个数组 a 和一个谓词 pred，要求将谓词为真的元素排到谓词为假的元素前面，同时要求 $O(n)$ 时间复杂度、原地（$O(1)$ 额外空间复杂度）、稳定（划分前后，谓词为真的元素相对顺序不变，谓词为假同理）。

这个问题其实等价于 $O(n)$ 原地稳定 0-1 排序（元素的 key 只有 0 和 1），后面会按 0-1 排序来讲。

算法选用的模型是最常用的 Word RAM。Word RAM 模型的存储单元是 Word，可容纳 w 比特，要求刚好能表示内存里每个存储单元的地址。一个 Word 能存储指针，但是存不了更多的信息。这个特性会在算法里用到。

这里要说明一下，代码里出现的 proj 是把元素映射为 0/1，用于 0-1 排序；`stable_collect_first_n` 里出现的 pred 是谓词，意思是将 pred 为真的元素收集起来。注意一下这个区别。

## 2. 前置算法

### 2.1. 区间旋转

把两个相邻区间 `[A B]` 原地变成 `[B A]`，保持区间内部顺序不变。经典的做法是三次翻转法（或手摇算法），这里就不展开了。

代码里直接调用标准库的 `std::rotate`，复杂度 $O(n)$。

### 2.2. 0-1 归并

0-1 归并就是合并两个有序的 0-1 数组。做法非常简单，用区间旋转把左边数组的 1 和右边数组的 0 交换一下。

复杂度 $O(n)$。

```cpp
template <typename T, typename Proj>
void inplace_01_merge(T* first, T* last, Proj proj) {
    T* split_left = std::find_if(first, last, proj);
    T* mid = std::find_if(split_left, last, [proj](T x) { return proj(x) == 0; });
    T* split_right = std::find_if(mid, last, proj);
    std::rotate(split_left, mid, split_right);
    assert_or_throw(std::is_sorted(first, last, [proj](T a, T b) { return proj(a) < proj(b); }));
}
```

### 2.3. 计数排序

计数排序，假设要排 n 个数，值域是 $[0, m - 1]$。先开个长度 m 的计数数组，遍历 n 个数统计每个值出现的频次。然后计数数组求 exclusive scan（一种前缀和，结果的第一个数是 0）或 inclusive scan。

再遍历一次 n 个数，对于每个数，取出它在计数数组中当前值作为它的目标位置，并将该计数加 1。

此时如果没有原地要求，就开个 buffer 暂存排序好的 n 个数，最后移动回原数组。代码如下：

```cpp
void counting_sort(std::vector<int>& arr) {
    std::vector<int> count(*std::max_element(arr.begin(), arr.end()) + 1, 0);
    for (int64_t i = 0; i < int64_t(arr.size()); i++) {
        count[arr[i]]++;
    }
    int sum = 0;
    for (int64_t i = 0; i < int64_t(count.size()); i++) {
        int tmp = count[i];
        count[i] = sum;
        sum += tmp;
    }
    std::vector<int> buffer(arr.size());
    for (int64_t i = 0; i < int64_t(arr.size()); i++) {
        buffer[count[arr[i]]] = arr[i];
        count[arr[i]]++;
    }
    arr = buffer;
}
```

如果计数排序有原地要求，只能先存 n 个数的目标位置（怎么存后面讲），然后进行原地置换。

### 2.4. 原地置换

什么是原地置换算法 (in-place permutation)？置换或者排列有一个性质，把 n 个位置看成点，从其初始位置向目标位置连一条有向边，就会形成若干个不相交的环。

算法会依次处理每个环，沿着环的方向绕一圈，通过交换操作将每个元素移动到正确位置。每当一个位置被正确处理，就将目标数组中该位置的值修改为当前索引，表示该位置已处理过，从而避免重复移动。

```cpp
void inplace_permutation(std::vector<int>& arr, std::vector<int>& dests) {
    for (int64_t i = 0; i < int64_t(arr.size()); i++) {
        for (int64_t j = dests[i]; j != i;) {
            std::swap(arr[i], arr[j]);
            int64_t next = dests[j];
            dests[j] = j;
            j = next;
        }
        dests[i] = i;
    }
}
```

由于 0-1 排序只有 01 两个值，所以计数数组只有两个，特别简单。因此复杂度 $O(n)$，不用考虑值域。

## 3. O(n) 原地稳定划分

### 3.1. 提取缓冲区

我们需要 $2\sqrt n$ 个元素作为缓冲区，要求一半 0 一半 1。0 和 1 一一配对，它们可以提供两个状态（按顺序是 01 和 10），也就是 1 bit 信息；一共 $\sqrt n$ bit，这在后续步骤会用到。

提取过程类似反过来的旋转归并算法。首先收集 0：找第 1 个 0，把它旋转到第 2 个 0 前面，然后把第 1、2 个 0 一起旋转到第 3 个 0 前面。不断这么做直到收集到 $\sqrt n$ 个 0，然后把这些 0 旋转到数组开头。

1 也是同理。

对于 $\sqrt n$ 个收集的元素，它们最多被旋转 $O(\sqrt n)$ 次，乘起来就是复杂度 $O(n)$。其他 $O(n)$ 个元素都最多被旋转 1 次，复杂度也是 $O(n)$。

```cpp
template <typename T, typename Pred>
std::tuple<T*, T*, T*> stable_collect_first_n(T* first, T* last, int64_t n, Pred pred) {
    T* collect = first;
    int64_t count = 0;
    for (T* iter = first; iter < last; iter++) {
        if (count < n && pred(*iter)) {
            std::rotate(collect, collect + count, iter);
            collect = iter - count;
            count++;
        }
    }
    std::rotate(first, collect, collect + count);
    return {first, first + count, last};
}
```

如果缓冲区 0 或 1 的数量不够，那收集完后再进行一次旋转就能排好整个数组，可以提前退出算法了。

### 3.2. word-base 存储器

计数排序需要一个地方存目标数组，可以把它存到 Word 里。Word 只能存整个数组的一个索引，但对于 $\frac{\log n}{\log \log n}$ 长度的子数组就不一样了。Word 有 $\log n$ 比特，子数组的索引不超过 $\log \log n$ 比特，除一下是 $\frac{\log n}{\log \log n}$ 个索引，正好放下目标数组。

这里提供存储器的实现，get / set 复杂度 $O(1)$。

```cpp
struct WordStorage {
    int64_t element_bits;
    uint64_t word = 0;

    WordStorage(int64_t element_bits) : element_bits(element_bits) {}

    uint64_t get(int64_t index) const { return (word >> (index * element_bits)) & ((uint64_t{1} << element_bits) - 1); }

    void set(int64_t index, uint64_t value) {
        auto slot_mask = ((uint64_t{1} << element_bits) - 1) << (index * element_bits);
        word = (word & ~slot_mask) | (static_cast<uint64_t>(value) << (index * element_bits));
    }

    void reset() { word = 0; }
};
```

### 3.3. buffer-base 存储器

缓冲区也是类似。对于 $\frac{\sqrt n}{\log n}$ 的子数组，缓冲区可以存储 $\sqrt n$ 比特，子数组的索引不超过 $\log n$ 比特，除一下是 $\frac{\sqrt n}{\log n}$ 个索引，正好放下目标数组。

这里提供存储器的实现，get / set 复杂度 $O(\log B)$，B 为子数组大小。

```cpp
template <typename T, typename Proj>
struct BufferStorage {
    T* buf0;
    T* buf1;
    int64_t buffer_len;
    int64_t element_bits;
    Proj proj;

    static_assert(std::is_invocable_v<Proj, T>);

    BufferStorage(T* buf0, T* buf1, int64_t buffer_len, int64_t element_bits, Proj proj)
        : buf0(buf0), buf1(buf1), buffer_len(buffer_len), element_bits(element_bits), proj(proj) {}

    uint64_t get(int64_t index) const {
        uint64_t res = 0;
        for (int64_t i = 0; i < element_bits; i++) {
            res |= uint64_t(proj(buf0[index * element_bits + i])) << i;
        }
        return res;
    }

    void set(int64_t index, uint64_t value) {
        for (int64_t i = 0; i < element_bits; i++) {
            if (uint64_t(proj(buf0[index * element_bits + i])) != ((value >> i) & 1)) {
                std::swap(buf0[index * element_bits + i], buf1[index * element_bits + i]);
            }
        }
    }

    void reset() {
        for (int64_t i = 0; i < buffer_len / element_bits; i++) {
            set(i, 0);
        }
    }
};
```

### 3.4. 块间排序

基于上面计数排序、原地置换和存储器，我们可以完成多个块的排序（要求每个块是纯 0 或纯 1）。这里代码是对算法的一些整合。

复杂度 $O(B(S+T))$，B 是块数量，S 是块大小，T 是存储器 get / set 的复杂度。对于 word-base 存储器，T 是 $O(1)$ 不用担心复杂度。对于 buffer-base 存储器，T 是 $O(\log B)$ 约等于 $O(\log n)$，因此 buffer-base 块排序有个门槛 $S \ge T = O(\log n)$，来保证不会超过 $O(n)$。（这个结论不好讲明白，先记住）

```cpp
template <typename T, typename Proj, typename Storage>
void sort_blocks_impl(T* first, T* last, int64_t block_size, Proj proj, Storage& storage) {
    static_assert(std::is_invocable_v<Proj, T>);
    int64_t n_blocks = (last - first) / block_size;
    if (n_blocks <= 1) {
        return;
    }
    int64_t n_zeros = block_count_if(first, last, block_size, [&proj](T x) { return proj(x) == 0; });
    std::array<int64_t, 2> pointers = {0, n_zeros};
    for (int64_t i = 0; i < n_blocks; i++) {
        int64_t key = proj(first[i * block_size]);
        storage.set(i, pointers[key]);
        pointers[key]++;
    }
    for (int64_t i = 0; i < n_blocks; i++) {
        for (int64_t j = storage.get(i); j != i;) {
            std::swap_ranges(first + i * block_size, first + (i + 1) * block_size, first + j * block_size);
            int next = storage.get(j);
            storage.set(j, j);
            j = next;
        }
        storage.set(i, i);
    }
    storage.reset();
}
```

### 3.5. 块同质化

对于 k 个块，如果块内都已经有序，可以快速把前 k - 1 个块变为同质块（块内是纯 0 或纯 1）。

只要从左到右遍历相邻的两个块。如果两个块的 0 个数大于等于块大小，就用旋转把左边块填充 0，右边还是有序；否则左边块填充 1，右边还是有序。具体细节在代码里呈现。

每个元素被旋转常数次，因此复杂度为 $O(n)$。

```cpp
template <typename T, typename Proj>
void homogenize_blocks(T* first, T* last, int64_t block_size, Proj proj) {
    assert_or_throw((last - first) % block_size == 0);
    int64_t n_blocks = (last - first) / block_size;
    for (int64_t i = 0; i + 2 <= n_blocks; i++) {
        T* left = first + i * block_size;
        T* mid = left + block_size;
        T* right = mid + block_size;
        assert_or_throw(std::is_sorted(left, mid, [proj](T a, T b) { return proj(a) < proj(b); }));
        assert_or_throw(std::is_sorted(mid, right, [proj](T a, T b) { return proj(a) < proj(b); }));
        T* split_left = std::find_if(left, mid, proj);
        T* split_right = std::find_if(mid, right, proj);
        int64_t n_zeros = (split_left - left) + (split_right - mid);
        if (n_zeros >= block_size) {
            // 00000111 00000011 -> 00000[111 | 000000]11 -> 00000000 00011111
            std::rotate(split_left, mid, split_right);
        } else {
            // 00011111 00111111 -> [000 | 11111] 00111111 -> 11111000 00111111
            std::rotate(left, split_left, mid);
            split_left = mid - split_left + left;
            // 11111000 00111111 -> 11111[000 00 | 111]111 -> 11111111 00000111
            std::rotate(split_left, split_right, split_right + (mid - split_left));
        }
    }
}
```

### 3.6. 块增长

块同质化和块间排序结合，就可以把 k 个大小为 b 的有序块合并为 1 个有序块。

首先用块同质化把前 k - 1 块变为纯 0 或纯 1 块（同质块），然后用计数排序把同质块排序，最后用 0-1 归并完成最后一块的处理。

这里的计数排序有两种，所以块增长也有两种方案。word-base 块增长系数 $k \approx \frac{\log n}{\log \log n}$，buffer-base 块增长系数 $k \approx \frac{\sqrt n}{\log n}$，但是要求初始块大小大于等于 $\log n$。

在实现上，增长系数可以用如下代码计算：

```cpp
int64_t len = last - first;
int64_t max_word_bits = ceil_log2(len);
int64_t buffer_len = std::floor(std::sqrt(len));
int64_t max_blocks_for_word = 1;
while ((max_blocks_for_word + 1) * ceil_log2(max_blocks_for_word + 1) <= max_word_bits) {
    max_blocks_for_word++;
}
int64_t max_blocks_for_buffer = 1;
while ((max_blocks_for_buffer + 1) * ceil_log2(max_blocks_for_buffer + 1) <= buffer_len) {
    max_blocks_for_buffer++;
}
```

因此策略是，先用无门槛的 word-base 块增长 2 次，块大小变为 $\frac{\log^2 n}{(\log\log n)^2}$，达到了 buffer-base 块增长的门槛 $\log n$。然后用 3 次缓冲区块增长，变为 $\frac{n^{1.5}}{\log n\cdot (\log\log n)^2}$。这个块大规模数据可以证明大于等于 n，也就完成整个数组的排序。小规模数据逐一测试即可。

我在一开始用的是多层分块，但是实现起来太困难了。因为 $\log n$、$\sqrt n$ 不是整数，向上或向下取整很容易导致某一层分块数太多，超出 Word 或缓冲区大小。

***

数组长度不一定是块大小的倍数，不对齐部分的处理是很“脏”的工作。

得益于块增长的设计，只要把不对齐部分隔离出来，完成块同质化、块间排序、最后一块合并后，再用 0-1 归并把不对齐部分合入数组。（看似简单，其实我尝试了好多想法才搞出来）

```cpp
// block_size 是小块的大小，merge_size 是大块的大小
int64_t merge_size = block_size * k;
for (int64_t start = 0; start < len; start += merge_size) {
    int64_t end = std::min(start + merge_size, len);
    int64_t end_l2_aligned = end / block_size * block_size;
    int64_t mid = std::max(start, end_l2_aligned - block_size);
    homogenize_blocks(first + start, first + end_l2_aligned, block_size, proj);
    sort_blocks(first + start, first + mid, block_size, ...);
    inplace_01_merge(first + start, first + end_l2_aligned, proj);
    inplace_01_merge(first + start, first + end, proj);
}
block_size = merge_size;
```

### 3.7. 归还缓冲区

缓冲区也是一个有序区间，用 0-1 归并即可归还。

```cpp
inplace_01_merge(buf0, last, proj);
```

## 4. 完整代码

[完整实现](https://github.com/axiomofchoice-hjt/TCS-Algorithms/blob/master/include/tcs/inplace/stable_partition.hpp)和[测试](https://github.com/axiomofchoice-hjt/TCS-Algorithms/blob/master/tests/inplace/test_stable_partition.cpp)。

## 5. 一个争议点

将多个数放到一个 Word 里（Word 压位“作弊”），这在原地算法领域是有争议的，反对者认为应该禁止位运算阻止这个操作。

那么禁止了位运算还能实现吗？还真可以，论文名叫 Radix Sorting With No Extra Space。这个论文非常重量级，可以 $O(n)$ 完成原地基数排序，以后有机会再来探讨。

## 6. 原论文说了什么

原论文写得很简单，将数组按 $\log n$ 大小分块，块内用 Word 存储计数器和标记进行排序，然后块同质化。块间排序依赖另一篇复杂得多的论文，可以 $O(n\log n)$ 复杂度、$O(n)$ 次移动、原地稳定排序，元素的 key 要求可以枚举。

但是块内排序写的太模糊，难以理解，我只能 2 次块增长来替代这一步骤。块间排序更是硬核，我只能 3 次块增长替代这一步骤。

这样虽然不是很优雅，但可以 200 多行代码完整实现，也是一个值得记录的想法。
