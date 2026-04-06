<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="layout">
    <header class="top-nav">
      <div class="brand">旦食</div>
      <nav class="tabs">
        <RouterLink class="tab-link" to="/">首页</RouterLink>
        <RouterLink class="tab-link" to="/docs">文档</RouterLink>
        <el-dropdown trigger="click" popper-class="friend-links-dropdown">
          <span class="tab-link dropdown-trigger">友情链接</span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <a href="https://github.com/FDUCSLG" target="_blank" rel="noreferrer">FDUCSLG</a>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </nav>
    </header>

    <main class="main-content">
      <RouterView />
    </main>

    <footer class="site-footer">
      <span>© 2026 旦食开发部</span>
      <RouterLink to="/docs/terms">使用条款</RouterLink>
      <RouterLink to="/docs/privacy">隐私政策</RouterLink>
    </footer>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #fffdf7 0%, #ffffff 50%, #fffaf0 100%);
}

.top-nav {
  height: 64px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f0e8dc;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(6px);
}

.brand {
  font-size: 22px;
  font-weight: 700;
  color: #8c4e1f;
}

.tabs {
  display: flex;
  align-items: center;
  gap: 18px;
}

.tab-link {
  color: #5f3c1f;
  text-decoration: none;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
}

.tab-link.router-link-exact-active {
  color: #d17b1f;
  font-weight: 600;
}

.dropdown-trigger {
  user-select: none;
}

.dropdown-trigger:hover {
  color: #d17b1f;
}

.tabs :deep(.el-dropdown) {
  display: inline-flex;
  align-items: center;
}

.main-content {
  flex: 1;
}

.site-footer {
  height: 56px;
  border-top: 1px solid #f0e8dc;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  font-size: 13px;
  color: #8b735c;
}

.site-footer a {
  color: #8b735c;
  text-decoration: none;
}

.site-footer a:hover {
  color: #d17b1f;
}
</style>

<style>
.friend-links-dropdown.el-popper {
  border: 1px solid #f0e8dc;
  border-radius: 10px;
  background: #fffaf3;
}

.friend-links-dropdown .el-dropdown-menu__item {
  color: #6a3c13;
}

.friend-links-dropdown .el-dropdown-menu__item:hover {
  background: #fff2e2;
  color: #d17b1f;
}

.friend-links-dropdown .el-dropdown-menu__item a {
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 2px;
}
</style>
