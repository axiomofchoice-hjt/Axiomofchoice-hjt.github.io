<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vitepress'
import { data as posts } from '../data/posts.data'

const route = useRoute()

/** posts 按日期倒序：index-1 更新，index+1 更旧 */
const idx = computed(() =>
  posts.findIndex((p) => p.url === decodeURIComponent(route.path)),
)

const prev = computed(() => (idx.value >= 0 ? posts[idx.value + 1] : undefined))
const next = computed(() => (idx.value > 0 ? posts[idx.value - 1] : undefined))
</script>

<template>
  <nav v-if="prev || next" class="doc-prevnext">
    <a v-if="prev" class="pn-card" :href="prev.url">
      <span class="pn-label">← 上一篇</span>
      <span class="pn-title">{{ prev.title }}</span>
      <span class="pn-date">{{ prev.dateText }}</span>
    </a>
    <a v-if="next" class="pn-card next" :href="next.url">
      <span class="pn-label">下一篇 →</span>
      <span class="pn-title">{{ next.title }}</span>
      <span class="pn-date">{{ next.dateText }}</span>
    </a>
  </nav>
</template>
