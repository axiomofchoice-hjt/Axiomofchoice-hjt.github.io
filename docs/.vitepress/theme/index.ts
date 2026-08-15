import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import CategoriesPage from './components/CategoriesPage.vue'
import TimelinePage from './components/TimelinePage.vue'
import 'katex/dist/katex.min.css'
import './styles/index.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    // 供 Markdown 页面直接使用的聚合页组件
    app.component('CategoriesPage', CategoriesPage)
    app.component('TimelinePage', TimelinePage)
  },
} satisfies Theme
