(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{423:function(t,a,s){"use strict";s.r(a);var n=s(10),e=Object(n.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("p",[t._v("某天深夜，我在床上水裙，发现竟有裙友说出三异或的交换效率最高，而且在我纠正后没有裙友理我。")]),t._v(" "),a("p",[t._v("我觉得这可能只是少数人的错误认知。")]),t._v(" "),a("p",[t._v("本来这事情也就过去了，今天又看到有人代码里写三异或，看来 oier / acmer 群体这方面的误解很深啊，必须来写个文章解释一下。")]),t._v(" "),a("p",[t._v("正巧最近学了点汇编，本着授人以鱼不如授人以渔的想法，就稍微演示一下如何用汇编分析代码吧。")]),t._v(" "),a("hr"),t._v(" "),a("p",[t._v("先打开一个 Linux 环境（这里用 vscode 连接了 WSL），如果没有 Linux 环境，WSL 安装起来炒鸡方便，建议 WSL。如果没有 gcc / objdump，而且是 ubuntu（其他不会），可以 "),a("code",[t._v("sudo apt install build-essential")]),t._v(" 来安装。")]),t._v(" "),a("p",[t._v("linux / gcc 版本如下：")]),t._v(" "),a("p",[a("img",{attrs:{src:"/img/img_04ae8d.jpg",alt:"img"}})]),t._v(" "),a("p",[t._v("然后写一下我们要测试的 4 种交换写法，保存为 test.cpp")]),t._v(" "),a("div",{staticClass:"language-cpp extra-class"},[a("pre",{pre:!0,attrs:{class:"language-cpp"}},[a("code",[a("span",{pre:!0,attrs:{class:"token macro property"}},[a("span",{pre:!0,attrs:{class:"token directive-hash"}},[t._v("#")]),a("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("include")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("<algorithm>")])]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("xor_swap")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    a "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("^=")]),t._v(" b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    b "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("^=")]),t._v(" a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    a "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("^=")]),t._v(" b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add_sub_swap")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    a "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" a "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    b "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" a "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    a "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" a "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("mov_swap")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" t "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    a "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    b "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("std_swap")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" std"),a("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("swap")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("编译到目标文件，使用 oi / acm 界最牛的优化层级 -Ofast")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[t._v("gcc "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-Ofast")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-c")]),t._v(" test.cpp\n")])])]),a("p",[t._v("运行完这个命令，会在当前目录生成一个 test.o，即目标文件。它是二进制的，我们可以用反汇编工具 objdump 来转换为人类可读的汇编代码")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[t._v("objdump "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-d")]),t._v(" test.o "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" test.o.txt\n")])])]),a("p",[t._v("然后查看 test.o.txt")]),t._v(" "),a("div",{staticClass:"language-text extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("test.o:     file format elf64-x86-64\n\n\nDisassembly of section .text:\n\n0000000000000000 &lt;_Z8xor_swapRiS_>:\n   0: f3 0f 1e fa           endbr64 \n   4: 8b 07                 mov    (%rdi),%eax\n   6: 33 06                 xor    (%rsi),%eax\n   8: 89 07                 mov    %eax,(%rdi)\n   a: 33 06                 xor    (%rsi),%eax\n   c: 89 06                 mov    %eax,(%rsi)\n   e: 31 07                 xor    %eax,(%rdi)\n  10: c3                    retq\n  11: 66 66 2e 0f 1f 84 00  data16 nopw %cs:0x0(%rax,%rax,1)\n  18: 00 00 00 00 \n  1c: 0f 1f 40 00           nopl   0x0(%rax)\n\n0000000000000020 &lt;_Z12add_sub_swapRiS_>:\n  20: f3 0f 1e fa           endbr64 \n  24: 8b 06                 mov    (%rsi),%eax\n  26: 03 07                 add    (%rdi),%eax\n  28: 89 07                 mov    %eax,(%rdi)\n  2a: 2b 06                 sub    (%rsi),%eax\n  2c: 89 06                 mov    %eax,(%rsi)\n  2e: 29 07                 sub    %eax,(%rdi)\n  30: c3                    retq\n  31: 66 66 2e 0f 1f 84 00  data16 nopw %cs:0x0(%rax,%rax,1)\n  38: 00 00 00 00 \n  3c: 0f 1f 40 00           nopl   0x0(%rax)\n\n0000000000000040 &lt;_Z8mov_swapRiS_>:\n  40: f3 0f 1e fa           endbr64 \n  44: 8b 07                 mov    (%rdi),%eax\n  46: 8b 16                 mov    (%rsi),%edx\n  48: 89 17                 mov    %edx,(%rdi)\n  4a: 89 06                 mov    %eax,(%rsi)\n  4c: c3                    retq\n  4d: 0f 1f 00              nopl   (%rax)\n\n0000000000000050 &lt;_Z8std_swapRiS_>:\n  50: f3 0f 1e fa           endbr64 \n  54: 8b 07                 mov    (%rdi),%eax\n  56: 8b 16                 mov    (%rsi),%edx\n  58: 89 17                 mov    %edx,(%rdi)\n  5a: 89 06                 mov    %eax,(%rsi)\n  5c: c3                    retq\n")])])]),a("p",[t._v("可以看到，忽略没什么用的指令后，xor_swap 实际上编译成了这 7 个语句")]),t._v(" "),a("div",{staticClass:"language-text extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("mov    (%rdi),%eax\nxor    (%rsi),%eax\nmov    %eax,(%rdi)\nxor    (%rsi),%eax\nmov    %eax,(%rsi)\nxor    %eax,(%rdi)\nretq\n")])])]),a("p",[t._v("考虑到读者可能看不懂汇编，这里解释一下")]),t._v(" "),a("p",[a("code",[t._v("mov a b")]),t._v(" 可以看成 c艹 的 "),a("code",[t._v("b = a;")])]),t._v(" "),a("p",[a("code",[t._v("xor a b")]),t._v(" 可以看成 c艹 的 "),a("code",[t._v("b ^= a;")])]),t._v(" "),a("p",[a("code",[t._v("%rdi %rsi %eax")]),t._v(" 表示寄存器")]),t._v(" "),a("p",[a("code",[t._v("(%rdi)")]),t._v(" 表示 rdi 寄存器作为地址，间接访问内存")]),t._v(" "),a("p",[a("code",[t._v("retq")]),t._v(" 表示函数栈 pop，并将 pop 出来的地址作为下一条指令，一般函数结束时会有这个指令")]),t._v(" "),a("p",[t._v("因此这个汇编代码可以类似地用 c艹 代码表示为：（用 mem 数组表示内存）")]),t._v(" "),a("div",{staticClass:"language-cpp extra-class"},[a("pre",{pre:!0,attrs:{class:"language-cpp"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" mem"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("114514")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" rdi"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" rsi"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" eax"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" edx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("xor_swap")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    eax "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" mem"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("rdi"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// mov    (%rdi),%eax")]),t._v("\n    eax "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("^=")]),t._v(" mem"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("rsi"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// xor    (%rsi),%eax")]),t._v("\n    mem"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("rdi"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" eax"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// mov    %eax,(%rdi)")]),t._v("\n    eax "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("^=")]),t._v(" mem"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("rsi"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// xor    (%rsi),%eax")]),t._v("\n    mem"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("rsi"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" eax"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// mov    %eax,(%rsi)")]),t._v("\n    mem"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("rdi"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("^=")]),t._v(" eax"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// xor    %eax,(%rdi)")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("          "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// retq")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("（当然一般内存是以字节编址的，这里 mem 用 int 4 字节编址，不能代表真实内存）")]),t._v(" "),a("p",[t._v("明眼人可能就看出来了，这不就是交换了 "),a("code",[t._v("mem[rdi]")]),t._v(" 和 "),a("code",[t._v("mem[rsi]")]),t._v(" 吗。然后再看一下另外 3 个函数，发现它们的功能也是如此。")]),t._v(" "),a("p",[t._v("我们再来用类似的方法分析一下 mov_swap（mov_swap 和 std_swap 的汇编是一样的，这是因为 "),a("code",[t._v("std::swap")]),t._v(" 几乎就是这么实现）")]),t._v(" "),a("div",{staticClass:"language-cpp extra-class"},[a("pre",{pre:!0,attrs:{class:"language-cpp"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" mem"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("114514")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" rdi"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" rsi"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" eax"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("xor_swap")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    eax "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" mem"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("rdi"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// mov    (%rdi),%eax")]),t._v("\n    edx "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" mem"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("rsi"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// mov    (%rsi),%edx")]),t._v("\n    mem"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("rdi"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" edx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// mov    %edx,(%rdi)")]),t._v("\n    mem"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("rsi"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" eax"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// mov    %eax,(%rsi)")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("         "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// retq")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("最后的结论那肯定是，6 个指令怎么可能打得过 4 个 mov 指令。")]),t._v(" "),a("hr"),t._v(" "),a("p",[t._v("后来又看了一下 "),a("code",[t._v("std::tie(a, b) = std::make_pair(b, a);")]),t._v(" 的汇编，发现也是 4 个mov 指令。")]),t._v(" "),a("hr"),t._v(" "),a("p",[t._v("关于性能测试：不知道 bench 代码怎么写（担心 cache 会干扰），应该有专门工具的吧没了解过。")])])}),[],!1,null,null,null);a.default=e.exports}}]);