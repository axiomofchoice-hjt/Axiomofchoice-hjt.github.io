<script setup lang="ts">
import { computed, ref } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useData, useRoute } from 'vitepress'
import BlogHome from './components/BlogHome.vue'
import ArticleHeader from './components/ArticleHeader.vue'
import DocPrevNext from './components/DocPrevNext.vue'

const { Layout } = DefaultTheme
const { page } = useData()
const route = useRoute()

const isHome = computed(() => route.path === '/')
const isPost = computed(() => !!page.value.filePath?.startsWith('posts/'))

/** 左侧文章导航默认收起，点击导航栏按钮展开/收起（vdoing 风格） */
const sidebarCollapsed = ref(true)
const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}
</script>

<template>
  <Layout :class="{ 'vd-collapsed': sidebarCollapsed, 'vd-is-post': isPost }">
    <!-- 文章导航展开/收起按钮：位于顶部导航栏站点标题右侧（标题行内插槽）。
         所有页面都渲染以占位（非文章页 visibility:hidden），
         保证搜索框/链接位置在文章页与非文章页完全一致。
         注意：插槽位于标题 <a href="/"> 链接内部，按钮必须 preventDefault，
         否则点击会冒泡触发跳转首页 -->
    <template #nav-bar-title-after>
      <button
        class="vd-sidebar-toggle"
        :class="{ 'is-open': !sidebarCollapsed }"
        :title="sidebarCollapsed ? '展开文章导航' : '收起文章导航'"
        aria-label="切换文章导航"
        @click.prevent="toggleSidebar"
      >
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </template>

    <!-- 首页：vdoing 风格自定义首页 -->
    <template #home-hero-before>
      <BlogHome v-if="isHome" />
    </template>

    <!-- 文章页：卡片内的面包屑 + 大标题 + 元信息 -->
    <template #doc-before>
      <ArticleHeader v-if="isPost" />
    </template>

    <!-- 文章页：上一篇 / 下一篇（底部声明由全宽 VPFooter 提供，与主页格式一致） -->
    <template #doc-after>
      <DocPrevNext v-if="isPost" />
    </template>
  </Layout>
</template>
