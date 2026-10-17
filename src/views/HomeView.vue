<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { cachedManifest, fetchManifest, type ReleaseManifest } from '../lib/releases'
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
const release = ref<ReleaseManifest | null>(null)
const loading = ref(true)
const downloadError = ref(false)
const downloadSize = computed(() => release.value ? `${(release.value.android.artifact.sizeBytes / 1_000_000).toFixed(1)} MB` : '')
const releaseDate = computed(() => release.value
  ? new Intl.DateTimeFormat('zh-CN', { timeZone: 'Asia/Shanghai' }).format(new Date(release.value.android.publishedAt)) : '')
let request: AbortController | undefined
let lastAttempt = 0

async function loadRelease() {
  request?.abort()
  const controller = new AbortController()
  request = controller
  lastAttempt = Date.now()
  loading.value = true
  downloadError.value = false
  const timeout = setTimeout(() => controller.abort(), 8000)
  try {
    const result = await fetchManifest(controller.signal)
    if (request === controller) release.value = result
  } catch {
    if (request === controller) downloadError.value = true
  } finally {
    clearTimeout(timeout)
    if (request === controller) loading.value = false
  }
}

function refreshOnReturn() {
  if (document.visibilityState === 'visible' && Date.now() - lastAttempt > 60_000) void loadRelease()
}

onMounted(() => {
  document.title = '旦食 App | 生命不息，干饭不止'
  release.value = cachedManifest()
  void loadRelease()
  document.addEventListener('visibilitychange', refreshOnReturn)
  observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
    { threshold: 0.12 },
  )
  revealRoot.value?.querySelectorAll('.reveal').forEach((el) => observer?.observe(el))
})

onBeforeUnmount(() => {
  observer?.disconnect()
  request?.abort()
  request = undefined
  document.removeEventListener('visibilitychange', refreshOnReturn)
})
</script>

<template>
  <div ref="revealRoot" class="home-page">
    <section class="hero section-pad">
      <div class="container hero-grid">
        <div class="hero-copy reveal">
          <h1>生命不息，<br /><span>干饭不止</span></h1>
          <p class="hero-lede">面向复旦大学在校师生的校园美食分享平台。</p>
          <div id="download" class="hero-actions">
            <a v-if="release" class="button" :href="release.android.artifact.url">
              <span>下载 Android APK</span>
              <PhArrowUpRight :size="18" weight="bold" />
            </a>
            <button v-else class="button" :disabled="loading" @click="loadRelease">
              {{ loading ? '正在获取下载信息…' : '重新获取下载信息' }}
            </button>
            <a v-if="release?.ios.installUrl" class="text-link" :href="release.ios.installUrl" target="_blank" rel="noreferrer">
              通过 TestFlight 安装 <PhArrowUpRight :size="16" weight="bold" />
            </a>
            <RouterLink v-else class="text-link" to="/docs/support">申请 iOS 内测 <PhArrowUpRight :size="16" weight="bold" /></RouterLink>
          </div>
          <div class="download-details" aria-live="polite" aria-atomic="true">
            <p v-if="release">Android v{{ release.android.version }} · {{ downloadSize }} · {{ releaseDate }} 发布</p>
            <p v-if="downloadError" class="download-error">
              {{ release ? '暂时无法获取最新版本，当前显示上次获取的版本。' : '下载信息暂时不可用，请稍后重试。' }}
              <button v-if="release" class="download-retry" :disabled="loading" @click="loadRelease">重试</button>
            </p>
            <p>iPhone 通过 TestFlight 参与测试。<RouterLink to="/docs">阅读使用文档</RouterLink></p>
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
