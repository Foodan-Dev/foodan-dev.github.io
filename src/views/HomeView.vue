<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { RouterLink } from 'vue-router'
import appIconUrl from '../assets/images/app-icons/egg-chopsticks-app-icon-master-1254.png'
import {
  PhArrowUpRight,
  PhBookOpenText,
  PhChatCircleDots,
  PhCheckCircle,
  PhForkKnife,
  PhLockKey,
  PhMagnifyingGlass,
  PhShareNetwork,
  PhShieldCheck,
  PhSparkle,
  PhUsersThree,
} from '@phosphor-icons/vue'

const revealRoot = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | undefined

onMounted(() => {
  document.title = '旦食 App | 生命不息，干饭不止'
  observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
    { threshold: 0.12 },
  )
  revealRoot.value?.querySelectorAll('.reveal').forEach((el) => observer?.observe(el))
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div ref="revealRoot" class="home-page">
    <section class="hero section-pad">
      <div class="container hero-grid">
        <div class="hero-copy reveal">
          <h1>生命不息，<br /><span>干饭不止</span></h1>
          <p class="hero-lede">面向复旦大学在校师生的校园美食分享平台。</p>
          <div class="hero-actions">
            <a class="button" href="https://github.com/Foodan-Dev/Danshi-frontend/releases/latest" target="_blank" rel="noreferrer">
              <span>下载旦食</span>
              <PhArrowUpRight :size="18" weight="bold" />
            </a>
            <RouterLink class="text-link" to="/docs">阅读文档 <PhArrowUpRight :size="16" weight="bold" /></RouterLink>
          </div>
        </div>

        <div class="hero-visual reveal reveal-late" aria-label="旦食应用图标与校园美食">
          <div class="visual-surface">
            <div class="sun-shape" aria-hidden="true"></div>
            <div class="photo-frame">
              <img src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1100&q=85" alt="一桌新鲜的校园美食" />
              <span class="photo-label">今天吃什么</span>
            </div>
            <div class="icon-card">
              <img :src="appIconUrl" alt="旦食应用图标" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="intro-band section-pad-sm reveal">
      <div class="container intro-grid">
        <div class="intro-symbol"><PhForkKnife :size="30" weight="duotone" /></div>
        <p>你可以在旦食上分享美食体验、发布就餐提问、浏览其他同学的推荐和评价。</p>
        <RouterLink class="circle-link" to="/docs/support" aria-label="查看技术支持">
          <PhArrowUpRight :size="21" weight="bold" />
        </RouterLink>
      </div>
    </section>

    <section class="discover section-pad">
      <div class="container">
        <div class="section-heading reveal">
          <h2>发现好味道</h2>
          <p>搜索餐厅和窗口，查看同学的推荐，也分享你的就餐体验。</p>
        </div>
        <div class="feature-layout">
          <article class="feature-feature reveal">
            <div class="feature-image feature-image-tall">
              <img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85" alt="热气腾腾的面食" loading="lazy" />
            </div>
            <div class="feature-copy">
              <span class="feature-icon"><PhShareNetwork :size="21" weight="bold" /></span>
              <h3>分享美食体验</h3>
              <p>推荐或避雷一道菜，记录你真实的就餐感受。</p>
            </div>
          </article>
          <div class="feature-stack">
            <article class="feature-row reveal">
              <div class="feature-copy">
                <span class="feature-icon feature-icon-green"><PhChatCircleDots :size="21" weight="bold" /></span>
                <h3>发布就餐提问</h3>
                <p>询问美食推荐，和同学一起找到答案。</p>
              </div>
              <div class="feature-image feature-image-square">
                <img src="https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=700&q=85" alt="朋友围坐分享餐食" loading="lazy" />
              </div>
            </article>
            <article class="feature-row feature-row-soft reveal">
              <div class="feature-copy">
                <span class="feature-icon feature-icon-yellow"><PhMagnifyingGlass :size="21" weight="bold" /></span>
                <h3>浏览推荐和评价</h3>
                <p>搜索校园里的餐厅和窗口，看看大家正在吃什么。</p>
              </div>
              <div class="mini-list" aria-hidden="true">
                <span>今日推荐</span>
                <strong>生烫牛肉米线</strong>
                <small>邯郸校区 · 旦苑餐厅</small>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
