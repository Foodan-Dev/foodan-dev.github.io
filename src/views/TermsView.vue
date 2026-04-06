<template>
  <section class="doc-page">
    <article class="doc-content">
      <RouterLink class="back" to="/docs">← 返回文档首页</RouterLink>
      <h1>使用条款</h1>
      <p>访问和使用旦食官网代表你同意遵守本条款。</p>
      <p>你应在合法合规范围内使用本网站内容。未经许可，不得对页面内容进行非法复制、篡改或用于违反法律法规的场景。</p>
    </article>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.doc-page {
  padding: 20px 24px 28px;
  display: flex;
  justify-content: center;
}

.doc-content {
  width: min(980px, 100%);
  border: 1px solid #f3e7d7;
  border-radius: 16px;
  background: #fff;
  padding: 24px;
}

.back {
  display: inline-block;
  margin-bottom: 12px;
  color: #815c3b;
  text-decoration: none;
}

.back:hover {
  color: #d17b1f;
}

.doc-content h1 {
  font-size: 28px;
  color: #6a3c13;
  font-weight: 700;
  margin-bottom: 12px;
}

.doc-content p {
  color: #6f5a45;
}

.doc-content p + p {
  margin-top: 10px;
}
</style>
