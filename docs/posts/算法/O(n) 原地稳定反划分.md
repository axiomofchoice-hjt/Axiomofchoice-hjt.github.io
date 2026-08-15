---
title: O(n) 原地稳定反划分
date: 2026-05-23 01:48:18
permalink: /pages/60450e/
categories:
  - 算法
description: 本文详解 O(n) 时间、O(1) 空间的原地稳定反划分算法——稳定划分的逆操作。通过缓冲区提取、块缩小与原地置换，在不破坏相对顺序的前提下，将已划分的数组按任意 0‑1 模式精确重排。
---

![img](./assets/60450e-0.webp)

这期的算法是划分的逆操作，实现上也非常相似。但又不得不讲，因为稳定选择依赖这个算法。

建议先看往期文章 [O(n) 原地稳定划分](/pages/0d69d8/)再来阅读这期文章。

主要参考的论文是 [Sorting multisets stably in minimum space](https://doi.org/10.1007/BF01178508)。反划分只是论文的一部分，后面还有稳定选择和一个排序方案。

## 1. 问题定义

给定一个数组 a、一个谓词 pred 和布尔数组 placement，初始数组 a 里谓词为真的元素排在谓词为假的元素前面。要求对 a 进行重排后，每个位置的谓词和 placement 对应位置的布尔值相同，即对每个索引 i 都有 `pred(a[i]) = placement[i]`。同时要求 $O(n)$ 时间复杂度、原地（$O(1)$ 额外空间复杂度）、稳定（反划分前后，谓词为真的元素相对顺序不变，谓词为假同理）。

不考虑原地的要求，用双指针很容易实现：

```cpp
template <typename T, typename Pred, typename Placement>
void stable_inplace_unpartition(T* first, T* last, Pred pred, Placement placement) {
    T* left_ptr = first;
    T* right_ptr = std::find_if(first, last, [pred](T x) { return !pred(x); });
    std::vector<T> buffer;
    for (T* it = first; it < last; it++) {
        if (placement(it)) {
            buffer.push_back(*left_ptr);
            left_ptr++;
        } else {
            buffer.push_back(*right_ptr);
            right_ptr++;
        }
    }
    std::copy(buffer.begin(), buffer.end(), first);
}
```

和划分一样，这个问题等价于 0-1 排序的逆操作（0-1 反划分），后面会按这个 0-1 反划分来讲。

算法选用的模型是最常用的 Word RAM。Word RAM 模型的存储单元是 Word，可容纳 w 比特，要求刚好能表示内存里每个存储单元的地址。一个 Word 能存储指针，但是存不了更多的信息。这个特性会在算法里用到。

这里要说明一下，代码里出现的 proj 是把元素映射为 0/1，用于 0-1 反划分；pred 是谓词，意思是将 pred 为真的元素收集起来（只在 `stable_inplace_unpartition` 接口出现）。注意一下这个区别。

## 2. 前置算法

### 2.1. 划分文章里提到的算法

1. 区间旋转（`std::rotate`）。
2. 原地置换。
3. word-base 存储器。
4. buffer-base 存储器。

### 2.2. 0-1 分割

（划分文章里 0-1 归并的逆操作）

0-1 分割就是指定一个位置把有序的 0-1 数组分割成左右两个有序子数组，每个子数组 0 的个数和对应 placement 0 的个数相同。

只要统计两个部分的 placement 0 的个数就算出分割后 0-1 的分界线，旋转一下即可。复杂度 $O(n)$。

```cpp
template <typename T, typename Proj, typename Placement>
void inplace_01_split(T* first, T* split, T* last, Proj proj, Placement placement) {
    T* mid = std::find_if(first, last, proj);
    T* l = first + count_if_placement_equals(first, split, 0, placement);
    T* r = split + count_if_placement_equals(split, last, 0, placement);
    std::rotate(l, mid, r);
}
```

### 2.3. 旋转反划分

旋转反划分是朴素的原地反划分操作。

首先找 placement 第一个 0 的索引 i，将数组 a 的 0 组成的区间右移到左端点等于 i，这只要一次旋转操作。然后从 i + 1 开始重复这个过程。

假设 0 个数是 l，1 个数是 r。由于每个 0 会被旋转 l 次，每个 1 只被旋转 1 次，因此复杂度 $O(l^2+r)$。

同理，我们可以对称地左移 1 的区间，从而复杂度变为 $O(l+r^2)$。结合两者可以做到 $O(n+\min(l^2,r^2))$

```cpp
template <typename T, typename Proj, typename Placement>
void unpartition_with_rotation(T* first, T* last, Proj proj, Placement placement) {
    T* mid = std::find_if(first, last, proj);
    if (mid - first < last - mid) {
        T* zero_start = first;
        int64_t n_zeros = mid - first;
        for (T* it = first; it < last; it++) {
            if (placement(it) == 0) {
                std::rotate(zero_start, zero_start + n_zeros, it + n_zeros);
                zero_start = it + 1;
                n_zeros--;
            }
        }
    } else {
        T* one_end = last;
        int64_t n_ones = last - mid;
        for (T* it = last; it > first; it--) {
            if (placement(it - 1) == 1) {
                std::rotate(it - n_ones, one_end - n_ones, one_end);
                one_end = it - 1;
                n_ones--;
            }
        }
    }
}
```

## 3. O(n) 原地稳定反划分

### 3.1. 提取缓冲区

和划分一样，我们需要 $2 \sqrt n$ 个元素作为缓冲区，要求一半 0 一半 1。0 和 1 一一配对，它们可以提供两个状态（按顺序是 01 和 10），也就是 1 bit 信息；一共 $\sqrt n$ bit，这在后续步骤会用到。

不过有个点要注意，如果只是简单的提取，剩余元素就和 placement 的 0 / 1 个数对不上了，算法也无法进行下去。

我们用 0-1 分割来解决这个问题。具体来说，就是求最小的 t 满足 placement 的前 t 个元素里包含至少 $\sqrt n$ 个 0 和至少 $\sqrt n$ 个 1，然后在 t 的位置进行 0-1 分割。

这样分割的两个部分可以独立 0-1 反划分，不需要相互交换元素了。

复杂度 $O(n)$。

```cpp
template <typename T, typename Proj, typename Placement>
std::tuple<T*, T*, T*, T*> extract_buffer(T* first, T* last, Proj proj, Placement placement, int64_t buffer_len) {
    std::array<int64_t, 2> cnt = {};
    for (T* it = first; it < last; it++) {
        cnt[placement(it)]++;
        if (cnt[0] >= buffer_len && cnt[1] >= buffer_len) {
            break;
        }
    }
    if (cnt[0] >= buffer_len && cnt[1] >= buffer_len) {
        inplace_01_split(first, first + cnt[0] + cnt[1], last, proj, placement);
        return {first, first + cnt[0], first + cnt[0] + cnt[1], last};
    } else {
        return {first, first, first, last};
    }
}
```

如果缓冲区 0 或 1 的数量不够，那么 0 或 1 的个数必然小于 $\sqrt n$，可以直接调用旋转反划分结束算法，复杂度 $O(n+\min(l^2,r^2))=O(n)$。

### 3.2. 块缩小

块缩小的含义是，一开始是按大块分块，块内都是有序的 0-1 数组，并且 0 / 1 数量和 placement 一致；大块经过分块和一些处理后，形成的小块都是有序的 0-1 数组，并且 0 / 1 数量和 placement 一致。如果块缩小为 1 就完成了反划分过程。

和划分一样，反划分也是用 word-base 存储器和 buffer-base 存储器进行块间操作，不过整个过程是反过来的。

首先算出 `max_blocks_for_word` 和 `max_blocks_for_buffer`，这个和划分是一样的含义。先进行 3 次 buffer-base 存储器驱动的块缩小，然后是 2 次 word-base 存储器驱动的块缩小：

```cpp
int64_t merge_size = max_blocks_for_word * max_blocks_for_word * max_blocks_for_buffer * max_blocks_for_buffer *
                        max_blocks_for_buffer;
for (int64_t step = 0; step < 3; step++) {
    int64_t block_size = merge_size / max_blocks_for_buffer;
    for (int64_t start = 0; start < len; start += merge_size) {
        // ...
    }
    merge_size = block_size;
}
for (int64_t step = 0; step < 2; step++) {
    int64_t block_size = merge_size / max_blocks_for_word;
    for (int64_t start = 0; start < len; start += merge_size) {
        // ...
    }
    merge_size = block_size;
}
```

每个块缩小会经过 4 步，处理非对齐部分、块同质化、块归并、块反同质化。

### 3.3. 处理非对齐部分

非对齐部分就是按 `block_size` 分块后余下来的部分，只要调用 0-1 分割就能把非对齐部分隔离出来。非对齐部分不足 `block_size` 个，已经满足了块缩小要求，后面只要关心对齐部分。复杂度 $O(n)$。

```cpp
int64_t end = std::min(start + merge_size, len);
int64_t end_l2_aligned = end / block_size * block_size;
inplace_01_split(first + start, first + end_l2_aligned, first + end, proj, placement);
```

### 3.4. 块同质化

一开始大块是 0-1 有序数组，01 分界线会落在某个块上。我们想要让第 2 块开始都是纯块（就是只有 0 或只有 1），剩下整除 `block_size` 余下来的 0 和 1 都转移到第 1 块。

只要一次旋转就可以了，复杂度 $O(1)$。

```cpp
int64_t mid = std::find_if(first + start, first + end_l2_aligned, proj) - first;
if (mid % block_size != 0) {
    std::rotate(first + start + mid % block_size, first + mid,
        first + (mid + block_size - 1) / block_size * block_size);
}
```

### 3.5. 块反同质化

我们先跳过块归并，直接讲块反同质化，这样理解起来比较容易。

块反同质化就是所有块从左往右的两两进行元素交换。一开始左块是 0-1 有序数组，右块是纯块，目标是左块保持 0-1 有序数组，并且让 0 / 1 个数和 placement 一致；右块变为 0-1 有序数组。

这里假设左块缺少 0 右块一开始就是纯 0 块，左块缺少 1 右块一开始就是纯 1 块。于是就是几次旋转的事情，比较容易。

但是谁来保证 0 / 1 数量足够？答案就是块归并。

先上代码吧，复杂度 $O(n)$。

```cpp
template <typename T, typename Proj, typename Placement>
void dehomogenize_blocks(T* first, T* last, int64_t block_size, Proj proj, Placement placement) {
    assert_or_throw((last - first) % block_size == 0);
    int64_t n_blocks = (last - first) / block_size;
    for (int64_t i = 0; i + 2 <= n_blocks; i++) {
        T* left = first + i * block_size;
        T* mid = left + block_size;
        T* right = mid + block_size;
        T* split01 = std::find_if(left, mid, proj);
        assert_or_throw(std::is_sorted(left, mid, [proj](T a, T b) { return proj(a) < proj(b); }));
        assert_or_throw(std::all_of(mid, right, [proj, mid](T x) { return proj(x) == proj(*mid); }));
        int64_t cnt0_left = count_if_placement_equals(left, mid, 0, placement);
        if (split01 < left + cnt0_left) {
            assert_or_throw(proj(*mid) == 0);
            std::rotate(split01, mid, mid + (left + cnt0_left - split01));
            std::rotate(mid, mid + (left + cnt0_left - split01), right);
        } else if (split01 > left + cnt0_left) {
            assert_or_throw(proj(*mid) == 1);
            std::rotate(left + cnt0_left, split01, mid + (split01 - left - cnt0_left));
        }
    }
}
```

### 3.6. 块归并

上面已经提到块归并的作用。理解作用后，就很容易搞懂块归并该怎么做，其实就是模拟块反同质化的 0 / 1 个数变化，然后记录每个纯块该放到哪里（用 word-base / buffer-base 存储器记录）。最后就是一个原地置换的事情。

虽然介绍很少，代码看着还挺吓人。复杂度 $O(n)$。

```cpp
template <typename T, typename Storage, typename Proj, typename Placement>
void merge_blocks_impl(T* first, T* last, int64_t block_size, Storage& storage, Proj proj, Placement placement) {
    int64_t n_blocks = (last - first) / block_size;
    if (n_blocks <= 2) {
        return;
    }
    T* homogenized = first + block_size;
    T* mid = std::find_if(homogenized, last, proj);
    int64_t block0_cnt1 = std::count_if(first, homogenized, proj);
    std::array<int64_t, 2> counters = {block_size - block0_cnt1, block0_cnt1};
    std::array<int64_t, 2> pointers = {1, (mid - first) / block_size};
    int64_t global_pos = 1;
    storage.set(0, 0);
    auto update = [&](T* left, T* right) {
        int64_t cnt0_placement = count_if_placement_equals(left, right, 0, placement);
        if (counters[0] <= cnt0_placement && pointers[0] < (mid - first) / block_size) {
            storage.set(pointers[0], global_pos);
            pointers[0]++;
            global_pos++;
            counters[0] += block_size;
        } else {
            assert_or_throw(pointers[1] < n_blocks);
            storage.set(pointers[1], global_pos);
            pointers[1]++;
            global_pos++;
            counters[1] += block_size;
        }
        counters[0] -= cnt0_placement;
        counters[1] -= block_size - cnt0_placement;
    };
    for (int64_t i = 0; i < n_blocks - 1; i++) {
        update(first + i * block_size, first + (i + 1) * block_size);
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

### 3.7. 处理缓冲区

在最后还要把缓冲区给反划分了。由于 0 / 1 个数的最小值是 $\sqrt n$，因此调用旋转反划分即可，复杂度 $O(n)$。

```cpp
unpartition_with_rotation(buf0, first, proj, placement);
```

## 4. 完整代码

[完整实现](https://github.com/axiomofchoice-hjt/TCS-Algorithms/blob/master/include/tcs/inplace/stable_unpartition.hpp)和[测试](https://github.com/axiomofchoice-hjt/TCS-Algorithms/blob/master/tests/inplace/test_stable_unpartition.cpp)。

## 5. 稳定选择预告

下一期的稳定选择是非常重量级的算法，不仅依赖划分和反划分这两个复杂算法，其本身也不是省油的灯。

可以期待一下。
