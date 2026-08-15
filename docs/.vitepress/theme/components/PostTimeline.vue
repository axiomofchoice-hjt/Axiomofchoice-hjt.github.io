<script setup lang="ts">
import { computed } from 'vue'
import type { Post } from '../data/posts.data'
import { groupByYearMonth } from '../data/meta'

const props = withDefaults(
  defineProps<{
    posts: Post[]
    /** 是否按年份/月份分组展示 */
    groupByYear?: boolean
    /** 是否显示年份标题（如分类页关闭：年份直接放进每篇文章的日期里） */
    showYearHeading?: boolean
  }>(),
  { groupByYear: true, showYearHeading: true },
)

const groups = computed(() =>
  groupByYearMonth(props.posts).map((g) => ({
    ...g,
    count: g.months.reduce((n, m) => n + m.posts.length, 0),
  })),
)
</script>

<template>
  <div class="post-timeline">
    <template v-if="groupByYear">
      <section v-for="g in groups" :key="g.year" class="tl-year-group">
        <h3 v-if="showYearHeading" class="tl-year">
          {{ g.year }} 年
          <span class="tl-count">{{ g.count }} 篇</span>
        </h3>
        <template v-for="m in g.months" :key="m.month">
          <!-- 时间线模式：显示年份标题时日期只显示月/日，否则显示完整年月日 -->
          <ul class="tl-list">
            <li v-for="p in m.posts" :key="p.url" class="tl-item">
              <span class="tl-date">{{
                showYearHeading
                  ? p.dateText.slice(5).replace('-', '/')
                  : p.dateText.replaceAll('-', '/')
              }}</span>
              <a class="tl-title" :href="p.url">{{ p.title }}</a>
              <span v-if="p.sticky" class="tl-sticky">置顶</span>
              <span v-if="p.category" class="tl-cat">{{ p.category }}</span>
              <span v-for="t in p.tags.slice(0, 2)" :key="t" class="tl-tag">{{ t }}</span>
            </li>
          </ul>
        </template>
      </section>
    </template>

    <!-- 时间线模式（不分年） -->
    <ul v-else class="tl-list">
      <li v-for="p in posts" :key="p.url" class="tl-item">
        <span class="tl-date">{{ p.dateText }}</span>
        <a class="tl-title" :href="p.url">{{ p.title }}</a>
        <span v-if="p.sticky" class="tl-sticky">置顶</span>
        <span v-if="p.category" class="tl-cat">{{ p.category }}</span>
        <span v-for="t in p.tags.slice(0, 2)" :key="t" class="tl-tag">{{ t }}</span>
      </li>
    </ul>
  </div>
</template>
