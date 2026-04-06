<template>
  <section class="doc-page">
    <article class="doc-content">
      <RouterLink class="back" to="/docs">← 返回文档首页</RouterLink>
      <h1>隐私政策</h1>
      <p>旦食重视用户隐私，网站将尽可能减少个人信息收集并遵循最小必要原则。</p>
      <p>
        若后续引入登录、分析或下载服务，我们会在本页面更新隐私说明，明确数据用途、保存时长以及用户权利。
      </p>
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
