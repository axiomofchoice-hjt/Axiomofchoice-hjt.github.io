<script setup lang="ts">
import { computed } from 'vue'
import { data as posts } from '../data/posts.data'
import { SITE, SOCIAL, collectCategories } from '../data/meta'
import { useQueryParam } from './useQueryParam'

const PER_PAGE = 10

const totalPages = computed(() => Math.max(1, Math.ceil(posts.length / PER_PAGE)))

/** URL ?page= 参数（SSR 为 null）；useRoute().query 在 VitePress 中不存在，必须自读 location */
const qp = useQueryParam('page')

/** 当前页码（首页 ?page=N），SSR 阶段无参数时回退到第 1 页 */
const page = computed(() => {
  const p = parseInt(String(qp.value ?? '1'), 10)
  if (isNaN(p) || p < 1) return 1
  return Math.min(p, totalPages.value)
})

const pagePosts = computed(() => posts.slice((page.value - 1) * PER_PAGE, page.value * PER_PAGE))

/**
 * 分页按钮序列：始终显示首页/尾页与当前页前后各 1 页，中间用省略号省略
 * （如 15 页时第 8 页显示：1 … 7 8 9 … 15）
 */
const pages = computed<(number | '...')[]>(() => {
  const total = totalPages.value
  const cur = page.value
  const wanted = new Set([1, total, cur - 1, cur, cur + 1])
  const nums = [...wanted].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b)
  const out: (number | '...')[] = []
  let prev = 0
  for (const n of nums) {
    if (n - prev > 1) out.push('...')
    out.push(n)
    prev = n
  }
  return out
})

const categories = computed(() => collectCategories(posts))
</script>

<template>
  <div class="blog-home">
    <!-- Hero：与 vdoing 一致，纯文字标题 + tagline -->
    <section class="bh-hero">
      <h1 class="bh-title">{{ SITE.author }}'s Blog</h1>
      <p class="bh-tagline">{{ SITE.slogan }}</p>
    </section>

    <div class="bh-wrap">
      <div class="bh-body">
        <!-- 主区：文章列表 + 分页 -->
        <section class="bh-main">
        <article v-for="p in pagePosts" :key="p.url" class="hp-item">
          <h3 class="hp-title">
            <a :href="p.url">{{ p.title }}</a>
            <span v-if="p.sticky" class="tl-sticky">置顶</span>
          </h3>
          <div class="hp-meta">
            <span class="hp-author">{{ p.author }}</span>
            <span class="hp-date">{{ p.dateText }}</span>
            <a
              class="hp-cat"
              :href="`/categories.html?c=${encodeURIComponent(p.category)}`"
            >
              {{ p.category }}
            </a>
          </div>
        </article>

        <nav v-if="totalPages > 1" class="hp-pager">
          <a
            v-if="page > 1"
            class="hp-page-link"
            :href="`/?page=${page - 1}`"
          >上一页</a>
          <template v-for="(n, i) in pages" :key="i">
            <span v-if="n === '...'" class="hp-page-ellipsis">…</span>
            <a
              v-else
              class="hp-page-link"
              :class="{ active: n === page }"
              :href="`/?page=${n}`"
            >{{ n }}</a>
          </template>
          <a
            v-if="page < totalPages"
            class="hp-page-link"
            :href="`/?page=${page + 1}`"
          >下一页</a>
        </nav>
      </section>

      <!-- 侧栏：博主卡片 + 文章分类 -->
      <aside class="bh-aside">
        <div class="ba-card">
          <div class="hp-blogger">
            <img class="hp-blogger-avatar" src="/avatar.webp" alt="博主头像" />
            <div class="hp-blogger-name">{{ SITE.author }}</div>
            <div class="hp-blogger-slogan">{{ SITE.tagline }}</div>
            <div class="hp-blogger-social">
              <a
                v-for="s in SOCIAL"
                :key="s.name"
                :href="s.link"
                :title="s.name"
                target="_blank"
                rel="noopener"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" v-html="s.icon" />
              </a>
            </div>
          </div>
        </div>

        <div class="ba-card">
          <h4>文章分类</h4>
          <ul>
            <li v-for="c in categories" :key="c.name">
              <a :href="`/categories.html?c=${encodeURIComponent(c.name)}`">
                <span class="ba-cat-name">{{ c.icon }} {{ c.name }}</span>
                <span class="ba-cat-count">{{ c.count }}</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
      </div>
    </div>
  </div>
</template>
