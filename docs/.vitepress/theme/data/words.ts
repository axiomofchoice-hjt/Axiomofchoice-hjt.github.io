// 从 markdown 源码估算正文字数（字 = 字符数，与渲染后统计同量级）。
// 不渲染全文：dev/build 都基于源码统计，两边数字一致，且避免 dev 首次加载
// 渲染 141 篇文章（约 9s）。经验证，对 prose/代码为主的文章与渲染 HTML
// 统计的偏差平均约 16%；KaTeX 数学文反而更接近真实篇幅（渲染版会把公式
// 的 mathml + html 双份计入，虚高约一倍）。
// 注意：不能直接对源码做 <[^>]*> 标签剥离——代码里的 `<`（如 a < b）会
// 吞掉大段文本，因此这里完全不剥离 HTML 标签（源码中极少出现）。
export const countWordsFromSource = (src: string): number => {
  let s = src
  // 去掉 frontmatter
  s = s.replace(/^---\n[\s\S]*?\n---\n?/, '')
  // 去掉 HTML 注释
  s = s.replace(/<!--[\s\S]*?-->/g, ' ')
  // 图片整体去掉（渲染后不产生文本）
  s = s.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
  // 链接只保留文字（渲染后 URL 不计入）
  s = s.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
  // 空白折叠后计字符数
  return s.replace(/\s+/g, ' ').trim().length
}
