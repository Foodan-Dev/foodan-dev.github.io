<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { PhArrowUpRight } from '@phosphor-icons/vue'
import { androidVariantLabels, cachedManifest, fetchManifest, formatDownloadSize, type ReleaseManifest } from '../lib/releases'
import { qqGroupUrl } from '../lib/qq-group'

const release = ref<ReleaseManifest | null>(null)
const loading = ref(true)
const downloadError = ref(false)
const downloadSize = computed(() => release.value ? formatDownloadSize(release.value.android.artifact.sizeBytes) : '')
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
  release.value = cachedManifest()
  void loadRelease()
  document.addEventListener('visibilitychange', refreshOnReturn)
})

onBeforeUnmount(() => {
  request?.abort()
  request = undefined
  document.removeEventListener('visibilitychange', refreshOnReturn)
})
</script>

<template>
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
    <a class="text-link" :href="qqGroupUrl" target="_blank" rel="noreferrer">加入公测 QQ 群 <PhArrowUpRight :size="16" weight="bold" /></a>
  </div>
  <div class="download-details" aria-live="polite" aria-atomic="true">
    <p v-if="release">Android v{{ release.android.version }} · {{ downloadSize }} · {{ releaseDate }} 发布</p>
    <p v-if="downloadError" class="download-error">
      {{ release ? '暂时无法获取最新版本，当前显示上次获取的版本。' : '下载信息暂时不可用，请稍后重试。' }}
      <button v-if="release" class="download-retry" :disabled="loading" @click="loadRelease">重试</button>
    </p>
    <p>iPhone 通过 TestFlight 参与测试。<RouterLink to="/docs">阅读使用文档</RouterLink></p>
  </div>
  <details v-if="release?.android.variants?.length" class="download-variants">
    <summary>其他版本</summary>
    <ul>
      <li v-for="variant in release.android.variants" :key="variant.abi">
        <a :href="variant.url">
          <span>{{ androidVariantLabels[variant.abi] }}</span>
          <span class="variant-size">{{ formatDownloadSize(variant.sizeBytes) }}</span>
        </a>
      </li>
    </ul>
  </details>
</template>
