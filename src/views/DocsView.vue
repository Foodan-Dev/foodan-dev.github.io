<template>
  <section class="docs-home">
    <div class="doc-content">
      <h1>旦食 App 官网文档</h1>

      <div class="index">
        <RouterLink class="index-item" to="/docs/terms">
          <div class="title">使用条款</div>
          <div class="subtitle">网站使用规则与免责声明</div>
        </RouterLink>
        <RouterLink class="index-item" to="/docs/privacy">
          <div class="title">隐私政策</div>
          <div class="subtitle">信息收集与数据使用说明</div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.docs-home {
  padding: 48px 24px 28px;
  display: flex;
  justify-content: center;
}

.doc-content {
  width: min(980px, 100%);
}

.doc-content h1 {
  font-size: 28px;
  color: #6a3c13;
  font-weight: 700;
  margin-bottom: 12px;
}

.desc {
  color: #6f5a45;
  margin-bottom: 16px;
}

.index {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin: 24px auto;
}

.index-item {
  display: block;
  text-decoration: none;
  border: 1px solid #f3e7d7;
  background: #fffaf3;
  border-radius: 14px;
  padding: 16px;
  transition:
    transform 120ms ease,
    border-color 120ms ease,
    box-shadow 120ms ease;
}

.index-item:hover {
  transform: translateY(-1px);
  border-color: #e7b680;
  box-shadow: 0 10px 22px rgba(186, 130, 75, 0.12);
}

.index-item .title {
  font-size: 18px;
  font-weight: 700;
  color: #7a4a22;
}

.index-item .subtitle {
  margin-top: 6px;
  font-size: 13px;
  color: #6f5a45;
}

.doc-content h2 {
  font-size: 22px;
  color: #7a4a22;
  font-weight: 600;
  margin-bottom: 10px;
}

.doc-content p,
.doc-content li {
  color: #6f5a45;
}

.doc-content ul {
  padding-left: 20px;
}

@media (max-width: 900px) {
  .index {
    grid-template-columns: 1fr;
  }
}
</style>
