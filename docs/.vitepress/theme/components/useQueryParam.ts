import { ref, onMounted, onUnmounted } from 'vue'

/**
 * 响应式读取 URL 查询参数。
 *
 * 为什么不能直接用 VitePress 的 useRoute()：其 route 对象只有
 * { path, component, data }，不包含 query；且同路径 query 变化
 * （SPA pushState 导航）不会触发任何响应式依赖更新。
 *
 * 这里直接读 window.location，并监听：
 *  - document click（捕获阶段）：VitePress 的导航拦截器在 window 捕获阶段
 *    同步执行 pushState，随后本监听执行时 location 已更新
 *  - window popstate：浏览器后退 / 前进
 *
 * 关键细节：SPA 导航到其他页面时（如点文章链接），pushState 先执行而新页面
 * chunk 还在加载，旧页面（本组件）仍短暂可见；此时若照常同步参数会读到
 * 新 URL 的 query（无此参数）并把状态重置为默认值，造成内容闪烁
 * （如分类页闪回第一个分类）。因此仅当 pathname 未变（仍在当前页）时才同步。
 *
 * SSR 阶段返回 null，由调用方回退默认值（构建产物无法预知 query）。
 */
export function useQueryParam(name: string) {
  const value = ref<string | null>(null)

  if (typeof window !== 'undefined') {
    // 组件挂载时的页面路径（本组件只关心自己页面上的 query 变化）
    const ownPath = window.location.pathname
    const read = () => {
      // 导航到其他页面（pathname 已变）时不更新，避免旧页面闪烁
      if (window.location.pathname !== ownPath) return
      value.value = new URLSearchParams(window.location.search).get(name)
    }

    onMounted(() => {
      // hydration 完成后读取当前 URL（整页加载带 query 的场景）
      read()
      document.addEventListener('click', read, true)
      window.addEventListener('popstate', read)
      onUnmounted(() => {
        document.removeEventListener('click', read, true)
        window.removeEventListener('popstate', read)
      })
    })
  }

  return value
}
