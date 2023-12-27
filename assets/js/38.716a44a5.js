(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{423:function(t,s,a){"use strict";a.r(s);var n=a(10),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("p",[t._v("偶然遇到一个问题：给定两个集合，求它们的并集。集合用有序的整数 (uint32) 序列表示。")]),t._v(" "),s("p",[t._v("这个问题看似简单，实则有很大的优化空间，整个过程也非常有意思。")]),t._v(" "),s("p",[t._v("本文将从分支、SIMD、并发三个优化角度进行讲解。")]),t._v(" "),s("h2",{attrs:{id:"朴素方法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#朴素方法"}},[t._v("#")]),t._v(" 朴素方法")]),t._v(" "),s("p",[t._v("其实这个问题和归并操作差不多，差别在于是否会去重。仿照归并操作，我们可以写出下面的代码：")]),t._v(" "),s("div",{staticClass:"language-cpp extra-class"},[s("pre",{pre:!0,attrs:{class:"language-cpp"}},[s("code",[t._v("size_t "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("base")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("uint32_t")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" size_t a_size"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("uint32_t")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("b"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" size_t b_size"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("uint32_t")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("out"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("uint32_t")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("a_end "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" a "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" a_size"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("uint32_t")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("b_end "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" b "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" b_size"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("uint32_t")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("out_end "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" out"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("a "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" a_end "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" b "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" b_end"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("a "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("b"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("out_end "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n            a"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("a "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("b"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("out_end "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("b"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n            b"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("out_end "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n            a"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n            b"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        out_end"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    std"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("memcpy")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("out_end"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("a_end "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("sizeof")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("uint32_t")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    out_end "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+=")]),t._v(" a_end "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    std"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("memcpy")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("out_end"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" b"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("b_end "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" b"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("sizeof")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("uint32_t")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    out_end "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+=")]),t._v(" b_end "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" b"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" out_end "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" out"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("朴素实现有个很明显的性能问题，那就是两个 if 都生成了 jump 指令，如下图：")]),t._v(" "),s("p",[s("img",{attrs:{src:"/img/85c4ed-godbolt-base.png",alt:"img"}})]),t._v(" "),s("p",[t._v("我们知道，CPU 对分支（jump 指令）预测失败会有 10-20 个时钟周期的惩罚，这会带来很大的开销。除非 if 内的表达式大概率为某个值（真或者假），否则还是尽可能把它优化掉。因此就有了 branchless 版本。")]),t._v(" "),s("p",[t._v("（perf 统计一个函数内（而不是整个程序）的分支 miss 率有点麻烦，不知道有没有简单的方法。反正不是工作，就不统计了）")]),t._v(" "),s("h2",{attrs:{id:"branchless"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#branchless"}},[t._v("#")]),t._v(" branchless")]),t._v(" "),s("p",[t._v("灵感来源："),s("a",{attrs:{href:"https://github.com/tetzank/SIMDSetOperations",target:"_blank",rel:"noopener noreferrer"}},[t._v("SIMDSetOperations"),s("OutboundLink")],1)]),t._v(" "),s("p",[t._v("我们知道，"),s("code",[t._v("a++")]),t._v(" 是否执行取决于 "),s("code",[t._v("*a <= *b")]),t._v(" 这个条件，那么是不是可以改写成 "),s("code",[t._v("bool le = (*a <= *b); a += le;")]),t._v("。（其实，如果编译器足够强，是可以帮我把朴素方法优化成 branchless，只是今天还做不到）")]),t._v(" "),s("p",[t._v("不废话了，直接看代码：")]),t._v(" "),s("div",{staticClass:"language-cpp extra-class"},[s("pre",{pre:!0,attrs:{class:"language-cpp"}},[s("code",[t._v("size_t "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("branchless")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("uint32_t")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" size_t a_size"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("uint32_t")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("b"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" size_t b_size"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n                    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("uint32_t")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("out"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("uint32_t")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("a_end "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" a "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" a_size"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("uint32_t")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("b_end "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" b "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" b_size"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("uint32_t")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("out_end "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" out"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("a "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" a_end "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" b "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" b_end"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("bool")]),t._v(" le "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("a "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("b"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("bool")]),t._v(" ge "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("a "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("b"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("out_end "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" le "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("a "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("b"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        a "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+=")]),t._v(" le"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        b "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+=")]),t._v(" ge"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        out_end"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    std"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("memcpy")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("out_end"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("a_end "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("sizeof")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("uint32_t")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    out_end "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+=")]),t._v(" a_end "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    std"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("memcpy")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("out_end"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" b"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("b_end "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" b"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("sizeof")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("uint32_t")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    out_end "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+=")]),t._v(" b_end "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" b"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" out_end "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" out"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("生成的部分汇编代码如下：")]),t._v(" "),s("p",[s("img",{attrs:{src:"/img/85c4ed-godbolt-branchless.png",alt:"img"}})]),t._v(" "),s("p",[t._v("可以看到，while 内部已经一个 jump 指令都没了。")]),t._v(" "),s("ol",[s("li",[t._v("le, ge 这两个布尔变量可以用 setnb 指令来得到。")]),t._v(" "),s("li",[s("code",[t._v("*out_end = le ? *a : *b;")]),t._v(" 这条语句是通过 cmovbe 指令（条件 mov）来实现的。")])]),t._v(" "),s("p",[t._v("那么性能如何呢？考虑随机生成的 "),s("span",{staticClass:"katex"},[s("span",{staticClass:"katex-mathml"},[s("math",[s("semantics",[s("mrow",[s("mn",[t._v("2")]),s("mo",[t._v("×")]),s("mn",[t._v("1")]),s("msup",[s("mn",[t._v("0")]),s("mn",[t._v("7")])],1)],1),s("annotation",{attrs:{encoding:"application/x-tex"}},[t._v("2\\times 10^7")])],1)],1)],1),s("span",{staticClass:"katex-html",attrs:{"aria-hidden":"true"}},[s("span",{staticClass:"strut",staticStyle:{height:"0.8141079999999999em"}}),s("span",{staticClass:"strut bottom",staticStyle:{height:"0.897438em","vertical-align":"-0.08333em"}}),s("span",{staticClass:"base textstyle uncramped"},[s("span",{staticClass:"mord mathrm"},[t._v("2")]),s("span",{staticClass:"mbin"},[t._v("×")]),s("span",{staticClass:"mord mathrm"},[t._v("1")]),s("span",{staticClass:"mord"},[s("span",{staticClass:"mord mathrm"},[t._v("0")]),s("span",{staticClass:"vlist"},[s("span",{staticStyle:{top:"-0.363em","margin-right":"0.05em"}},[s("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[s("span",{staticStyle:{"font-size":"0em"}},[t._v("​")])]),s("span",{staticClass:"reset-textstyle scriptstyle uncramped"},[s("span",{staticClass:"mord mathrm"},[t._v("7")])])]),s("span",{staticClass:"baseline-fix"},[s("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[s("span",{staticStyle:{"font-size":"0em"}},[t._v("​")])]),t._v("​")])])])])])]),t._v(" 大小的两个数组，结果是 base: 160.545750 (ms)，branchless: 82.300270 (ms)。branchless 获得了大致一倍的性能提升，非常好用。")]),t._v(" "),s("p",[t._v("如果 branchless 抛弃 C++ 而用汇编写，性能还能再压榨一些。比如 "),s("code",[t._v("cmp setnb cmp setnb")]),t._v(" 可以优化为 "),s("code",[t._v("cmp setna setnb")]),t._v("，少一次冗余的比较。但不管怎么说，只考虑单核的话，branchless 已经基本触及"),s("strong",[t._v("标量")]),t._v("计算的极限了。想要进一步优化，必须引入向量化（SIMD）。")]),t._v(" "),s("h2",{attrs:{id:"simd"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#simd"}},[t._v("#")]),t._v(" SIMD")]),t._v(" "),s("p",[t._v("灵感来源还是："),s("a",{attrs:{href:"https://github.com/tetzank/SIMDSetOperations",target:"_blank",rel:"noopener noreferrer"}},[t._v("SIMDSetOperations"),s("OutboundLink")],1)]),t._v(" "),s("p",[t._v("单核 CPU 具有一次性处理多个数据的能力。比如说 SSE 一次性可以处理 128 bit，这 128 bit 可以是 2 个 64 位整数或 double，4 个 32 位整数或 float，等等。类似的，AVX2 的长度是 256 bit，AVX512 的长度是 512 bit。（SSE / AVX2 / AVX512 都是 intel 处理器的指令集）")]),t._v(" "),s("p",[t._v("这种操作就是 SIMD。")]),t._v(" "),s("p",[t._v("很多问题的 SIMD 优化其实都比较容易实现，但是这篇文章探讨的问题就不太容易看出来。这也是 SIMD 强大之处。")]),t._v(" "),s("h3",{attrs:{id:"整体思路"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#整体思路"}},[t._v("#")]),t._v(" 整体思路")]),t._v(" "),s("p",[t._v("假设我们使用 SSE（一次处理 4 个 32 位整数）。")]),t._v(" "),s("p",[t._v("先取 a, b 数组的前 4 个数，对它们进行排序。较小的 4 个去重后放到 out 数组里，较大的 4 个数字记为 tmp。")]),t._v(" "),s("p",[t._v("然后不断地取 a, b 里首个数字较小的 4 个数，和 tmp 进行归并排序。较小的 4 个去重后放到 out 数组里，较大的 4 个数字记为 tmp。以此类推。")]),t._v(" "),s("h3",{attrs:{id:"排序"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#排序"}},[t._v("#")]),t._v(" 排序")]),t._v(" "),s("p",[t._v("假设 a, b 都是 4 个"),s("strong",[t._v("有序")]),t._v("整数，排序后较小 4 个数放回 a，较大 4 个数放回 b。这操作非常奇技淫巧。")]),t._v(" "),s("p",[t._v("先介绍两个指令：")]),t._v(" "),s("ul",[s("li",[t._v("求 a, b 各个位置的最小值，"),s("code",[t._v("_mm_min_epu32(a, b)")]),t._v(" ，效果等同于：")])]),t._v(" "),s("div",{staticClass:"language-cpp extra-class"},[s("pre",{pre:!0,attrs:{class:"language-cpp"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 并不能这么写，这里只是方便讲解")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" c"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" std"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("min")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" b"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("ul",[s("li",[t._v("循环右移，"),s("code",[t._v("_mm_shuffle_epi32(a, _MM_SHUFFLE(2, 1, 0, 3))")]),t._v("，效果等同于：")])]),t._v(" "),s("div",{staticClass:"language-cpp extra-class"},[s("pre",{pre:!0,attrs:{class:"language-cpp"}},[s("code",[t._v("std"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("tie")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" std"),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("make_tuple")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("p",[t._v("ps: "),s("code",[t._v("_MM_SHUFFLE(2, 1, 0, 3)")]),t._v(" 倒过来是 3 0 1 2，和 make_tuple 里的下标对应。")]),t._v(" "),s("p",[t._v("于是我们可以"),s("strong",[t._v("重复")]),t._v("以下操作 "),s("strong",[t._v("4")]),t._v(" 次：")]),t._v(" "),s("ol",[s("li",[s("code",[t._v("_mm_min_epu32(a, b)")]),t._v("，"),s("code",[t._v("_mm_max_epu32(a, b)")]),t._v(" 赋值给 a, b")]),t._v(" "),s("li",[t._v("b 循环右移")])]),t._v(" "),s("p",[t._v("很难解释这个为什么能排序，算了反正没什么人看到这（")]),t._v(" "),s("h3",{attrs:{id:"去重"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#去重"}},[t._v("#")]),t._v(" 去重")]),t._v(" "),s("p",[t._v("首先对 a 进行循环右移，结果为 a'。")]),t._v(" "),s("p",[t._v("然后对 a 和 a' 各个位置进行等于的比较（_mm_cmpeq_epi32）。4 个位置等于 / 不等于，可以得到 "),s("span",{staticClass:"katex"},[s("span",{staticClass:"katex-mathml"},[s("math",[s("semantics",[s("mrow",[s("msup",[s("mn",[t._v("2")]),s("mn",[t._v("4")])],1),s("mo",[t._v("=")]),s("mn",[t._v("1")]),s("mn",[t._v("6")])],1),s("annotation",{attrs:{encoding:"application/x-tex"}},[t._v("2^4=16")])],1)],1)],1),s("span",{staticClass:"katex-html",attrs:{"aria-hidden":"true"}},[s("span",{staticClass:"strut",staticStyle:{height:"0.8141079999999999em"}}),s("span",{staticClass:"strut bottom",staticStyle:{height:"0.8141079999999999em","vertical-align":"0em"}}),s("span",{staticClass:"base textstyle uncramped"},[s("span",{staticClass:"mord"},[s("span",{staticClass:"mord mathrm"},[t._v("2")]),s("span",{staticClass:"vlist"},[s("span",{staticStyle:{top:"-0.363em","margin-right":"0.05em"}},[s("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[s("span",{staticStyle:{"font-size":"0em"}},[t._v("​")])]),s("span",{staticClass:"reset-textstyle scriptstyle uncramped"},[s("span",{staticClass:"mord mathrm"},[t._v("4")])])]),s("span",{staticClass:"baseline-fix"},[s("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[s("span",{staticStyle:{"font-size":"0em"}},[t._v("​")])]),t._v("​")])])]),s("span",{staticClass:"mrel"},[t._v("=")]),s("span",{staticClass:"mord mathrm"},[t._v("1")]),s("span",{staticClass:"mord mathrm"},[t._v("6")])])])]),t._v(" 个结果。")]),t._v(" "),s("p",[t._v("在"),s("a",{attrs:{href:"https://github.com/tetzank/SIMDSetOperations/blob/master/union/sse.hpp",target:"_blank",rel:"noopener noreferrer"}},[t._v("开源实现"),s("OutboundLink")],1),t._v("里会有一个初始化，对这 16 个结果进行编码，得到一个 shuffle 数组。这样就可以一个 _mm_shuffle_epi8 指令就能去重了。")]),t._v(" "),s("h3",{attrs:{id:"分析"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#分析"}},[t._v("#")]),t._v(" 分析")]),t._v(" "),s("p",[t._v("事实上"),s("a",{attrs:{href:"https://github.com/tetzank/SIMDSetOperations/blob/master/union/sse.hpp",target:"_blank",rel:"noopener noreferrer"}},[t._v("开源实现"),s("OutboundLink")],1),t._v("还有亿些细节，代码也很长就不展示了，感兴趣可以去研究。")]),t._v(" "),s("p",[t._v("实测 SSE 的表现是 40.156805 (ms)，性能是朴素实现的 4 倍。当然选择更宽的向量指令集效果肯定更好。")]),t._v(" "),s("h2",{attrs:{id:"并发"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#并发"}},[t._v("#")]),t._v(" 并发")]),t._v(" "),s("p",[t._v("最终，我们来到了多个 CPU 的领域。")]),t._v(" "),s("p",[t._v("在这个问题中，并发这件事就会稍复杂一些。假设我们把 a 数组均分为 n 部分，那么 b 数组对应的就不是均分的了。")]),t._v(" "),s("p",[t._v("所以我们需要一个很经典的算法，那就是力扣上的"),s("a",{attrs:{href:"https://leetcode.cn/problems/median-of-two-sorted-arrays/description/",target:"_blank",rel:"noopener noreferrer"}},[t._v("寻找两个正序数组的中位数"),s("OutboundLink")],1),t._v("。我们用类似算法可以求两个有序数组的 n 等分点，这样的话，就能直接并发了。")]),t._v(" "),s("p",[t._v("万万没想到力扣算法有一天也会这么实用（")])])}),[],!1,null,null,null);s.default=e.exports}}]);