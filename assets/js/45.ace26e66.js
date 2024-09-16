(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{427:function(t,a,s){"use strict";s.r(a);var i=s(11),e=Object(i.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("p",[t._v("本文假设读者已掌握 SVE 指令集。")]),t._v(" "),a("p",[t._v("术语约定：Z 寄存器（向量寄存器），P 寄存器（预测寄存器），ZA 寄存器（矩阵寄存器）")]),t._v(" "),a("h2",{attrs:{id:"_1-za-寄存器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-za-寄存器"}},[t._v("#")]),t._v(" 1. ZA 寄存器")]),t._v(" "),a("p",[t._v("我们知道，SVE 指令集有两个重要的特点，一个是向量长度由平台决定，另一个是用预测寄存器（P 寄存器）来控制每个位置的运算。SME 也是如此。")]),t._v(" "),a("p",[t._v("首先是寄存器。SME 相比于 SVE 多了 ZA (Z Array) 寄存器（英文意思大概是 Z 寄存器排成数组），并且 ZA 和 Z 寄存器没有任何共用（比如浮点寄存器、NEON、SVE 的寄存器互相有共用，ZA 没有）。")]),t._v(" "),a("p",[t._v("假设 SVE 的一个 Z 寄存器是 VL 字节，那么 ZA 一共可存储 VL×VL 字节，根据不同的数据类型可分为：")]),t._v(" "),a("ol",[a("li",[a("code",[t._v("ZA0.B")]),t._v(" 存储 8-bit 数据类型矩阵，矩阵排列成 VL 行 VL 列。")]),t._v(" "),a("li",[a("code",[t._v("ZA0.H, ZA1.H")]),t._v(" 2 个存储 16-bit 数据类型矩阵，矩阵排列成 VL/2 行 VL/2 列。")]),t._v(" "),a("li",[a("code",[t._v("ZA0.S, ..., ZA3.S")]),t._v(" 4 个存储 32-bit 数据类型矩阵，矩阵排列成 VL/4 行 VL/4 列。")]),t._v(" "),a("li",[a("code",[t._v("ZA0.D, ..., ZA7.D")]),t._v(" 8 个存储 64-bit 数据类型矩阵，矩阵排列成 VL/8 行 VL/8 列。")]),t._v(" "),a("li",[a("code",[t._v("ZA0.Q, ..., ZA15.Q")]),t._v(" 这个是 128-bit，用的不多，略。")])]),t._v(" "),a("p",[t._v("以 32-bit 为例，矩阵大小是 (VL/4)×(VL/4)，矩阵元素 4 字节，乘起来得到一个矩阵存储 VL×VL/4 字节，因此这样的矩阵可以设计成 4 个。")]),t._v(" "),a("p",[t._v("下图是 VL=16 的 ZA 寄存器示意图：")]),t._v(" "),a("p",[a("img",{attrs:{src:"/img/f78cb0-0.drawio.png",alt:"img"}})]),t._v(" "),a("p",[t._v("由于 ZA 只有 VL×VL 字节，所以不同数据类型的 ZA 存在复用，比如 "),a("code",[t._v("ZA0.B")]),t._v(" 和 "),a("code",[t._v("ZA0.H")]),t._v(" 有复用的情况。具体复用的对应规则如上图颜色和箭头所示。")]),t._v(" "),a("h2",{attrs:{id:"_2-sme-指令"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-sme-指令"}},[t._v("#")]),t._v(" 2. SME 指令")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://dougallj.github.io/asil/sme.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("这个网站"),a("OutboundLink")],1),t._v("可以查阅 SME 指令。")]),t._v(" "),a("p",[t._v("SME 主要有这么几类指令：")]),t._v(" "),a("ol",[a("li",[t._v("只操作 Z 寄存器，这种指令是 SVE/SVE2 的补充，本文不涉及。")]),t._v(" "),a("li",[t._v("MOVA 指令，将 Z 寄存器搬运到 ZA 的某几行/列，或 ZA 的某几行/列搬运到 Z 寄存器。")]),t._v(" "),a("li",[t._v("访存指令，将内存读到 ZA 的某一行/列，或 ZA 的某一行/列写到内存。可以用 SVE 访存 + MOVA 替代，这里就不细讲了。")]),t._v(" "),a("li",[t._v("ZA 局部计算指令，比如 ZA 的连续几行进行乘加运算，这种指令还不知道有哪些使用场景。")]),t._v(" "),a("li",[t._v("ZA 全局计算指令，这是本文的重点。")])]),t._v(" "),a("p",[t._v("写 SME 代码有两种方式，一是用 ACLE (Arm C Language Extensions)，还有就是直接写汇编。考虑到 ACLE 每个函数和汇编基本上能一一对应，这里就用汇编来介绍。")]),t._v(" "),a("h3",{attrs:{id:"_2-1-mova-指令"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-mova-指令"}},[t._v("#")]),t._v(" 2.1. MOVA 指令")]),t._v(" "),a("p",[t._v("举 4 个例子就好了：")]),t._v(" "),a("ol",[a("li",[a("code",[t._v("MOVA ZA0H.S[W12, 1], P0/M, Z0.S")]),t._v(" ZA0.S 的第 W12+1 行（H 代表行）赋值为 Z0.S。")]),t._v(" "),a("li",[a("code",[t._v("MOVA ZA1V.S[W12, 2], P0/M, Z0.S")]),t._v(" ZA1.S 的第 W12+2 列（V 代表列）赋值为 Z0.S。")]),t._v(" "),a("li",[a("code",[t._v("MOVA Z0.S, P0/M, ZA0H.S[W12, 1]")]),t._v(" Z0.S 赋值为 ZA0.S 的第 W12+1 行（H 代表行）。")]),t._v(" "),a("li",[a("code",[t._v("MOVA Z0.S, P0/M, ZA1V.S[W12, 2]")]),t._v(" Z0.S 赋值为 ZA1.S 的第 W12+2 列（V 代表列）。")])]),t._v(" "),a("p",[t._v("仔细观察网站里的指令介绍，可以发现指令使用起来有很多约束（比如 ZA 行/列的索引，只能用 W12-W15），这是因为精简指令集的一个指令固定 4 字节，已经塞不下额外的东西了。")]),t._v(" "),a("p",[t._v("还有操作多行的 MOVA 指令，这里不讲。")]),t._v(" "),a("h3",{attrs:{id:"_2-2-mopa-指令"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-mopa-指令"}},[t._v("#")]),t._v(" 2.2. MOPA 指令")]),t._v(" "),a("p",[t._v("ZA 全局计算指令很少，只有乘加指令 (MOPA) 和乘减指令 (MOPS)。")]),t._v(" "),a("p",[t._v("为什么要设计矩阵指令集：答案当然是加速矩阵乘。体现在指令上，一条指令需要尽可能让电路执行更多的计算（更严谨地，考虑 cycle）。")]),t._v(" "),a("p",[t._v("SVE 受寄存器的限制，只能让两个向量做乘加，得到一个向量，可以一次做 "),a("span",{staticClass:"katex"},[a("span",{staticClass:"katex-mathml"},[a("math",[a("semantics",[a("mrow",[a("mi",[t._v("O")]),a("mo",[t._v("(")]),a("mtext",[a("mi",{attrs:{mathvariant:"normal"}},[t._v("V")]),a("mi",{attrs:{mathvariant:"normal"}},[t._v("L")])],1),a("mo",[t._v(")")])],1),a("annotation",{attrs:{encoding:"application/x-tex"}},[t._v("O(\\text{VL})")])],1)],1)],1),a("span",{staticClass:"katex-html",attrs:{"aria-hidden":"true"}},[a("span",{staticClass:"strut",staticStyle:{height:"0.75em"}}),a("span",{staticClass:"strut bottom",staticStyle:{height:"1em","vertical-align":"-0.25em"}}),a("span",{staticClass:"base textstyle uncramped"},[a("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.02778em"}},[t._v("O")]),a("span",{staticClass:"mopen"},[t._v("(")]),a("span",{staticClass:"text mord textstyle uncramped"},[a("span",{staticClass:"mord mathrm",staticStyle:{"margin-right":"0.01389em"}},[t._v("V")]),a("span",{staticClass:"mord mathrm"},[t._v("L")])]),a("span",{staticClass:"mclose"},[t._v(")")])])])]),t._v(" 次计算。而 SME 有了矩阵寄存器，就可以让两个向量上各个位置互相乘，得到一个矩阵，可以一次做 "),a("span",{staticClass:"katex"},[a("span",{staticClass:"katex-mathml"},[a("math",[a("semantics",[a("mrow",[a("mi",[t._v("O")]),a("mo",[t._v("(")]),a("msup",[a("mtext",[a("mi",{attrs:{mathvariant:"normal"}},[t._v("V")]),a("mi",{attrs:{mathvariant:"normal"}},[t._v("L")])],1),a("mn",[t._v("2")])],1),a("mo",[t._v(")")])],1),a("annotation",{attrs:{encoding:"application/x-tex"}},[t._v("O(\\text{VL}^2)")])],1)],1)],1),a("span",{staticClass:"katex-html",attrs:{"aria-hidden":"true"}},[a("span",{staticClass:"strut",staticStyle:{height:"0.8141079999999999em"}}),a("span",{staticClass:"strut bottom",staticStyle:{height:"1.064108em","vertical-align":"-0.25em"}}),a("span",{staticClass:"base textstyle uncramped"},[a("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.02778em"}},[t._v("O")]),a("span",{staticClass:"mopen"},[t._v("(")]),a("span",{staticClass:"mord"},[a("span",{staticClass:"text mord textstyle uncramped"},[a("span",{staticClass:"mord mathrm",staticStyle:{"margin-right":"0.01389em"}},[t._v("V")]),a("span",{staticClass:"mord mathrm"},[t._v("L")])]),a("span",{staticClass:"vlist"},[a("span",{staticStyle:{top:"-0.363em","margin-right":"0.05em"}},[a("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[a("span",{staticStyle:{"font-size":"0em"}},[t._v("​")])]),a("span",{staticClass:"reset-textstyle scriptstyle uncramped"},[a("span",{staticClass:"mord mathrm"},[t._v("2")])])]),a("span",{staticClass:"baseline-fix"},[a("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[a("span",{staticStyle:{"font-size":"0em"}},[t._v("​")])]),t._v("​")])])]),a("span",{staticClass:"mclose"},[t._v(")")])])])]),t._v(" 次计算。")]),t._v(" "),a("p",[t._v("先看 float 类型的 FMOPA："),a("code",[t._v("FMOPA ZA0.S, P0/M, P1/M, Z0.S, Z1.S")]),t._v(" Z0 第 i 个数乘以 Z1 第 j 个数，累加到 ZA0 的 i 行 j 列（i, j 由 P0, P1 控制）。事实上，Z0 可以看作 N×1 的矩阵，Z1 可以看作 1×N 的矩阵，它们做矩阵乘法再和 ZA0 相加，N=8 如下图：")]),t._v(" "),a("p",[a("img",{attrs:{src:"/img/f78cb0-1.drawio.png",alt:"img"}})]),t._v(" "),a("p",[t._v("如果是 float16 类型的 FMOPA，计算结果可以是 float，或者 float16。后者属于 SME 扩展 (FEAT_SME_F16F16)，虽然计算更密集，但是电路复杂、精度低，比较鸡肋，目前大概没有硬件实现。对于前者，"),a("code",[t._v("FMOPA ZA0.S, P0/M, P1/M, Z0.H, Z1.H")]),t._v("，我们要将 Z0 排成 N×2 的矩阵，Z1 排成 2×N 的矩阵（排列顺序是图中的数字），它们做矩阵乘法再和 ZA0 相加，N=8 如下图：")]),t._v(" "),a("p",[a("img",{attrs:{src:"/img/f78cb0-2.drawio.png",alt:"img"}})])])}),[],!1,null,null,null);a.default=e.exports}}]);