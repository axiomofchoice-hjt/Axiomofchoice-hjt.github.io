<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vitepress'
import { data as posts } from '../data/posts.data'
import { formatDateZh } from '../data/meta'

const route = useRoute()

const post = computed(() =>
  posts.find((p) => p.url === decodeURIComponent(route.path)),
)
</script>

<template>
  <div v-if="post" class="article-header">
    <!-- 面包屑：首页(home 图标) / 分类（不含文章名，与原站 vdoing 一致） -->
    <nav class="vd-crumb" aria-label="面包屑">
      <a class="vd-crumb-home" href="/" title="首页" aria-label="首页">
        <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
          <path
            fill="currentColor"
            d="M 22.698 12.174 Q 22.450 12.174 22.277 12.000 L 11.734 1.383 Q 11.536 1.185 11.288 1.185 Q 11.040 1.185 10.841 1.383 L 0.299 11.950 Q 0.125 12.124 -0.123 12.124 Q -0.371 12.124 -0.532 11.975 Q -0.693 11.826 -0.705 11.578 Q -0.718 11.330 -0.519 11.107 L 9.948 0.565 Q 10.519 -0.006 11.276 -0.006 Q 12.032 -0.006 12.578 0.565 L 23.120 11.157 Q 23.294 11.330 23.294 11.603 Q 23.294 11.876 23.071 12.050 Q 22.897 12.174 22.698 12.174 Z M 14.413 24.006 V 23.187 H 13.570 V 21.674 Q 13.570 20.732 12.900 20.062 Q 12.231 19.392 11.288 19.392 Q 10.345 19.392 9.676 20.062 Q 9.006 20.732 9.006 21.674 V 23.187 H 8.162 V 24.006 H 3.474 Q 2.705 24.006 2.172 23.473 Q 1.639 22.939 1.639 22.195 V 11.901 Q 1.639 11.628 1.812 11.467 Q 1.986 11.305 2.234 11.305 Q 2.482 11.305 2.656 11.467 Q 2.829 11.628 2.829 11.901 V 22.195 Q 2.829 22.468 3.015 22.642 Q 3.201 22.815 3.474 22.815 H 7.815 V 21.699 Q 7.815 20.756 8.286 19.950 Q 8.758 19.144 9.552 18.685 Q 10.345 18.226 11.288 18.226 Q 12.231 18.226 13.024 18.697 Q 13.818 19.169 14.289 19.963 Q 14.761 20.756 14.761 21.699 V 22.815 H 19.102 Q 19.375 22.815 19.561 22.642 Q 19.747 22.468 19.747 22.195 V 11.901 Q 19.747 11.628 19.920 11.467 Q 20.094 11.305 20.342 11.305 Q 20.590 11.305 20.764 11.467 Q 20.937 11.628 20.937 11.901 V 22.195 Q 20.937 22.939 20.404 23.473 Q 19.871 24.006 19.102 24.006 Z M 13.570 24.006 V 22.815 H 14.761 V 24.006 Z M 7.815 24.006 V 22.815 H 9.006 V 24.006 Z"
          />
        </svg>
      </a>
      <span class="vd-crumb-sep">/</span>
      <a
        class="vd-crumb-link"
        :href="`/categories.html?c=${encodeURIComponent(post.category)}`"
      >
        {{ post.category }}
      </a>
    </nav>

    <!-- 大标题：文章 markdown 无 H1，由主题补一个（与原站一致） -->
    <h1 class="vd-post-title">{{ post.title }}</h1>

    <!-- 元信息：日期 / 作者 / 字数 / 阅读时间 / 分类 / 标签 -->
    <div class="article-meta">
      <span class="am-item">📅 {{ formatDateZh(post.date) }}</span>
      <span class="am-item">✍️ {{ post.author }}</span>
      <span class="am-item">📖 {{ post.words }} 字</span>
      <span class="am-item">⏱️ {{ post.readingTime }} 分钟</span>
      <a class="am-cat" :href="`/categories.html?c=${encodeURIComponent(post.category)}`">
        {{ post.category }}
      </a>
      <span v-for="t in post.tags" :key="t" class="am-tag"># {{ t }}</span>
    </div>
  </div>
</template>
