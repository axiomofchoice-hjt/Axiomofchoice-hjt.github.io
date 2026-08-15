---
title: O(n) 原地归并的稳定版本
date: 2026-04-12 17:07:28
permalink: /pages/326ae9/
categories:
  - 算法
description: 在常数空间下实现稳定归并的完整工程化方案：基于分块、唯一值提取与双/单缓冲区设计，将原地归并推进到 $O(n)$ 时间，并进一步支撑稳定的 $O(n\log n)$ 原地归并排序。
---

![img](./assets/326ae9-0.webp)

写代码用时 1 天半，麻了。

这是一个很复杂精妙的学术算法。以这个算法为基础，归并排序可以同时满足稳定、原地、$O(n\log n)$ 时间，可以说非常神奇了。

本文是 [O(n) 原地归并的不稳定版本](/pages/c829b5/) 的后续，推荐先看不稳定版本（相对简单一点），有助于理解稳定版本。

## 1. 前置知识

[O(n) 原地归并的不稳定版本](/pages/c829b5/) 介绍的一些知识点：

原地归并是什么（不是归并排序，只是归并）。

缓冲区双指针归并算法，用 swap 把 `(first, mid), (mid, last)` 归并到 output 开始的位置。

```cpp
template <typename T>
void merge_with_swap(T* output, T* first, T* mid, T* last);
```

区间旋转算法，直接用标准库的 `std::rotate`。

旋转归并算法，用 rotate 原地归并两个数组，复杂度 $O(l^2+r)$ 或者 $O(l+r^2)$。但是和上一篇文章相比，需要快速过滤相同数，让复杂度变为 $O(l\cdot l'+r)$ 或者 $O(l+r\cdot r')$，l' r' 是左右数组不同数的个数。

（代码里的 `if (mid - first < last - mid)` 改成 $l\cdot l' < r\cdot r'$ 就完美了，不过不影响本文的结论）

```cpp
template <typename T>
void inplace_merge_with_rotation(T* first, T* mid, T* last) {
    if (mid - first < last - mid) {  // 左数组向右滚动 O(l * l' + r)
        while (first < mid && mid < last) {
            T* split_right = mid;
            while (split_right < last && *split_right < *first) {
                split_right++;
            }
            if (mid != split_right) {
                std::rotate(first, mid, split_right);
            }
            first += (split_right - mid);
            mid = split_right;
            if (mid != last) {
                first++;
                while (first < mid && *first == *(first - 1)) {
                    first++;
                }
            }
        }
    } else {  // 右数组向左滚动 O(l + r * r')
        while (first < mid && mid < last) {
            T* split_left = mid;
            while (split_left > first && *(split_left - 1) > *(last - 1)) {
                split_left--;
            }
            if (mid != split_left) {
                std::rotate(split_left, mid, last);
            }
            last -= (mid - split_left);
            mid = split_left;
            if (first != mid) {
                last--;
                while (mid < last && *last == *(last - 1)) {
                    last--;
                }
            }
        }
    }
}
```

## 2. 稳定原地归并 in O(n) time

这依旧是一个分块算法，我们定义块大小 $s=\lfloor \sqrt{n} \rfloor$。

### 2.1. 提取唯一值

不稳定版本文章的预告里说过，“块间排序”“块间合并”都是不稳定的，需要有 labels 标记块的先后顺序。这里需要 $n/s$ 个唯一值。

同时，缓冲区归并算法也会把缓冲区打乱，为了保证稳定性，缓冲区也必须由唯一值组成。这里需要 $s$ 个唯一值。

因此有两个缓冲区。

对于一个有序数组可以用倒着的旋转归并算法（旋转拆分算法？）提取唯一值，把唯一值提取到数组开头：

```cpp
template <typename T>
std::tuple<T*, T*, T*> stable_unique_limit(T* first, T* last, int64_t max) {
    T* left = first;
    T* right = first;
    int64_t len = 0;
    for (T* iter = first; iter < last; iter++) {
        if (len < max && (left == right || *(right - 1) != *iter)) {
            std::rotate(left, right, iter);
            len++;
            right = iter + 1;
            left = right - len;
        }
    }
    std::rotate(first, left, right);
    return {first, first + len, last};
}
```

复杂度是 $O(n+m^2)$，m 是唯一值个数。为了不让复杂度爆炸，我们只要提取 $s + n/s$ 个唯一值，用参数 max 保证复杂度 $O(n+(s + n/s)^2) = O(n)$。

***

那么两个有序数组怎么提取唯一值？答案是“两杯水倒来倒去”。

我们先提取右边数组，把这些唯一值用旋转归并算法归并到左边数组，然后提取左边数组就行了。

```cpp
template <typename T>
std::tuple<T*, T*, T*, T*> stable_unique_limit(T* first, T* mid, T* last, int64_t max) {
    T* original_mid;
    T* original_first;
    std::tie(original_mid, mid, last) = stable_unique_limit(mid, last, max);
    inplace_merge_with_rotation(first, original_mid, mid);
    std::tie(original_first, first, mid) = stable_unique_limit(first, mid, max);
    return {original_first, first, mid, last};
}
```

在这里就有个问题，唯一值不到 $s + n/s$ 个怎么办？不用担心，后面会讲唯一值不够的单缓冲区算法。我们先讲唯一值足够的双缓冲区算法。

## 3. 双缓冲区算法

### 3.1. 分块和对齐

把 A, B 数组划分为大小 s 的块。处理不整除的部分（非对齐部分）是很让人头疼的问题，但是如果我不考虑性能，就很简单了。

依旧是两杯水倒来倒去，我们把左边数组不对齐部分合并到右边数组（旋转合并算法），右边不对齐部分直接截断即可。不对齐部分在最后一步会处理。

不对齐部分不超过 $O(s)$，旋转合并复杂度是 $O(s^2+n)=O(n)$。

```cpp
template <typename T>
std::tuple<T*, T*, T*, T*> align_blocks_limit(T* first, T* mid, T* last, int64_t block_size, int64_t n_blocks) {
    assert_or_throw(block_size > 0 && n_blocks > 0);
    assert_or_throw(block_size * n_blocks <= static_cast<int64_t>(last - first));
    T* original_mid = mid;
    T* original_last = last;
    mid = first + (mid - first) / block_size * block_size;
    inplace_merge_with_rotation(mid, original_mid, last);
    last = first + block_size * n_blocks;
    if (mid > last) {
        inplace_merge_with_rotation(last, mid, original_last);
        mid = last;
    }
    return {first, mid, last, original_last};
}
```

### 3.2. 块间排序

我们需要第一缓冲区作为 labels，labels 是怎么用的？

众所周知 `std::sort` 是不稳定算法，一个把它变稳定的方法是，用初始下标作为比较的第二关键字：

```cpp
void unstable_sort(std::vector<int> &arr) {
    std::sort(arr.begin(), arr.end());  // 直接调用是不稳定的
}

void stable_sort(std::vector<int> &arr) {
    std::vector<std::pair<int, int>> buf(arr.size());
    for (int64_t i = 0; i < arr.size(); i++) {
        buf[i] = {arr[i], i};  // 下标 i 作为第二关键字
    }
    std::sort(buf.begin(), buf.end());  // 保证稳定
    for (int64_t i = 0; i < arr.size(); i++) {
        arr[i] = buf[i].first;
    }
}
```

当然这只是演示，原地算法是不允许额外开一个 buf 数组的，我们可以第一缓冲区。

虽然第一缓冲区元素的值不是下标，但是大小关系和下标是等价的（因为由唯一值组成）。

使用选择排序是保证复杂度 $O(n)$，原因在上一篇文章有讲。

```cpp
template <typename T>
void block_selection_sort(T* first, T* last, T* labels, int64_t block_size) {
    int64_t n_blocks = (last - first) / block_size;
    for (int64_t cur = 0; cur < n_blocks; cur++) {
        int64_t min = cur;
        for (int64_t scan = cur + 1; scan < n_blocks; scan++) {
            if (std::pair{first[min * block_size], labels[min]} > std::pair{first[scan * block_size], labels[scan]}) {
                min = scan;
            }
        }
        if (min != cur) {
            std::swap_ranges(first + cur * block_size, first + (cur + 1) * block_size, first + min * block_size);
            std::swap(labels[cur], labels[min]);
        }
    }
}
```

### 3.3. 块间合并

依旧是最核心的一个步骤。

假设你已经知道上一篇文章讲的块间合并流程了，第二缓冲区的作用就是这个算法的缓冲区。

因为经过了块间排序，一开始元素的大小关系可以用所在块的 label 来辅助计算。但是归并算法会把左右数组交错在一起，没有那么多 labels 标记，怎么保证稳定性呢？

实际上，我们只要关注归并后数组的最后一部分（最后的连续的属于同一数组的数），其余部分不参与下一次归并。

如果归并的两个块一开始属于同一数组，那下一次归并关注完整块。

如果不属于，假设需要合并的两块是 `[A0, A1, A2, A3] [B0, B1, B2, B3]`，归并完后是 `[A0, B0, B1, A1, B2, B3, A2, A3]`。下一次归并只要关注 `[A2, A3]` 即可，因为后续的 B 数组一定大于 B3。这样 `[A0, B0, B1, A1, B2, B3]` 就是最小的几个数了。

复杂度同上一篇文章所说，$O(n)$。

```cpp
template <typename T>
std::tuple<T*, T*, T*> merge_with_swap(T* output, T* first, T* mid, T* last, T* labels) {
    T* left_ptr = first;
    T* right_ptr = mid;
    while (left_ptr < mid && right_ptr < last) {
        if (std::pair{*left_ptr, labels[1]} <= std::pair{*right_ptr, labels[2]}) {
            std::swap(*output, *left_ptr);
            output++;
            left_ptr++;
        } else {
            std::swap(*output, *right_ptr);
            output++;
            right_ptr++;
        }
    }
    if (left_ptr < mid) {
        int64_t remain = mid - left_ptr;
        std::swap_ranges(left_ptr, mid, last - remain);
        std::swap(labels[1], labels[2]);
        return {output, last - remain, last};
    } else {
        return {output, right_ptr, last};
    }
}

template <typename T>
void block_merge_pairwise(T* first, T* last, T* labels, int64_t block_size) {
    int64_t n_blocks = (last - first) / block_size;
    T* buffer = first;
    for (int64_t i = 0; i + 2 < n_blocks; i++) {
        std::tie(buffer, std::ignore, std::ignore) = merge_with_swap(
            buffer, buffer + block_size, first + (i + 2) * block_size, first + (i + 3) * block_size, labels + i);
    }
    std::rotate(first, buffer, buffer + block_size);
}
```

### 3.4. 处理尾部元素

对缓冲区排序，然后用多次旋转归并算法即可。

复杂度依旧上一篇文章所说，$O(n)$。

## 4. 单缓冲区算法

提取的唯一值不够，其实并不算坏事。因为我们可以利用 $O(s)$ 个不同的数这个特性。

### 4.1. 分块和对齐

labels 变少，那么块大小也必须做调整。为了区分，令 t 为新块的大小，`t = (n - buffer_len) / buffer_len`。

对齐算法同双缓冲区。不对齐部分 $t$，唯一值个数 $n/t$，因此旋转归并复杂度 $O(n/t\cdot t+n)=O(n)$。

### 4.2. 块间排序

和双缓冲区一样。比较次数 $O((n/t)^2)$，交换次数 $O(n/t)$，交换开销 $O(t)$，最终复杂度 $O(n)$。

### 4.3. 块间合并

依旧是最核心的一个步骤。

类似双缓冲区块间合并流程，但是合并两块用旋转归并（利用 labels 版本）即可。

外层循环简单很多，只要两两相邻的块进行合并，同样每次关注块的最后一部分。

这个算法看似超过 $O(n)$，其实不然。假设每次归并右块所有数相同，会有一个固定的 rotate 次数 $O(n/t)$。右块不同数的个数减一，就是额外的 rotate 次数，额外 rotate 次数加起来是 $O(n/t)$ 次，即整个数组不同数的个数。再乘以 rotate 开销 $O(t)$，最终复杂度 $O(n)$。

```cpp
template <typename T>
std::tuple<T*, T*> inplace_merge_with_rotation_indexed(T* first, T* mid, T* last, T* labels) {
    while (first < mid && mid < last) {
        T* split_right = mid;
        while (split_right < last && std::pair{*split_right, labels[1]} < std::pair{*first, labels[0]}) {
            split_right++;
        }
        if (mid != split_right) {
            std::rotate(first, mid, split_right);
        }
        first += (split_right - mid);
        mid = split_right;
        if (mid != last) {
            first++;
            while (first < mid && *first == *(first - 1)) {
                first++;
            }
        }
    }
    if (first != mid) {
        std::swap(labels[0], labels[1]);
    }
    return {first, last};
}

template <typename T>
void block_merge_pairwise(T* first, T* last, T* labels, int64_t block_size) {
    int64_t n_blocks = (last - first) / block_size;
    T* buffer = first;
    for (int64_t i = 0; i + 2 < n_blocks; i++) {
        std::tie(buffer, std::ignore, std::ignore) = merge_with_swap(
            buffer, buffer + block_size, first + (i + 2) * block_size, first + (i + 3) * block_size, labels + i);
    }
    std::rotate(first, buffer, buffer + block_size);
}
```

### 4.4. 处理尾部元素

和双缓冲区一致。缓冲区旋转归并复杂度 $O((n/t)^2)\le O(n)$。不对齐部分 $t$，唯一值个数 $n/t$，因此旋转归并复杂度 $O(n/t\cdot t+n)=O(n)$。

## 5. 补个代码

[完整实现](https://github.com/axiomofchoice-hjt/TCS-Algorithms/blob/master/include/tcs/inplace/stable_merge.hpp)和[测试](https://github.com/axiomofchoice-hjt/TCS-Algorithms/blob/master/tests/inplace/test_stable_merge.cpp)。

## 6. 结尾

至此，我们完整实现了一个稳定、原地、$O(n)$ 的归并算法。套用归并排序的框架，就能做到稳定、原地、$O(n\log n)$ 的排序。

本文简化了很多细节。[Fast Stable Merging and Sorting in Constant Extra Space](https://doi.org/10.1093/comjnl/35.6.643) 论文里只需要第二缓冲区，labels 通过交换块的内容来标记，非常复杂。[WikiSort](https://github.com/BonzaiThePenguin/WikiSort) 文章没有用块间排序 + 块间合并这样清晰的流程，而是滚动左边数组，在右边数组里找位置。

我结合了两边的思路进行简化，保证复杂度同时尽可能易懂。
