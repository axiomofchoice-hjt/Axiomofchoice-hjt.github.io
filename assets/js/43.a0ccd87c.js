(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{426:function(t,s,a){"use strict";a.r(s);var n=a(11),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("p",[t._v("前置芝士：C++ 原子。")]),t._v(" "),s("p",[t._v("在高性能场景，一般会用 OpenMP 来实现多线程功能。如果，我们想要做的更加极致，还有没有优化空间？")]),t._v(" "),s("p",[t._v("答案是肯定的。")]),t._v(" "),s("p",[t._v("为了降低难度，本文"),s("strong",[t._v("不讲内存模型")]),t._v("，也不讲 OpenMP。")]),t._v(" "),s("h2",{attrs:{id:"_1-线程同步"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-线程同步"}},[t._v("#")]),t._v(" 1. 线程同步")]),t._v(" "),s("p",[t._v("有时，线程 B 的任务完成后，线程 A 的任务才能开始。所谓线程同步，就是线程 A 等待线程 B 的这个过程。")]),t._v(" "),s("p",[s("img",{attrs:{src:"/img/22df72-0.drawio.png",alt:"img"}})]),t._v(" "),s("p",[t._v("上图中，箭头表示事件发生的先后顺序。")]),t._v(" "),s("p",[t._v("线程更多时，问题可扩展为线程 A 等待线程 B,C,D,...，或者线程 B,C,D,... 等待线程 A。本文将这两种情况称为一等多和多等一。如下图：")]),t._v(" "),s("p",[s("img",{attrs:{src:"/img/22df72-1.drawio.png",alt:"img"}})]),t._v(" "),s("p",[t._v("多等一，可以用来作为单线程转变为多线程的过程，而多等一则相反。")]),t._v(" "),s("p",[t._v("显然，还有多等多的情况，这个在下文讲。")]),t._v(" "),s("h3",{attrs:{id:"_1-1-一等多"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-一等多"}},[t._v("#")]),t._v(" 1.1. 一等多")]),t._v(" "),s("p",[t._v("既然标题是用户态，那自然是用原子实现，这里有两个实现。")]),t._v(" "),s("p",[t._v("一个是用 8 个（假设有 8 个线程）原子变量来表示每个线程的状态，让线程 0 不断读其他线程的状态，从而达到阻塞的目的。")]),t._v(" "),s("p",[t._v("另一个是非 0 线程都原子加 (atomic add) 到一个变量上，线程 0 不断检查这个变量是否等于 7。")]),t._v(" "),s("p",[t._v("这里只用第一个方式，具体哪个快我也不知道。")]),t._v(" "),s("div",{staticClass:"language-cpp extra-class"},[s("pre",{pre:!0,attrs:{class:"language-cpp"}},[s("code",[s("span",{pre:!0,attrs:{class:"token macro property"}},[s("span",{pre:!0,attrs:{class:"token directive-hash"}},[t._v("#")]),s("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("include")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("<chrono>")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token macro property"}},[s("span",{pre:!0,attrs:{class:"token directive-hash"}},[t._v("#")]),s("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("include")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("<iostream>")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token macro property"}},[s("span",{pre:!0,attrs:{class:"token directive-hash"}},[t._v("#")]),s("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("include")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("<thread>")])]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int64_t")]),t._v(" N_THREADS "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("8")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("struct")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("alignas")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("128")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" SyncWorkspace "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    std"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),t._v("atomic"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("uint64_t")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" state"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nSyncWorkspace workspace"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("N_THREADS"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nstd"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),t._v("thread threads"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("N_THREADS"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sync_1w7")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int64_t")]),t._v(" thread_id"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("thread_id "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 非 0 线程等 2 秒再打印线程编号，然后线程同步")]),t._v("\n        std"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),t._v("this_thread"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sleep_for")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("std"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),t._v("chrono"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("seconds")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        std"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),t._v("cout "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<<")]),t._v(" std"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("to_string")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("thread_id"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"\\n"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        workspace"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("thread_id"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("state"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("store")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("thread_id "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 线程 0 先线程同步再打印线程编号")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int64_t")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" N_THREADS"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("workspace"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("state"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("load")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        std"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),t._v("cout "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<<")]),t._v(" std"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("to_string")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("thread_id"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"\\n"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("main")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int64_t")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" N_THREADS"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        threads"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" std"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("thread")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("sync_1w7"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" i"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int64_t")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" N_THREADS"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        threads"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("join")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("有几个注意点：")]),t._v(" "),s("ol",[s("li",[s("code",[t._v("thread_id")]),t._v(" 在这里不是操作系统的线程 id，只是从 0 开始的编号。")]),t._v(" "),s("li",[t._v("为了避免伪共享 (false sharing)，原子变量应以两倍 cacheline 对齐（128 字节对齐），体现在代码里是 "),s("code",[t._v("alignas(128)")]),t._v("。伪共享是什么就不细嗦了。")]),t._v(" "),s("li",[t._v("本文"),s("strong",[t._v("不讲内存模型")]),t._v("，所以用默认也是最强的内存模型 seq_cst。当然也可以用 acquire、release，懂的自然都懂，不懂的也不用管，只要知道线程同步用原子就对了。")])]),t._v(" "),s("h3",{attrs:{id:"_1-2-多等一"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-多等一"}},[t._v("#")]),t._v(" 1.2. 多等一")]),t._v(" "),s("p",[t._v("多等一也有两个实现。")]),t._v(" "),s("p",[t._v("一个是 1 个原子变量表示线程 0 的状态，非 0 线程检查这个变量。")]),t._v(" "),s("p",[t._v("另一个是用 8 个原子变量都表示线程 0 的状态，非 0 线程不断检查各自的原子变量。")]),t._v(" "),s("p",[t._v("同理，这里只用第一个方式，具体哪个快我也不知道。")]),t._v(" "),s("div",{staticClass:"language-cpp extra-class"},[s("pre",{pre:!0,attrs:{class:"language-cpp"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sync_7w1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int64_t")]),t._v(" thread_id"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("thread_id "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 线程 0 等 2 秒再打印线程编号，然后线程同步")]),t._v("\n        std"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),t._v("this_thread"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sleep_for")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("std"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),t._v("chrono"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("seconds")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        std"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),t._v("cout "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<<")]),t._v(" std"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("to_string")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("thread_id"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"\\n"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        workspace"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("thread_id"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("state"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("store")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("thread_id "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 非 0 线程先线程同步再打印线程编号")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("workspace"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("state"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("load")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        std"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),t._v("cout "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<<")]),t._v(" std"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("to_string")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("thread_id"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"\\n"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h3",{attrs:{id:"_1-3-多等多"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-多等多"}},[t._v("#")]),t._v(" 1.3. 多等多")]),t._v(" "),s("p",[t._v("在实践上，多等多一般用一等多 + 多等一来实现。如下图：")]),t._v(" "),s("p",[s("img",{attrs:{src:"/img/22df72-2.drawio.png",alt:"img"}})]),t._v(" "),s("p",[t._v("（"),s("strong",[t._v("注意看")]),t._v("，线程 0 可以在中间插个单线程的任务）")]),t._v(" "),s("p",[t._v("除此之外还有亿些实现：")]),t._v(" "),s("ol",[s("li",[t._v("多等一 + 一等多（把顺序换一下），缺点就是线程 0 不能在中间插个单线程的任务。")]),t._v(" "),s("li",[t._v("用 N 个原子变量表示每个线程的状态，每个线程又检查其他所有线程。怎么感觉有点集合通讯内味了。")])]),t._v(" "),s("p",[t._v("同理，我还是不知道什么更快。（为什么我又不知道哪个更快？因为这和平台有关）")]),t._v(" "),s("h2",{attrs:{id:"_2-性能如何"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-性能如何"}},[t._v("#")]),t._v(" 2. 性能如何")]),t._v(" "),s("p",[t._v("非原子的实现会让不干活的线程进入阻塞状态，想要唤醒自然会慢一点。原子线程同步大部分情况可以认为是最快的，除非硬件针对线程同步提供了专门的指令（比如 GPU）。")]),t._v(" "),s("p",[t._v("估计耗时是几个微秒。")]),t._v(" "),s("h2",{attrs:{id:"_3-那么代价是什么"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-那么代价是什么"}},[t._v("#")]),t._v(" 3. 那么代价是什么")]),t._v(" "),s("p",[t._v("占 CPU。")]),t._v(" "),s("h2",{attrs:{id:"_4-例-向量归一化"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-例-向量归一化"}},[t._v("#")]),t._v(" 4. 例 向量归一化")]),t._v(" "),s("p",[t._v("向量归一化 (normalization)，就是把向量除以它的长度，从而得到这个方向的单位向量。公式为 "),s("span",{staticClass:"katex"},[s("span",{staticClass:"katex-mathml"},[s("math",[s("semantics",[s("mrow",[s("msub",[s("mi",[t._v("a")]),s("mi",[t._v("i")])],1),s("mo",[t._v("←")]),s("mfrac",[s("mrow",[s("msub",[s("mi",[t._v("a")]),s("mi",[t._v("i")])],1)],1),s("mrow",[s("msqrt",[s("mrow",[s("msub",[s("mo",[t._v("∑")]),s("mrow",[s("mi",[t._v("j")])],1)],1),s("msubsup",[s("mi",[t._v("a")]),s("mi",[t._v("j")]),s("mn",[t._v("2")])],1)],1)],1)],1)],1)],1),s("annotation",{attrs:{encoding:"application/x-tex"}},[t._v("a_i\\leftarrow \\dfrac{a_i}{\\sqrt{\\sum_{j} a_j^2}}")])],1)],1)],1),s("span",{staticClass:"katex-html",attrs:{"aria-hidden":"true"}},[s("span",{staticClass:"strut",staticStyle:{height:"1.10756em"}}),s("span",{staticClass:"strut bottom",staticStyle:{height:"2.83758em","vertical-align":"-1.7300199999999997em"}}),s("span",{staticClass:"base textstyle uncramped"},[s("span",{staticClass:"mord"},[s("span",{staticClass:"mord mathit"},[t._v("a")]),s("span",{staticClass:"vlist"},[s("span",{staticStyle:{top:"0.15em","margin-right":"0.05em","margin-left":"0em"}},[s("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[s("span",{staticStyle:{"font-size":"0em"}},[t._v("​")])]),s("span",{staticClass:"reset-textstyle scriptstyle cramped"},[s("span",{staticClass:"mord mathit"},[t._v("i")])])]),s("span",{staticClass:"baseline-fix"},[s("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[s("span",{staticStyle:{"font-size":"0em"}},[t._v("​")])]),t._v("​")])])]),s("span",{staticClass:"mrel"},[t._v("←")]),s("span",{staticClass:"mord reset-textstyle displaystyle textstyle uncramped"},[s("span",{staticClass:"sizing reset-size5 size5 reset-textstyle textstyle uncramped nulldelimiter"}),s("span",{staticClass:"mfrac"},[s("span",{staticClass:"vlist"},[s("span",{staticStyle:{top:"1.0549049999999998em"}},[s("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[s("span",{staticStyle:{"font-size":"1em"}},[t._v("​")])]),s("span",{staticClass:"reset-textstyle textstyle cramped"},[s("span",{staticClass:"mord textstyle cramped"},[s("span",{staticClass:"sqrt mord"},[s("span",{staticClass:"sqrt-sign",staticStyle:{top:"0.025094999999999867em"}},[s("span",{staticClass:"style-wrap reset-textstyle textstyle uncramped"},[s("span",{staticClass:"delimsizing size2"},[t._v("√")])])]),s("span",{staticClass:"vlist"},[s("span",{staticStyle:{top:"0em"}},[s("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[s("span",{staticStyle:{"font-size":"1em"}},[t._v("​")])]),s("span",{staticClass:"mord textstyle cramped"},[s("span",{staticClass:"mop"},[s("span",{staticClass:"op-symbol small-op mop",staticStyle:{top:"-0.0000050000000000050004em"}},[t._v("∑")]),s("span",{staticClass:"vlist"},[s("span",{staticStyle:{top:"0.30001em","margin-right":"0.05em","margin-left":"0em"}},[s("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[s("span",{staticStyle:{"font-size":"0em"}},[t._v("​")])]),s("span",{staticClass:"reset-textstyle scriptstyle cramped"},[s("span",{staticClass:"mord scriptstyle cramped"},[s("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.05724em"}},[t._v("j")])])])]),s("span",{staticClass:"baseline-fix"},[s("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[s("span",{staticStyle:{"font-size":"0em"}},[t._v("​")])]),t._v("​")])])]),s("span",{staticClass:"mord"},[s("span",{staticClass:"mord mathit"},[t._v("a")]),s("span",{staticClass:"vlist"},[s("span",{staticStyle:{top:"0.2768639999999999em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[s("span",{staticStyle:{"font-size":"0em"}},[t._v("​")])]),s("span",{staticClass:"reset-textstyle scriptstyle cramped"},[s("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.05724em"}},[t._v("j")])])]),s("span",{staticStyle:{top:"-0.3448em","margin-right":"0.05em"}},[s("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[s("span",{staticStyle:{"font-size":"0em"}},[t._v("​")])]),s("span",{staticClass:"reset-textstyle scriptstyle cramped"},[s("span",{staticClass:"mord mathrm"},[t._v("2")])])]),s("span",{staticClass:"baseline-fix"},[s("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[s("span",{staticStyle:{"font-size":"0em"}},[t._v("​")])]),t._v("​")])])])])]),s("span",{staticStyle:{top:"-1.0849049999999998em"}},[s("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[s("span",{staticStyle:{"font-size":"1em"}},[t._v("​")])]),s("span",{staticClass:"reset-textstyle textstyle uncramped sqrt-line"})]),s("span",{staticClass:"baseline-fix"},[s("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[s("span",{staticStyle:{"font-size":"1em"}},[t._v("​")])]),t._v("​")])])])])])]),s("span",{staticStyle:{top:"-0.22999999999999998em"}},[s("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[s("span",{staticStyle:{"font-size":"1em"}},[t._v("​")])]),s("span",{staticClass:"reset-textstyle textstyle uncramped frac-line"})]),s("span",{staticStyle:{top:"-0.677em"}},[s("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[s("span",{staticStyle:{"font-size":"1em"}},[t._v("​")])]),s("span",{staticClass:"reset-textstyle textstyle uncramped"},[s("span",{staticClass:"mord textstyle uncramped"},[s("span",{staticClass:"mord"},[s("span",{staticClass:"mord mathit"},[t._v("a")]),s("span",{staticClass:"vlist"},[s("span",{staticStyle:{top:"0.15em","margin-right":"0.05em","margin-left":"0em"}},[s("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[s("span",{staticStyle:{"font-size":"0em"}},[t._v("​")])]),s("span",{staticClass:"reset-textstyle scriptstyle cramped"},[s("span",{staticClass:"mord mathit"},[t._v("i")])])]),s("span",{staticClass:"baseline-fix"},[s("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[s("span",{staticStyle:{"font-size":"0em"}},[t._v("​")])]),t._v("​")])])])])])]),s("span",{staticClass:"baseline-fix"},[s("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[s("span",{staticStyle:{"font-size":"1em"}},[t._v("​")])]),t._v("​")])])]),s("span",{staticClass:"sizing reset-size5 size5 reset-textstyle textstyle uncramped nulldelimiter"})])])])]),t._v("。")]),t._v(" "),s("p",[t._v("我们很自然可以想到，多线程每个线程处理一部分数的平方和；然后单线程计算 len = 所有线程的结果加起来再开方；最后所有线程计算一部分数除以 len。")]),t._v(" "),s("p",[t._v("这个处理过程就是多线程 -> 单线程 -> 多线程的处理逻辑，套用一等多 + 多等一来实现即可。如下图：")]),t._v(" "),s("p",[s("img",{attrs:{src:"/img/22df72-3.drawio.png",alt:"img"}})])])}),[],!1,null,null,null);s.default=e.exports}}]);