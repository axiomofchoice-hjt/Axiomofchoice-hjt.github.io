<script setup lang="ts">
import { computed } from 'vue'
import { data as posts } from '../data/posts.data'
import { collectCategories } from '../data/meta'
import { useQueryParam } from './useQueryParam'
import PostTimeline from './PostTimeline.vue'

const categories = computed(() => collectCategories(posts))

/** URL ?c= 参数（SSR 为 null）；useRoute().query 在 VitePress 中不存在，必须自读 location */
const qc = useQueryParam('c')

/** 当前选中的分类：优先取 URL 参数，否则默认第一个（SSR 阶段无参数） */
const active = computed(() => {
  const q = qc.value
  if (q && categories.value.some((c) => c.name === q)) return q
  return categories.value[0]?.name || ''
})

const activeInfo = computed(() => categories.value.find((c) => c.name === active.value))

const activePosts = computed(() =>
  active.value ? posts.filter((p) => p.category === active.value) : [],
)
</script>

<template>
  <div class="cat-layout">
    <!-- 左侧分类列表 -->
    <aside class="cat-list">
      <a
        v-for="c in categories"
        :key="c.name"
        class="cat-item"
        :class="{ active: c.name === active }"
        :href="`/categories.html?c=${encodeURIComponent(c.name)}`"
      >
        <span>{{ c.icon }}</span>
        <span>{{ c.name }}</span>
        <span class="cat-count">{{ c.count }}</span>
      </a>
    </aside>

    <!-- 右侧当前分类的文章 -->
    <div class="cat-detail">
      <h3 class="cat-detail-title">
        {{ activeInfo?.icon }} {{ active }} 分类下的文章
      </h3>
      <p v-if="activeInfo?.desc" class="cat-detail-desc">{{ activeInfo.desc }}</p>
      <PostTimeline
        :posts="activePosts"
        :group-by-year="true"
        :show-year-heading="false"
      />
    </div>
  </div>
</template>
