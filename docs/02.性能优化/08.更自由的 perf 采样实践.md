---
title: 更自由的 perf 采样实践
date: 2024-05-26 02:20:56
permalink: /pages/f2fc10/
categories:
  - 性能优化
description: 在程序中间 perf stat
---

众所周知，命令行 perf stat 可以对完整程序的性能事件进行采样，但是想要局部采样却不是很容易实现。本文提供一种简单、精确的 perf 局部采样实践。

***

在[如何做好 benchmark](https://axiomofchoice-hjt.github.io/pages/1abfb8/)里，我提到了 google benchmark 库可以统计**独立模块**的 perf 事件。后来看了一下源码，perf_counters 已经将局部采样功能封装的很好了。

代码这么写：

```cpp
#include <../src/perf_counters.h>
#include <../src/string_util.h>
#include <benchmark/benchmark.h>

int main() {
    std::string events = "cycles,instructions,branches,cache-misses";
    benchmark::internal::PerfCountersMeasurement pcm(
        benchmark::StrSplit(events.c_str(), ','));
    std::vector<std::pair<std::string, double>> perf_result;
    pcm.Start();
    {
        const int N = 1000000;
        std::vector<int> a(N);
        std::sort(a.begin(), a.end());
    }
    pcm.Stop(perf_result);
    for (auto i : perf_result) {
        printf("%s: %ld\n", i.first.c_str(), (int64_t)i.second);
    }
}
```

首先安装 libpfm4，这个略。

引入 benchmark 库，一个方法是 benchmark 库放进项目里，用 cmake add_subdirectory，然后链接即可。例如：

```cmake
set(BENCHMARK_ENABLE_LIBPFM ON)
set(BENCHMARK_ENABLE_GTEST_TESTS OFF)
add_subdirectory(third_party/benchmark)
target_link_libraries(${PROJECT_NAME} PRIVATE benchmark::benchmark)
```

如果不想把 benchmark 库放进项目，可以在外面编译一把 benchmark，cmake 编译参数加 `-DBENCHMARK_ENABLE_LIBPFM=ON -DBENCHMARK_ENABLE_GTEST_TESTS=OFF`，然后 `-L /path/to/benchmark/build/src -lbenchmark -lpfm -I /path/to/benchmark/include`。
