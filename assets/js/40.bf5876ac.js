(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{422:function(t,s,a){"use strict";a.r(s);var n=a(11),r=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("p",[t._v("最近看了一眼 google benchmark ("),s("a",{attrs:{href:"https://github.com/google/benchmark",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/google/benchmark"),s("OutboundLink")],1),t._v(") 的文档，还是能学到不少东西的，所以打算讲一讲 benchmark 的寄巧。")]),t._v(" "),s("h2",{attrs:{id:"_1-名词解释"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-名词解释"}},[t._v("#")]),t._v(" 1. 名词解释")]),t._v(" "),s("p",[t._v("benchmark：基准测试，一般指对独立模块的性能测试。")]),t._v(" "),s("h2",{attrs:{id:"_2-一个基础实现"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-一个基础实现"}},[t._v("#")]),t._v(" 2. 一个基础实现")]),t._v(" "),s("p",[t._v("假设我们需要测量"),s("strong",[t._v("数组求和")]),t._v("的性能，可以进行 REPEAT 次数组求和，并在其前后获取系统时间，代码如下：")]),t._v(" "),s("div",{staticClass:"language-cpp extra-class"},[s("pre",{pre:!0,attrs:{class:"language-cpp"}},[s("code",[s("span",{pre:!0,attrs:{class:"token macro property"}},[s("span",{pre:!0,attrs:{class:"token directive-hash"}},[t._v("#")]),s("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("include")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("<chrono>")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token macro property"}},[s("span",{pre:!0,attrs:{class:"token directive-hash"}},[t._v("#")]),s("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("include")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("<cmath>")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token macro property"}},[s("span",{pre:!0,attrs:{class:"token directive-hash"}},[t._v("#")]),s("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("include")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("<iostream>")])]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 数组求和")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("calc_sum")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" size"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" sum "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" size"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        sum "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+=")]),t._v(" a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" sum"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" SIZE "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1000000")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" REPEAT "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("100")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("SIZE"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("main")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("using")]),t._v(" clock "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" std"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),t._v("chrono"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),t._v("high_resolution_clock"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 记录开始时间")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("auto")]),t._v(" start "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" clock"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("now")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 进行 REPEAT 次数组求和")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" REPEAT"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("calc_sum")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" SIZE"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 记录时间间隔")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("auto")]),t._v(" duration "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" clock"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("now")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" start"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    std"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),t._v("cout "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<<")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("duration"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("count")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1000.0")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v(" REPEAT"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<<")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"us"')]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<<")]),t._v(" std"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),t._v("endl"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[s("code",[t._v("std::chrono::high_resolution_clock::now()")]),t._v(" 可以获取当前时间，两个时间相减后调用 "),s("code",[t._v(".count()")]),t._v(" 就能得到纳秒，除以 1000 就得到微秒。")]),t._v(" "),s("h2",{attrs:{id:"_3-阻止优化"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-阻止优化"}},[t._v("#")]),t._v(" 3. 阻止优化")]),t._v(" "),s("p",[t._v("上面的代码会有个问题，如果开了 -O2 优化，运行结果"),s("strong",[t._v("可能")]),t._v("只有 0.001us。")]),t._v(" "),s("p",[t._v("原因是 for 循环没有副作用，被编译器给优化掉了。"),s("a",{attrs:{href:"https://godbolt.org/z/E8E76bG1Y",target:"_blank",rel:"noopener noreferrer"}},[t._v("godbolt 链接"),s("OutboundLink")],1),t._v("，如下图红框的位置，两次 "),s("code",[t._v("std::chrono::_V2::system_clock::now()")]),t._v(" 调用之间只有个 mov 指令，这显然不是我们想要的。")]),t._v(" "),s("p",[s("img",{attrs:{src:"/img/1abfb8-0.png",alt:"img"}})]),t._v(" "),s("hr"),t._v(" "),s("p",[t._v("一种方法是把结果写到局部 volitile 变量里。")]),t._v(" "),s("div",{staticClass:"language-cpp extra-class"},[s("pre",{pre:!0,attrs:{class:"language-cpp"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 进行 REPEAT 次数组求和")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" REPEAT"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("maybe_unused"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("volatile")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("auto")]),t._v(" _ "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("calc_sum")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" SIZE"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("下图中编译器保留了 sum 的求值过程，求值结果会被写到栈内存里（"),s("code",[t._v("movd %xmm0, 12(%rsp)")]),t._v("）。")]),t._v(" "),s("p",[s("img",{attrs:{src:"/img/1abfb8-1.png",alt:"img"}})]),t._v(" "),s("hr"),t._v(" "),s("p",[t._v("另一个是 benchmark 库提供的方法，用内嵌汇编让编译器认为你需要用到这个值，实际上内嵌了空的汇编。")]),t._v(" "),s("div",{staticClass:"language-cpp extra-class"},[s("pre",{pre:!0,attrs:{class:"language-cpp"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("template")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Tp")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("inline")]),t._v(" BENCHMARK_ALWAYS_INLINE "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("DoNotOptimize")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Tp"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" value"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token macro property"}},[s("span",{pre:!0,attrs:{class:"token directive-hash"}},[t._v("#")]),s("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token expression"}},[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("defined")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("__clang__"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")])])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("asm")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("volatile")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('""')]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"+r,m"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("value"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"memory"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token macro property"}},[s("span",{pre:!0,attrs:{class:"token directive-hash"}},[t._v("#")]),s("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("else")])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("asm")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("volatile")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('""')]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"+m,r"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("value"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"memory"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token macro property"}},[s("span",{pre:!0,attrs:{class:"token directive-hash"}},[t._v("#")]),s("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("endif")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("下图中，DoNotOptimize 变成了一个 mov 指令。（godbolt 上 DoNotOptimize 对应了好几条指令，不知道为啥）")]),t._v(" "),s("p",[s("img",{attrs:{src:"/img/1abfb8-2.png",alt:"img"}})]),t._v(" "),s("h2",{attrs:{id:"_4-误差分析"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-误差分析"}},[t._v("#")]),t._v(" 4. 误差分析")]),t._v(" "),s("p",[t._v("即使是同一个 benchmark 程序，测得的时间也不是固定的。所以需要测多轮 benchmark，求标准差 / 变异系数（标准差与平均值的比值），来判断误差是否可接收。")]),t._v(" "),s("p",[t._v("google benchmark 提供了这个"),s("a",{attrs:{href:"https://github.com/google/benchmark/blob/main/docs/user_guide.md#statistics-reporting-the-mean-median-and-standard-deviation--coefficient-of-variation-of-repeated-benchmarks",target:"_blank",rel:"noopener noreferrer"}},[t._v("功能"),s("OutboundLink")],1),t._v("。")]),t._v(" "),s("h2",{attrs:{id:"_5-cache-处理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_5-cache-处理"}},[t._v("#")]),t._v(" 5. cache 处理")]),t._v(" "),s("p",[t._v("我们知道，访问一段内存后，这部分数据可能会留在 cache 里，下次访问的速度会有提升。如果数据在 cache 里，称 cache 是热的，反之就是冷的。")]),t._v(" "),s("p",[t._v("以数组求和为例，将代码改成每次求和输出一次时间（"),s("a",{attrs:{href:"https://godbolt.org/z/1s1s4Yjoa",target:"_blank",rel:"noopener noreferrer"}},[t._v("完整代码"),s("OutboundLink")],1),t._v("），就可以得到 484.5us 60us 59us 58.7us 58.7us 58.7us 58.6us 58.7us 65us 58.7us（本地跑的数据）。")]),t._v(" "),s("p",[s("img",{attrs:{src:"/img/1abfb8-3.png",alt:"img"}})]),t._v(" "),s("hr"),t._v(" "),s("p",[t._v("当我们想要模拟热的 cache，那么只要在 benchmark 前增加个热身 (warmup) 过程，即先跑个几次把 cache 热起来。")]),t._v(" "),s("div",{staticClass:"language-cpp extra-class"},[s("pre",{pre:!0,attrs:{class:"language-cpp"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" SIZE "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1000000")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" WARMUP "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" REPEAT "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("100")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("SIZE"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("main")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("using")]),t._v(" clock "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" std"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),t._v("chrono"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),t._v("high_resolution_clock"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 热身")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" WARMUP"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("DoNotOptimize")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("calc_sum")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" SIZE"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 记录开始时间")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("auto")]),t._v(" start "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" clock"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("now")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 进行 REPEAT 次数组求和")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" REPEAT"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("DoNotOptimize")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("calc_sum")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" SIZE"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 记录时间间隔")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("auto")]),t._v(" duration "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" clock"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("now")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" start"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    std"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),t._v("cout "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<<")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("duration"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("count")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1000.0")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v(" REPEAT"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<<")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"us"')]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<<")]),t._v(" std"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),t._v("endl"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("（"),s("a",{attrs:{href:"https://godbolt.org/z/MWfo5jn1j",target:"_blank",rel:"noopener noreferrer"}},[t._v("完整代码"),s("OutboundLink")],1),t._v("，热 cache 跑出来结果约为 60us）")]),t._v(" "),s("hr"),t._v(" "),s("p",[t._v("当我们想要模拟冷的 cache，就会稍微复杂一些。")]),t._v(" "),s("p",[t._v("一种方法是跑一遍就往无关的内存读写，将 cache 替换掉。但是这种方法需要暂停和恢复计时，这会引入一定的偏差。所以这里介绍一个循环")]),t._v(" "),s("p",[t._v("首先 linux 下用 lscpu 看一下 L3 cache 容量，用常量记录一下，我电脑上 L3 是 16 MiB：")]),t._v(" "),s("div",{staticClass:"language-cpp extra-class"},[s("pre",{pre:!0,attrs:{class:"language-cpp"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" L3CAP "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("16")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1024")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1024")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("p",[t._v("反复申请大小为 SIZE 的数组，直到大于 L3 cache 容量的两倍：")]),t._v(" "),s("div",{staticClass:"language-cpp extra-class"},[s("pre",{pre:!0,attrs:{class:"language-cpp"}},[s("code",[t._v("size_t total_size "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nstd"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),t._v("vector"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("std"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),t._v("vector"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">>")]),t._v(" list"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("total_size "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" L3CAP "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    std"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),t._v("vector"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("element")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("SIZE"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    total_size "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+=")]),t._v(" element"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("size")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    list"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("push_back")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("std"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("move")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("element"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("shuffle 一下，让硬件预取一定程度上失效（不知道有没有用）：")]),t._v(" "),s("div",{staticClass:"language-cpp extra-class"},[s("pre",{pre:!0,attrs:{class:"language-cpp"}},[s("code",[t._v("std"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("shuffle")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("blocks"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("begin")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" blocks"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("end")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" std"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("mt19937")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("p",[t._v("按顺序填充 0，一个是防止 benchmark 时出现缺页（std::vector 已经填充过 0 了，对其他数据结构可能需要），另一个是刷新一下 cache。")]),t._v(" "),s("div",{staticClass:"language-cpp extra-class"},[s("pre",{pre:!0,attrs:{class:"language-cpp"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("auto")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v(" block "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" blocks"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    std"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("fill")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("block"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("begin")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" block"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("end")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("（"),s("a",{attrs:{href:"https://godbolt.org/z/WWs7osjrr",target:"_blank",rel:"noopener noreferrer"}},[t._v("完整代码"),s("OutboundLink")],1),t._v("，冷 cache 跑出来结果约为 240us）")]),t._v(" "),s("hr"),t._v(" "),s("p",[t._v("数据在 L3 cache 里但不在 L2 cache 里，也可以调整代码实现。")]),t._v(" "),s("h2",{attrs:{id:"_6-random-interleaving"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_6-random-interleaving"}},[t._v("#")]),t._v(" 6. random interleaving")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://github.com/google/benchmark/blob/main/docs/random_interleaving.md",target:"_blank",rel:"noopener noreferrer"}},[t._v("原文"),s("OutboundLink")],1)]),t._v(" "),s("p",[t._v("如果有多种不同的测试，通过随机排列可以降低偏差（原文说降低 40%）")]),t._v(" "),s("p",[t._v("google benchmark 提供了这个功能。")]),t._v(" "),s("h2",{attrs:{id:"_7-perf-计数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_7-perf-计数"}},[t._v("#")]),t._v(" 7. perf 计数")]),t._v(" "),s("p",[t._v("除了运行时间，其他数据（比如 cpu 周期）也是重要的指标。")]),t._v(" "),s("p",[t._v("一般使用命令行 perf stat 会统计整个程序的 perf 计数，但我们并不想统计初始化和卸载的 perf 计数。一种方法是统计一下只有初始化和卸载的 perf 计数，从结果里减掉这个值；另一种方法就是用 perf_event_open 接口。google benchmark 帮我们封装了 perf_event_open。")]),t._v(" "),s("p",[t._v("如何用 perf 分析以及相关 PMU 工具，这个就不是本文的范围了。")]),t._v(" "),s("h2",{attrs:{id:"_8-其他"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_8-其他"}},[t._v("#")]),t._v(" 8. 其他")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://llvm.org/docs/Benchmarking.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("LLVM Benchmarking tips"),s("OutboundLink")],1),t._v(" 讲了关闭 cpu 频率缩放、关闭超线程、cpu 隔离等措施，可以把性能偏差降低到 0.1%。")])])}),[],!1,null,null,null);s.default=r.exports}}]);