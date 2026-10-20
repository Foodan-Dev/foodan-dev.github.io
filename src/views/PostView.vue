<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AppDownloads from '../components/AppDownloads.vue'
import appIconUrl from '../assets/images/app-icons/egg-chopsticks-app-icon-master-1254.png'

const route = useRoute()
const appLink = computed(() => `danshi://post/${route.params.id}`)
onMounted(() => { document.title = '在旦食 App 中查看这篇帖子 | 旦食' })
</script>

<template>
  <section class="post-page section-pad">
    <div class="container post-content">
      <img class="post-icon" :src="appIconUrl" alt="旦食应用图标" width="88" height="88" />
      <h1>在旦食 App 中查看这篇帖子</h1>
      <p class="post-description">打开旦食，看看同学分享的校园美食与就餐体验。</p>
      <a class="button post-open" :href="appLink">打开旦食</a>
      <div class="post-downloads">
        <h2>还没有安装旦食？</h2>
        <p class="post-description">先下载安装，再回到这里打开帖子。若未能唤起 App，请在系统浏览器中打开此链接。</p>
        <AppDownloads />
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
@media (min-width: 640px) {
  .post-page { padding: 80px 0; }
  .post-open { width: auto; min-width: 180px; }
}
</style>
