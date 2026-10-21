<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import AppDownloads from '../components/AppDownloads.vue'
import appIconUrl from '../assets/images/app-icons/egg-chopsticks-app-icon-master-1254.png'
import { detectInAppBrowser, openInBrowserLabel } from '../lib/in-app-browser'

const route = useRoute()
const appLink = computed(() => `danshi://post/${route.params.id}`)
const userAgent = typeof navigator === 'undefined' ? '' : navigator.userAgent
const inAppBrowser = detectInAppBrowser(userAgent)
const browserLabel = openInBrowserLabel(userAgent)
// WeChat and similar webviews ignore danshi:// links, so guide users to the system browser first.
const showGuide = ref(inAppBrowser !== null)

function openApp(event: MouseEvent) {
  if (!inAppBrowser) return
  event.preventDefault()
  showGuide.value = true
}

onMounted(() => { document.title = '在旦食 App 中查看这篇帖子 | 旦食' })
</script>

<template>
  <section class="post-page section-pad">
    <div class="container post-content">
      <p v-if="inAppBrowser" class="post-browser-tip" role="note">
        当前页面无法直接打开 App。请点击右上角 <strong>···</strong>，选择「{{ browserLabel }}」。
      </p>
      <img class="post-icon" :src="appIconUrl" alt="旦食应用图标" width="88" height="88" />
      <h1>在旦食 App 中查看这篇帖子</h1>
      <p class="post-description">打开旦食，看看同学分享的校园美食与就餐体验。</p>
      <a class="button post-open" :href="appLink" @click="openApp">打开旦食</a>
      <div class="post-downloads">
        <h2>还没有安装旦食？</h2>
        <p class="post-description">先下载安装，再回到这里打开帖子。若未能唤起 App，请在系统浏览器中打开此链接。</p>
        <AppDownloads />
      </div>
    </div>
    <div
      v-if="showGuide"
      class="browser-guide"
      role="dialog"
      aria-modal="true"
      aria-labelledby="browser-guide-title"
      @click="showGuide = false"
    >
      <svg class="browser-guide-arrow" viewBox="0 0 120 120" aria-hidden="true">
        <path d="M20 108 C 40 60, 70 34, 104 18" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
        <path d="M80 12 L 106 16 L 98 42" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <div class="browser-guide-card">
        <p id="browser-guide-title" class="browser-guide-title">请在浏览器中打开</p>
        <ol>
          <li>点击右上角 <strong>···</strong></li>
          <li>选择「{{ browserLabel }}」</li>
          <li>在浏览器中点击「打开旦食」</li>
        </ol>
        <button type="button" class="browser-guide-close" @click.stop="showGuide = false">我知道了</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.post-page { flex: 1; background: var(--paper-warm); padding: 48px 0; }
.post-content { max-width: 680px; }
.post-icon { border-radius: 22px; margin-bottom: 28px; }
h1 { font-size: clamp(28px, 5vw, 42px); line-height: 1.3; margin: 0 0 18px; }
.post-description { color: var(--ink-soft); line-height: 1.8; }
.post-open { margin-top: 16px; width: 100%; }
.post-downloads { margin-top: 40px; padding-top: 28px; border-top: 1px solid var(--line); }
h2 { font-size: 20px; margin: 0; }
.post-browser-tip { margin: 0 0 24px; padding: 12px 16px; border-radius: 14px; background: var(--white); color: var(--ink-soft); line-height: 1.7; border: 1px solid var(--line); }
.browser-guide { position: fixed; inset: 0; z-index: 50; background: rgba(20, 28, 26, .86); color: var(--white); display: flex; flex-direction: column; align-items: flex-end; padding: 8px 16px 24px; }
.browser-guide-arrow { width: 96px; height: 96px; margin-right: 4px; }
.browser-guide-card { width: min(320px, 100%); margin-top: 4px; padding: 20px 22px; border-radius: 20px; background: var(--ink); border: 1px solid rgba(255, 255, 255, .18); box-shadow: 0 16px 40px rgba(0, 0, 0, .35); }
.browser-guide-title { margin: 0 0 10px; font-size: 20px; font-weight: 700; }
.browser-guide-card ol { margin: 0; padding-left: 20px; line-height: 2; font-size: 16px; }
.browser-guide-close { margin-top: 16px; min-height: 44px; width: 100%; border-radius: var(--radius-control); background: var(--white); color: var(--ink); font-size: 15px; font-weight: 700; }
@media (min-width: 640px) {
  .post-page { padding: 80px 0; }
  .post-open { width: auto; min-width: 180px; }
}
</style>
