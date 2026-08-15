<script setup lang="ts">
import { computed } from 'vue'
import { data as posts } from '../data/posts.data'
import PostTimeline from './PostTimeline.vue'

const total = computed(() => posts.length)
const years = computed(() => new Set(posts.map((p) => p.year)).size)
</script>

<template>
  <div class="timeline-page">
    <p class="cat-detail-desc timeline-desc">
      共 {{ total }} 篇文章 · {{ years }} 个年份，按发布时间归档
    </p>
    <PostTimeline :posts="posts" :group-by-year="true" />
  </div>
</template>
