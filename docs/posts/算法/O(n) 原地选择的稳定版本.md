---
title: O(n) 原地选择的稳定版本
date: 2026-06-05 01:08:42
permalink: /pages/8da648/
categories:
  - 算法
description: 本文拆解了论文《Sorting multisets stably in minimum space》中的稳定选择算法，在 BFPRT 的基础上，硬扛原地、稳定、O(n) 三重约束。
---

![img](./assets/8da648-0.webp)

这次的算法主要参考 [Sorting multisets stably in minimum space](https://doi.org/10.1007/BF01178508)。论文包含 3 个算法，反划分、稳定选择、原地快速排序，这期讲稳定选择。

这次我写代码的最折磨环节（就是 debug）交给了 AI，效果还挺好，AI 仅靠分析代码就找到所有问题。

## 1. 问题定义

给定一个数组 a 和一个整数 k，要求找到第 k 小的数，功能类似 `std::nth_element`。同时限制 $O(n)$ 时间复杂度、原地（$O(1)$ 额外空间复杂度）、稳定（算法前后，相同元素相对顺序不变）。

## 2. 前置知识

### 2.1. 区间旋转

把两个相邻区间 `[A B]` 原地变成 `[B A]`，保持区间内部顺序不变。经典的做法是三次翻转法（或手摇算法），这里就不展开了。

代码里直接调用标准库的 `std::rotate`，复杂度 $O(n)$。

### 2.2. BFPRT 算法

BFPRT 又叫 Median of Medians，是一个比较有名的选择算法。在之前文章《O(n) 原地选择的不稳定版本》我们讨论过，这里就简要写一下。

第一步，中位数取中阶段，每 5 个数一组，取组内的中位数，然后把这些中位数用递归 BFPRT 的方法再取中位数作为 pivot。

第二步，淘汰阶段，根据 pivot 将数组进行三路划分，划分为小于 pivot、等于 pivot、大于 pivot 的三个区间。如果 k 落在了第 1 或 3 个区间就递归 BFPRT。

### 2.3. 原地稳定划分、反划分

这个对应了往期两篇文章，在这期就当黑盒调用了。

原地稳定划分：给定一个数组 a 和一个谓词 pred，要求将谓词为真的元素排到谓词为假的元素前面，同时要求 $O(n)$ 时间复杂度、原地（$O(1)$ 额外空间复杂度）、稳定（划分前后，谓词为真的元素相对顺序不变，谓词为假同理）。

原地稳定反划分：给定一个数组 a、一个谓词 pred 和布尔数组 placement，初始数组 a 里谓词为真的元素排在谓词为假的元素前面。要求对 a 进行重排后，每个位置的谓词和 placement 对应位置的布尔值相同，即对每个索引 i 都有 `pred(a[i]) = placement[i]`。同时要求 $O(n)$ 时间复杂度、原地（$O(1)$ 额外空间复杂度）、稳定（反划分前后，谓词为真的元素相对顺序不变，谓词为假同理）。

## 3. 恢复选择算法

这是最核心的子算法。恢复选择算法也是找第 k 小元素，但是算法结束后数组恢复原样，允许用 $O(n)$ 比特的额外空间。

恢复选择算法也是 BFPRT 的思路，同时额外空间用栈的结构维护，下文出现的“栈”就是指这个。

### 3.1. 中位数取中阶段

这一阶段对应了 BFPRT 中位数取中阶段。

5 个一组，每组取中位数（不修改数组），在栈上记录每个中位数在组内的位置，可能的值是 0 到 4。每组需要 3 比特，$\frac{n}{5}$ 组，所以需要 $\frac{3}{5}n$ 比特。

把这些中位数直接交换到数组的前 $\frac{n}{5}$ 个位置，然后递归。这一步的修改是可恢复的，根据保存的每组中位数的位置，直接交换回来。

```cpp
for (int64_t i = 0; i + group_size <= aligned_len; i += group_size) {
    RandomIt median_it =
        median(first + i, first + i + group_size);  // 这一行是伪代码，非最终代码
    stack.push(median_it - (first + i), 3);
    std::swap(first[i / group_size], *median_it);
}
```

恢复的代码是：

```cpp
for (int64_t i = aligned_len - group_size; i >= 0; i -= group_size) {
    std::swap(first[i / group_size], first[i + stack.pop(3)]);
}
```

### 3.2. 淘汰阶段

这一阶段对应了 BFPRT 淘汰阶段。

有了中位数的中位数（记为 pivot），可以进行三路划分了。

首先保存每个位置是否小于 pivot（用于恢复），需要 $n$ 比特。然后原地稳定划分为小于 pivot、大于等于 pivot 两个部分。

接下来是保存每个位置是否小于等于 pivot，同样需要 $n$ 比特。原地稳定划分为小于等于 pivot、大于 pivot 两个部分。因为划分是稳定的，不用担心第二次划分会打乱第一次的结果。

恢复时，就直接调用反划分算法即可。

```cpp
for (RandomIt i = first; i < last; i++) {
    stack.push(proj(*i) < proj(pivot), 1);
}
inplace_stable_partition(first, last, [&](T x) { return proj(x) < proj(pivot); });
for (RandomIt i = first; i < last; i++) {
    stack.push(proj(*i) <= proj(pivot), 1);
}
inplace_stable_partition(first, last, [&](T x) { return proj(x) <= proj(pivot); });
```

恢复的代码是：

```cpp
auto placement = [&](RandomIt i) { return stack.get(i - first, len); };
T pivot = first[std::ranges::count_if(std::views::iota(first, last), placement) - 1];
inplace_stable_unpartition_stub(
    first, last, [&](T x) { return proj(x) <= proj(pivot); }, placement);
for (int64_t _ : std::views::iota(0, len)) {
    stack.pop(1);
}
inplace_stable_unpartition_stub(
    first, last, [&](T x) { return proj(x) < proj(pivot); }, placement);
for (int64_t _ : std::views::iota(0, len)) {
    stack.pop(1);
}
```

### 3.3. 用栈模拟递归

父问题把状态信息存到栈里，在子问题结束后恢复状态，类似函数调用的经典做法。除了上面出现过的，还要存储当前在处理哪个阶段、k、区间左右端点。每个数是 $\log n$ 比特，相比于 $O(n)$ 的栈可以忽略。

全局状态 result 保存子问题的第 k 小值。因为元素类型是任意的，不能用比特表示，只能放全局。

```cpp
stack.push(Stage::median_of_medians, scalar_bits);
stack.push(mid - original, scalar_bits);
stack.push(first - original, scalar_bits);
stack.push(last - original, scalar_bits);
T result;
while (!stack.empty()) {
    RandomIt last = original + stack.pop(scalar_bits);
    RandomIt first = original + stack.pop(scalar_bits);
    int64_t k = stack.pop(scalar_bits);
    uint64_t stage = stack.pop(scalar_bits);
    if (stage == Stage::median_of_medians) {
        // ...
    } else if (stage == Stage::partition) {
        // ...
    } else if (stage == Stage::restore) {
        // ...
    }
}
```

## 4. 原地稳定选择算法

啃完恢复选择后，剩下的就比较轻松了。

这是一个分块算法，块大小 $O(\sqrt n)$。

### 4.1. 提取缓冲区

缓冲区就是给恢复选择算法使用的额外空间。由于恢复选择的范围是一块，缓冲区要能存储 $t=O(\sqrt n)$ 比特。

数组里的两个不同的元素 x, y 可以编码一个 bit，`x < y` 表示 0，`x > y` 表示 1，`std::swap(x, y)` 就能修改 bit。我们需要找到 t 对不同元素。

那么怎么找呢？

看前 2t 个元素，判断有没有元素出现次数大于 t（可以用摩尔投票或者直接排序后数数来判断）。如果没有，那么把 2t 个元素排序后就可以下标 $i, i+t$ 拼成一对了。

如果存在元素 x 出现次数大于 t，那么把整个数组原地稳定划分为不等于 x 和等于 x 两个部分。这两个部分各取 t 个，然后排个序就可以下标 $i, i+t$ 拼成一对了。

如果不等于 x 的个数不足 t 个，就进入失败分支：把不等于 x 的数直接排序，经过一次旋转就能让整个数组有序，这样也就完成了选择算法。

排序使用了简单的冒泡排序，复杂度 $O(t^2)=O(n)$。划分也是 $O(n)$，总复杂度 $O(n)$。

```cpp
template <typename RandomIt, typename Proj = std::identity>
bool extract_buffer(RandomIt first, RandomIt last, int64_t buffer_len, Proj proj = {}) {
    using T = std::iter_value_t<RandomIt>;
    int64_t len = last - first;
    if (len < buffer_len * 2) {
        return false;
    }
    T major = probable_major(first, first + (buffer_len * 2), proj);
    // 没有元素出现次数大于 t
    if (std::ranges::count_if(first, first + (buffer_len * 2),
            [&](T x) { return proj(x) == proj(major); }) <= buffer_len) {
        bubble_sort(first, first + (buffer_len * 2), proj);
        return true;
    }
    // 不等于 x 的个数超过 t 个
    if (std::ranges::count_if(first, last, [&](T x) { return proj(x) == proj(major); }) <=
        len - buffer_len) {
        inplace_stable_partition_stub(first, last, [&](T x) { return proj(x) != proj(major); });
        RandomIt major_it =
            std::ranges::find_if(first, last, [&](T x) { return proj(x) == proj(major); });
        bubble_sort(first, first + buffer_len, proj);
        RandomIt major_insert_it = std::ranges::find_if(
            first, first + buffer_len, [&](T x) { return proj(x) > proj(major); });
        std::ranges::rotate(major_insert_it, major_it, major_it + buffer_len);
        return true;
    }
    return false;
}
```

***

那么缓冲区具体是多大？我不想算，于是我写了个函数模拟恢复选择的区间变化，求出最坏情况的缓冲区大小。

```cpp
int64_t restoring_select_buffer_size(int64_t len) {
    constexpr int64_t group_size = 5;
    int64_t scalar_bits = ceil_log2(len + 1);
    int64_t buffer_size = 0;
    buffer_size += 4 * scalar_bits;
    while (true) {
        if (len < group_size) {
            break;
        }
        buffer_size += len * 2;
        int64_t medians = len / group_size;
        len -= (medians + 1) / 2 * 3;
        buffer_size += 4 * scalar_bits;
    }
    return buffer_size;
}
```

### 4.2. 中位数取中

划分了缓冲区后，我们对剩下的元素进行分块。在我的实现中，块大小是 $\frac{1}{4}\lfloor\sqrt n\rfloor$，因为缓冲区大约是一块大小的 $7$ 倍，减少缓冲区大小可以避免走失败分支。

对于每一块进行恢复选择算法，然后把第一个中位数旋转到块的开头（就是中间的所有元素后移一位），这样不破坏稳定性。

这时候就可以用平方复杂度的算法求每块中位数的中位数，并且不修改数组。

具体来说，先求下标最小的最小值 x，然后求大于 x（或者等于 x 并且下标大于 x）的下标最小的最小值，作为新的 x，不断重复 $k$ 次就能找到 topk 了。

为此我还写了 3 个函数，真是又凑又长（好像也只能这么长）：

```cpp
template <typename RandomIt, typename Proj = std::identity>
RandomIt strided_min_element(RandomIt first, RandomIt last, int64_t stride, Proj proj = {}) {
    // ...
}

template <typename RandomIt, typename Proj = std::identity>
RandomIt strided_next_element(
    RandomIt first, RandomIt last, int64_t stride, RandomIt x, Proj proj = {}) {
    // ...
}

template <typename RandomIt, typename Proj = std::identity>
RandomIt strided_topk(RandomIt first, RandomIt last, int64_t stride, int64_t k, Proj proj = {}) {
    assert_or_throw((last - first) % stride == 0);
    RandomIt median_it = strided_min_element(first, last, stride, proj);
    for (int64_t i = 0; i < k; i++) {
        median_it = strided_next_element(first, last, stride, median_it, proj);
    }
    return median_it;
}
```

### 4.3. 淘汰

找到中位数的中位数后，把整个数组（包括缓冲区）进行三路原地稳定划分，然后递归即可，这个和 BFPRT 算法的淘汰阶段一样。

## 5. 完整代码

[完整实现](https://github.com/axiomofchoice-hjt/TCS-Algorithms/blob/master/include/tcs/inplace/stable_select.hpp)和[测试](https://github.com/axiomofchoice-hjt/TCS-Algorithms/blob/master/tests/inplace/test_stable_select.cpp)。

## 6. 结尾

又水了一期。

这是目前为止这个系列最复杂算法，加上划分和反划分大约 1000 行，去掉也需要 400 行。不过思想并不复杂，只是在 BFPRT 上雕花罢了。

论文最后的原地快速排序会简单很多，下一期可以放松一下。
