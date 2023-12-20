(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{440:function(t,s,a){"use strict";a.r(s);var i=a(10),e=Object(i.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("p",[t._v("一个知乎问题，"),s("a",{attrs:{href:"https://www.zhihu.com/question/380347860/answer/3293961701",target:"_blank",rel:"noopener noreferrer"}},[t._v("如果某CPU有无限个核心，那么时间复杂度最小的排序算法是怎么样的？"),s("OutboundLink")],1)]),t._v(" "),s("h2",{attrs:{id:"_1-最优结论"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-最优结论"}},[t._v("#")]),t._v(" 1. 最优结论")]),t._v(" "),s("p",[t._v("不需要无限个，只要 "),s("span",{staticClass:"katex"},[s("span",{staticClass:"katex-mathml"},[s("math",[s("semantics",[s("mrow",[s("mi",[t._v("O")]),s("mo",[t._v("(")]),s("mi",[t._v("n")]),s("mo",[t._v(")")])],1),s("annotation",{attrs:{encoding:"application/x-tex"}},[t._v("O(n)")])],1)],1)],1),s("span",{staticClass:"katex-html",attrs:{"aria-hidden":"true"}},[s("span",{staticClass:"strut",staticStyle:{height:"0.75em"}}),s("span",{staticClass:"strut bottom",staticStyle:{height:"1em","vertical-align":"-0.25em"}}),s("span",{staticClass:"base textstyle uncramped"},[s("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.02778em"}},[t._v("O")]),s("span",{staticClass:"mopen"},[t._v("(")]),s("span",{staticClass:"mord mathit"},[t._v("n")]),s("span",{staticClass:"mclose"},[t._v(")")])])])]),t._v(" 个核心，时间复杂度最小是 "),s("span",{staticClass:"katex"},[s("span",{staticClass:"katex-mathml"},[s("math",[s("semantics",[s("mrow",[s("mi",[t._v("O")]),s("mo",[t._v("(")]),s("mi",[t._v("log")]),s("mi",[t._v("n")]),s("mo",[t._v(")")])],1),s("annotation",{attrs:{encoding:"application/x-tex"}},[t._v("O(\\log n)")])],1)],1)],1),s("span",{staticClass:"katex-html",attrs:{"aria-hidden":"true"}},[s("span",{staticClass:"strut",staticStyle:{height:"0.75em"}}),s("span",{staticClass:"strut bottom",staticStyle:{height:"1em","vertical-align":"-0.25em"}}),s("span",{staticClass:"base textstyle uncramped"},[s("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.02778em"}},[t._v("O")]),s("span",{staticClass:"mopen"},[t._v("(")]),s("span",{staticClass:"mop"},[t._v("lo"),s("span",{staticStyle:{"margin-right":"0.01389em"}},[t._v("g")])]),s("span",{staticClass:"mord mathit"},[t._v("n")]),s("span",{staticClass:"mclose"},[t._v(")")])])])]),t._v("。")]),t._v(" "),s("p",[t._v("这篇论文："),s("a",{attrs:{href:"https://dl.acm.org/doi/10.1145/800061.808726",target:"_blank",rel:"noopener noreferrer"}},[t._v("链接"),s("OutboundLink")],1)]),t._v(" "),s("p",[t._v("摘要：")]),t._v(" "),s("blockquote",[s("p",[t._v("The purpose of this paper is to describe a sorting network of "),s("strong",[t._v("size 0(n log n) and depth 0(log n)")]),t._v(".")]),t._v(" "),s("p",[t._v("A natural way of sorting is through consecutive halvings: determine the upper and lower halves of the set, proceed similarly within the halves, and so on. Unfortunately, while one can halve a set using only 0(n) comparisons, this cannot be done in less than log n (parallel) time, and it is known that a halving network needs (½)n log n comparisons.")]),t._v(" "),s("p",[t._v("It is possible, however, to construct a network of "),s("strong",[t._v("0(n) comparisons")]),t._v(" which halves in constant time with high accuracy. This procedure (ε-halving) and a derived procedure (ε-nearsort) are described below, and our sorting network will be centered around these elementary steps.")])]),t._v(" "),s("p",[t._v('摘要提到，排序网络 "size 0(n log n) and depth 0(log n)"，"0(n) comparisons"，核心数应该就是比较器数 '),s("span",{staticClass:"katex"},[s("span",{staticClass:"katex-mathml"},[s("math",[s("semantics",[s("mrow",[s("mi",[t._v("O")]),s("mo",[t._v("(")]),s("mi",[t._v("n")]),s("mo",[t._v(")")])],1),s("annotation",{attrs:{encoding:"application/x-tex"}},[t._v("O(n)")])],1)],1)],1),s("span",{staticClass:"katex-html",attrs:{"aria-hidden":"true"}},[s("span",{staticClass:"strut",staticStyle:{height:"0.75em"}}),s("span",{staticClass:"strut bottom",staticStyle:{height:"1em","vertical-align":"-0.25em"}}),s("span",{staticClass:"base textstyle uncramped"},[s("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.02778em"}},[t._v("O")]),s("span",{staticClass:"mopen"},[t._v("(")]),s("span",{staticClass:"mord mathit"},[t._v("n")]),s("span",{staticClass:"mclose"},[t._v(")")])])])]),t._v(" 个，深度也就是时间复杂度 "),s("span",{staticClass:"katex"},[s("span",{staticClass:"katex-mathml"},[s("math",[s("semantics",[s("mrow",[s("mi",[t._v("O")]),s("mo",[t._v("(")]),s("mi",[t._v("log")]),s("mi",[t._v("n")]),s("mo",[t._v(")")])],1),s("annotation",{attrs:{encoding:"application/x-tex"}},[t._v("O(\\log n)")])],1)],1)],1),s("span",{staticClass:"katex-html",attrs:{"aria-hidden":"true"}},[s("span",{staticClass:"strut",staticStyle:{height:"0.75em"}}),s("span",{staticClass:"strut bottom",staticStyle:{height:"1em","vertical-align":"-0.25em"}}),s("span",{staticClass:"base textstyle uncramped"},[s("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.02778em"}},[t._v("O")]),s("span",{staticClass:"mopen"},[t._v("(")]),s("span",{staticClass:"mop"},[t._v("lo"),s("span",{staticStyle:{"margin-right":"0.01389em"}},[t._v("g")])]),s("span",{staticClass:"mord mathit"},[t._v("n")]),s("span",{staticClass:"mclose"},[t._v(")")])])])]),t._v("。")]),t._v(" "),s("p",[t._v("但是具体怎么做，俺就不细看了，就当指个路。")]),t._v(" "),s("p",[t._v("另外时间复杂度一定不小于 "),s("span",{staticClass:"katex"},[s("span",{staticClass:"katex-mathml"},[s("math",[s("semantics",[s("mrow",[s("mi",[t._v("O")]),s("mo",[t._v("(")]),s("mi",[t._v("log")]),s("mi",[t._v("n")]),s("mo",[t._v(")")])],1),s("annotation",{attrs:{encoding:"application/x-tex"}},[t._v("O(\\log n)")])],1)],1)],1),s("span",{staticClass:"katex-html",attrs:{"aria-hidden":"true"}},[s("span",{staticClass:"strut",staticStyle:{height:"0.75em"}}),s("span",{staticClass:"strut bottom",staticStyle:{height:"1em","vertical-align":"-0.25em"}}),s("span",{staticClass:"base textstyle uncramped"},[s("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.02778em"}},[t._v("O")]),s("span",{staticClass:"mopen"},[t._v("(")]),s("span",{staticClass:"mop"},[t._v("lo"),s("span",{staticStyle:{"margin-right":"0.01389em"}},[t._v("g")])]),s("span",{staticClass:"mord mathit"},[t._v("n")]),s("span",{staticClass:"mclose"},[t._v(")")])])])]),t._v("，因为小于这个复杂度我们无法判断这个数组是否有序，而排序肯定比这个任务要强。")]),t._v(" "),s("p",[t._v("（感觉是这样的，不知道怎么严谨证明）")]),t._v(" "),s("h2",{attrs:{id:"_2-时间复杂度不是最优"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-时间复杂度不是最优"}},[t._v("#")]),t._v(" 2. 时间复杂度不是最优")]),t._v(" "),s("p",[t._v("如果时间复杂度放宽一些，"),s("span",{staticClass:"katex"},[s("span",{staticClass:"katex-mathml"},[s("math",[s("semantics",[s("mrow",[s("mi",[t._v("O")]),s("mo",[t._v("(")]),s("msup",[s("mi",[t._v("log")]),s("mn",[t._v("2")])],1),s("mi",[t._v("n")]),s("mo",[t._v(")")])],1),s("annotation",{attrs:{encoding:"application/x-tex"}},[t._v("O(\\log^2n)")])],1)],1)],1),s("span",{staticClass:"katex-html",attrs:{"aria-hidden":"true"}},[s("span",{staticClass:"strut",staticStyle:{height:"0.8141079999999999em"}}),s("span",{staticClass:"strut bottom",staticStyle:{height:"1.064108em","vertical-align":"-0.25em"}}),s("span",{staticClass:"base textstyle uncramped"},[s("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.02778em"}},[t._v("O")]),s("span",{staticClass:"mopen"},[t._v("(")]),s("span",{staticClass:"mop"},[s("span",{staticClass:"mop"},[t._v("lo"),s("span",{staticStyle:{"margin-right":"0.01389em"}},[t._v("g")])]),s("span",{staticClass:"vlist"},[s("span",{staticStyle:{top:"-0.363em","margin-right":"0.05em"}},[s("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[s("span",{staticStyle:{"font-size":"0em"}},[t._v("​")])]),s("span",{staticClass:"reset-textstyle scriptstyle uncramped"},[s("span",{staticClass:"mord mathrm"},[t._v("2")])])]),s("span",{staticClass:"baseline-fix"},[s("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[s("span",{staticStyle:{"font-size":"0em"}},[t._v("​")])]),t._v("​")])])]),s("span",{staticClass:"mord mathit"},[t._v("n")]),s("span",{staticClass:"mclose"},[t._v(")")])])])]),t._v(" 复杂度，这个其他回答提到过，就是双调排序（Bitonic sort），很好理解。")]),t._v(" "),s("h2",{attrs:{id:"_3-核心数不是最优"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-核心数不是最优"}},[t._v("#")]),t._v(" 3. 核心数不是最优")]),t._v(" "),s("p",[t._v("如果核心数放宽一些，"),s("span",{staticClass:"katex"},[s("span",{staticClass:"katex-mathml"},[s("math",[s("semantics",[s("mrow",[s("mi",[t._v("O")]),s("mo",[t._v("(")]),s("msup",[s("mi",[t._v("n")]),s("mn",[t._v("2")])],1),s("mo",[t._v(")")])],1),s("annotation",{attrs:{encoding:"application/x-tex"}},[t._v("O(n^2)")])],1)],1)],1),s("span",{staticClass:"katex-html",attrs:{"aria-hidden":"true"}},[s("span",{staticClass:"strut",staticStyle:{height:"0.8141079999999999em"}}),s("span",{staticClass:"strut bottom",staticStyle:{height:"1.064108em","vertical-align":"-0.25em"}}),s("span",{staticClass:"base textstyle uncramped"},[s("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.02778em"}},[t._v("O")]),s("span",{staticClass:"mopen"},[t._v("(")]),s("span",{staticClass:"mord"},[s("span",{staticClass:"mord mathit"},[t._v("n")]),s("span",{staticClass:"vlist"},[s("span",{staticStyle:{top:"-0.363em","margin-right":"0.05em"}},[s("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[s("span",{staticStyle:{"font-size":"0em"}},[t._v("​")])]),s("span",{staticClass:"reset-textstyle scriptstyle uncramped"},[s("span",{staticClass:"mord mathrm"},[t._v("2")])])]),s("span",{staticClass:"baseline-fix"},[s("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[s("span",{staticStyle:{"font-size":"0em"}},[t._v("​")])]),t._v("​")])])]),s("span",{staticClass:"mclose"},[t._v(")")])])])]),t._v(" 核心数，那么可以这么做：")]),t._v(" "),s("p",[t._v("假设核心排列成一个 "),s("span",{staticClass:"katex"},[s("span",{staticClass:"katex-mathml"},[s("math",[s("semantics",[s("mrow",[s("mi",[t._v("n")]),s("mo",[t._v("×")]),s("mi",[t._v("n")])],1),s("annotation",{attrs:{encoding:"application/x-tex"}},[t._v("n\\times n")])],1)],1)],1),s("span",{staticClass:"katex-html",attrs:{"aria-hidden":"true"}},[s("span",{staticClass:"strut",staticStyle:{height:"0.58333em"}}),s("span",{staticClass:"strut bottom",staticStyle:{height:"0.66666em","vertical-align":"-0.08333em"}}),s("span",{staticClass:"base textstyle uncramped"},[s("span",{staticClass:"mord mathit"},[t._v("n")]),s("span",{staticClass:"mbin"},[t._v("×")]),s("span",{staticClass:"mord mathit"},[t._v("n")])])])]),t._v(" 矩阵，第 i 行第 j 列判断 "),s("span",{staticClass:"katex"},[s("span",{staticClass:"katex-mathml"},[s("math",[s("semantics",[s("mrow",[s("msub",[s("mi",[t._v("a")]),s("mi",[t._v("i")])],1),s("mo",[t._v("<")]),s("msub",[s("mi",[t._v("a")]),s("mi",[t._v("j")])],1)],1),s("annotation",{attrs:{encoding:"application/x-tex"}},[t._v("a_i<a_j")])],1)],1)],1),s("span",{staticClass:"katex-html",attrs:{"aria-hidden":"true"}},[s("span",{staticClass:"strut",staticStyle:{height:"0.5391em"}}),s("span",{staticClass:"strut bottom",staticStyle:{height:"0.8252079999999999em","vertical-align":"-0.286108em"}}),s("span",{staticClass:"base textstyle uncramped"},[s("span",{staticClass:"mord"},[s("span",{staticClass:"mord mathit"},[t._v("a")]),s("span",{staticClass:"vlist"},[s("span",{staticStyle:{top:"0.15em","margin-right":"0.05em","margin-left":"0em"}},[s("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[s("span",{staticStyle:{"font-size":"0em"}},[t._v("​")])]),s("span",{staticClass:"reset-textstyle scriptstyle cramped"},[s("span",{staticClass:"mord mathit"},[t._v("i")])])]),s("span",{staticClass:"baseline-fix"},[s("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[s("span",{staticStyle:{"font-size":"0em"}},[t._v("​")])]),t._v("​")])])]),s("span",{staticClass:"mrel"},[t._v("<")]),s("span",{staticClass:"mord"},[s("span",{staticClass:"mord mathit"},[t._v("a")]),s("span",{staticClass:"vlist"},[s("span",{staticStyle:{top:"0.15em","margin-right":"0.05em","margin-left":"0em"}},[s("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[s("span",{staticStyle:{"font-size":"0em"}},[t._v("​")])]),s("span",{staticClass:"reset-textstyle scriptstyle cramped"},[s("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.05724em"}},[t._v("j")])])]),s("span",{staticClass:"baseline-fix"},[s("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[s("span",{staticStyle:{"font-size":"0em"}},[t._v("​")])]),t._v("​")])])])])])]),t._v("，然后第 i 行的信息 all-reduce（一种通讯算法，复杂度 "),s("span",{staticClass:"katex"},[s("span",{staticClass:"katex-mathml"},[s("math",[s("semantics",[s("mrow",[s("mi",[t._v("O")]),s("mo",[t._v("(")]),s("mi",[t._v("log")]),s("mi",[t._v("n")]),s("mo",[t._v(")")])],1),s("annotation",{attrs:{encoding:"application/x-tex"}},[t._v("O(\\log n)")])],1)],1)],1),s("span",{staticClass:"katex-html",attrs:{"aria-hidden":"true"}},[s("span",{staticClass:"strut",staticStyle:{height:"0.75em"}}),s("span",{staticClass:"strut bottom",staticStyle:{height:"1em","vertical-align":"-0.25em"}}),s("span",{staticClass:"base textstyle uncramped"},[s("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.02778em"}},[t._v("O")]),s("span",{staticClass:"mopen"},[t._v("(")]),s("span",{staticClass:"mop"},[t._v("lo"),s("span",{staticStyle:{"margin-right":"0.01389em"}},[t._v("g")])]),s("span",{staticClass:"mord mathit"},[t._v("n")]),s("span",{staticClass:"mclose"},[t._v(")")])])])]),t._v(" 就行）一下，就能得到 "),s("span",{staticClass:"katex"},[s("span",{staticClass:"katex-mathml"},[s("math",[s("semantics",[s("mrow",[s("msub",[s("mi",[t._v("a")]),s("mi",[t._v("i")])],1)],1),s("annotation",{attrs:{encoding:"application/x-tex"}},[t._v("a_i")])],1)],1)],1),s("span",{staticClass:"katex-html",attrs:{"aria-hidden":"true"}},[s("span",{staticClass:"strut",staticStyle:{height:"0.43056em"}}),s("span",{staticClass:"strut bottom",staticStyle:{height:"0.58056em","vertical-align":"-0.15em"}}),s("span",{staticClass:"base textstyle uncramped"},[s("span",{staticClass:"mord"},[s("span",{staticClass:"mord mathit"},[t._v("a")]),s("span",{staticClass:"vlist"},[s("span",{staticStyle:{top:"0.15em","margin-right":"0.05em","margin-left":"0em"}},[s("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[s("span",{staticStyle:{"font-size":"0em"}},[t._v("​")])]),s("span",{staticClass:"reset-textstyle scriptstyle cramped"},[s("span",{staticClass:"mord mathit"},[t._v("i")])])]),s("span",{staticClass:"baseline-fix"},[s("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[s("span",{staticStyle:{"font-size":"0em"}},[t._v("​")])]),t._v("​")])])])])])]),t._v(" 的排名了，将 "),s("span",{staticClass:"katex"},[s("span",{staticClass:"katex-mathml"},[s("math",[s("semantics",[s("mrow",[s("msub",[s("mi",[t._v("a")]),s("mi",[t._v("i")])],1)],1),s("annotation",{attrs:{encoding:"application/x-tex"}},[t._v("a_i")])],1)],1)],1),s("span",{staticClass:"katex-html",attrs:{"aria-hidden":"true"}},[s("span",{staticClass:"strut",staticStyle:{height:"0.43056em"}}),s("span",{staticClass:"strut bottom",staticStyle:{height:"0.58056em","vertical-align":"-0.15em"}}),s("span",{staticClass:"base textstyle uncramped"},[s("span",{staticClass:"mord"},[s("span",{staticClass:"mord mathit"},[t._v("a")]),s("span",{staticClass:"vlist"},[s("span",{staticStyle:{top:"0.15em","margin-right":"0.05em","margin-left":"0em"}},[s("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[s("span",{staticStyle:{"font-size":"0em"}},[t._v("​")])]),s("span",{staticClass:"reset-textstyle scriptstyle cramped"},[s("span",{staticClass:"mord mathit"},[t._v("i")])])]),s("span",{staticClass:"baseline-fix"},[s("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[s("span",{staticStyle:{"font-size":"0em"}},[t._v("​")])]),t._v("​")])])])])])]),t._v(" 写到排名位置即可。")]),t._v(" "),s("p",[t._v("这样总复杂度还是 "),s("span",{staticClass:"katex"},[s("span",{staticClass:"katex-mathml"},[s("math",[s("semantics",[s("mrow",[s("mi",[t._v("O")]),s("mo",[t._v("(")]),s("mi",[t._v("log")]),s("mi",[t._v("n")]),s("mo",[t._v(")")])],1),s("annotation",{attrs:{encoding:"application/x-tex"}},[t._v("O(\\log n)")])],1)],1)],1),s("span",{staticClass:"katex-html",attrs:{"aria-hidden":"true"}},[s("span",{staticClass:"strut",staticStyle:{height:"0.75em"}}),s("span",{staticClass:"strut bottom",staticStyle:{height:"1em","vertical-align":"-0.25em"}}),s("span",{staticClass:"base textstyle uncramped"},[s("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.02778em"}},[t._v("O")]),s("span",{staticClass:"mopen"},[t._v("(")]),s("span",{staticClass:"mop"},[t._v("lo"),s("span",{staticStyle:{"margin-right":"0.01389em"}},[t._v("g")])]),s("span",{staticClass:"mord mathit"},[t._v("n")]),s("span",{staticClass:"mclose"},[t._v(")")])])])]),t._v("。")])])}),[],!1,null,null,null);s.default=e.exports}}]);