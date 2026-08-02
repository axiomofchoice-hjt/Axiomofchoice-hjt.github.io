---
title: 如何写C++项目
date: 2023-03-24 19:50:38
permalink: /pages/dec161/
categories:
  - C++
description: 项目指北
---

为什么写这篇文章？

我认为知识广度对一个人太重要了。一两年前的我，大概只会在 OJ 上刷刷题，C++ 语法已经玩得很 6 了，但是对 C++ 项目却毫无概念。

恰巧 C++ 项目又是一个复杂的话题，新手（我）很容易走弯路。于是我写了这篇文章，目的是探讨两个问题：写 C++ 项目需要什么技能，以及写 C++ 项目怎么搭建。

## 1. 开始

第一步，你需要一个 Linux 操作系统，因为 C++ 大概率是指 Linux C++。

第二步，需要一个 IDE / 编辑器。选择有很多，VSCode, VS, Clion, Vim 都是可以的。

需要注意的是，你的 IDE / 编译器并不一定要装在 Linux 环境里。因为 3202 年**远程连接**已经非常好用了。

我的选择是 WSL (Ubuntu) + VSCode。

进一步的，你可能需要学这些通用技能：

- Linux 命令 & shell 语言：用 Linux 就不得不学。
- Git：不管是 clone 别人的库，还是自己代码的版本管理，都需要 Git 操作。

## 2. 静态代码分析

（IDE 应该会自带这个功能，可以考虑跳过）

静态代码分析，有什么用呢，就是自动补全、代码跳转，还有一系列提示（比如函数的参数类型），以及报错。

一般来说编辑器会用到 [LSP](https://www.zhihu.com/question/513488686) 这个东西（可以认为就是静态代码分析）。说到 LSP，那必然是 clangd 了，用过的都说好用。要使用的话需要先在 Linux 上[安装 clangd](https://clangd.llvm.org/installation)，然后安装 [VSCode 插件](https://marketplace.visualstudio.com/items?itemName=llvm-vs-code-extensions.vscode-clangd)。

## 3. 项目构建

项目构建是把代码编译到可执行文件或者库文件的过程（通常）。此处涉及到了三个重要的操作，安装依赖（包管理）、描述编译过程（构建工具）、编译（编译器）。

倒着说吧。

### 3.1. 编译器

需要一个编译器。

有三大编译器，GCC、Clang、MSVC，一般的话无脑 GCC 就行了。

### 3.2. 构建工具

事实上整个编译过程都可以通过敲命令行实现，于是我们将这些过程写成脚本。Makefile 就将这些脚本整合起来并使用。

但是 Makefile 写起来太麻烦，我们需要一个生成 Makefile 的工具，CMake 诞生了。

当然事实上，CMake 的[替代品](https://github.com/fffaraz/awesome-cpp#build-systems)很多，比如 xmake 等。但是我为什么推荐用 CMake 呢，主要还是用的人太多了。

### 3.3. 包管理

如果不用任何包管理工具该怎么安装依赖呢？当然是把仓库 clone 到自己项目目录里了。

这是最通用的方法，只是很麻烦。

想要简单一点，用 Linux 自带的包管理工具（比如 ubuntu 的 apt）也是可以安装的，但是这有两个缺点，一是因为安装是全局的，版本管理就不好做了；二是这么安装可能版本比较旧，我因为这吃过不少苦头。

或者使用 vcpkg 之类的针对 C++ 的[包管理工具](https://github.com/fffaraz/awesome-cpp#build-systems)。因为时间原因我还没体验过。

## 4. 轮子

现在，我们已经把项目搭起来了，但是不要着急开撸代码。

古人有云，不要重复造轮子。[awesome-cpp](https://github.com/fffaraz/awesome-cpp) 收集了大量 C++ 相关的，在写项目前一定要先查一下。

这些轮子（或者功能）可以说是必装的：

- 大名鼎鼎的 [Boost](https://github.com/boostorg/boost)
- 格式化 [fmt](https://github.com/fmtlib/fmt)（C++20 有 `std::format`，如果想要更通用就用 fmt）
- 日志，选择有很多，glog, spdlog, Boost.Log 等。

还有一些常用的：

- 序列化，用来读写配置、通讯。
- 命令行解析。
- 数学，包括高精度计算、几何等等。

## 5. 项目规范

代码风格，那必然是 [Google C++ Style](https://google.github.io/styleguide/cppguide.html)。当然人类肯定记不住那么多规则的，这不用担心，因为 clang-format 会出手。与其一点点手动调节代码，不如一键格式化。（clangd 也包含了这个功能）

除此之外还有很多规范，都是实践多了才明白。特别是**内存安全**的一系列规范，内存上的 Bug 是很难定位的。

除了代码以外，项目目录也是有一定规范。不过这个规范没有什么统一的说法。

## 6. 分析你的代码

这里包括了太多工具了，简单写一些：

- Debug：GDB
- 反汇编：objdump（说起来 GNU BinUtils 有一堆工具，可以看看）
- 内存分析
- 性能测试：Benchmark
- 文档：Doxygen（可以通过注释来生成文档）

## 7. 一些建议

C++ 能写的东西太多了，我这篇文字也只讲了一些 C++ 通用的知识，任意一个方向都需要大量精力去钻研。

如果想要搞个简单的项目，可以考虑命令行程序 / Web 服务器，也可以看看别人代码，然后仿照写一个（[awesome-cpp](https://github.com/fffaraz/awesome-cpp) 就有很多范例）。

## 8. 2023-04-11 更新

1. vcpkg 体验了，确实好用。
2. 测试框架忘记说了，可以考虑用 GTest，不过我也没深入使用。
3. 如果想了解更多 C++ 实践的知识可以移步 [cpp-best-practices](https://github.com/cpp-best-practices/cppbestpractices)。
