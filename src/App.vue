<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { PhGithubLogo, PhDownloadSimple } from '@phosphor-icons/vue'
import brandMarkUrl from './assets/images/brand-mark.png'
</script>

<template>
  <div class="site-shell">
    <header class="site-header">
      <div class="nav-wrap">
        <RouterLink to="/" class="brand" aria-label="旦食首页">
          <span class="brand-mark"><img :src="brandMarkUrl" alt="" /></span>
          <span class="brand-name">旦食</span>
        </RouterLink>
        <nav class="main-nav" aria-label="主导航">
          <RouterLink to="/" active-class="is-active">首页</RouterLink>
          <RouterLink to="/docs" active-class="is-active">文档</RouterLink>
        </nav>
        <div class="nav-actions">
          <a class="nav-github" href="https://github.com/Foodan-Dev" target="_blank" rel="noreferrer" aria-label="访问旦食 GitHub">
            <PhGithubLogo :size="19" weight="regular" />
            <span>GitHub</span>
          </a>
          <a class="button button-small" href="https://github.com/Foodan-Dev/Danshi-frontend/releases/latest" target="_blank" rel="noreferrer">
            <PhDownloadSimple :size="17" weight="bold" />
            <span>下载</span>
          </a>
        </div>
      </div>
    </header>
    <main>
      <RouterView />
    </main>
    <footer class="site-footer">
      <div class="container footer-grid">
        <div class="footer-brand">
          <div class="brand brand-footer"><span class="brand-mark"><img :src="brandMarkUrl" alt="" /></span><span class="brand-name">旦食</span></div>
          <p>© 2026 旦食开发部</p>
          <a class="footer-record" href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">沪ICP备2021032046号-5</a>
        </div>
        <div class="footer-links">
          <div><span class="footer-title">文档</span><RouterLink to="/docs/privacy">隐私政策</RouterLink><RouterLink to="/docs/terms">使用条款</RouterLink><RouterLink to="/docs/support">技术支持</RouterLink></div>
          <div><span class="footer-title">社区</span><a href="https://github.com/FDUCSLG" target="_blank" rel="noreferrer">FDUCSLG</a><a href="https://github.com/Foodan-Dev" target="_blank" rel="noreferrer">Foodan-Dev</a></div>
        </div>
      </div>
    </footer>
  </div>
</template>
