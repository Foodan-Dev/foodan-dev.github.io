<template>
  <section class="doc-page">
    <article class="doc-content">
      <RouterLink class="back" to="/docs">&larr; 返回文档首页</RouterLink>
      <h1>技术支持</h1>

      <h2>关于旦食</h2>
      <p>
        旦食是面向复旦大学在校师生的校园美食分享平台。你可以在旦食上分享美食体验、发布就餐提问、浏览其他同学的推荐和评价，发现校园里的好味道。
      </p>

      <h2>常见问题</h2>

      <div class="faq">
        <div class="faq-item">
          <h3>如何注册？</h3>
          <p>
            打开旦食 App，点击"注册"，输入你的复旦大学邮箱（@fudan.edu.cn 或
            @m.fudan.edu.cn），点击"获取验证码"，在邮箱中查收验证码后填入，设置密码和昵称即可完成注册。
          </p>
        </div>

        <div class="faq-item">
          <h3>支持哪些邮箱注册？</h3>
          <p>
            目前支持以 @fudan.edu.cn、@m.fudan.edu.cn 和 @fdueat.com
            结尾的邮箱注册。
          </p>
        </div>

        <div class="faq-item">
          <h3>如何发布帖子？</h3>
          <p>
            登录后，在首页点击右下角的发布按钮。你可以选择发布"分享帖"（推荐或避雷一道菜或一家窗口）或"提问帖"（询问美食推荐、排队情况等）。填写内容后，可以从相册选择图片上传，选择餐厅和窗口，然后点击发布。
          </p>
        </div>

        <div class="faq-item">
          <h3>收不到验证码邮件？</h3>
          <p>请检查邮箱的垃圾邮件文件夹。验证码邮件的发件人是 no-reply@danshi.fdueat.com。如果仍未收到，请等待 60 秒后重新发送。如果问题持续，请联系我们。</p>
        </div>

        <div class="faq-item">
          <h3>如何修改头像和昵称？</h3>
          <p>登录后进入"个人"页面，点击头像或昵称即可修改。头像支持从手机相册选择图片上传。</p>
        </div>

        <div class="faq-item">
          <h3>如何注销账号？</h3>
          <p>
            请发送邮件至
            <a href="mailto:support@fdueat.com">support@fdueat.com</a>，注明你的注册邮箱，我们将在
            3 个工作日内处理你的注销请求。
          </p>
        </div>
      </div>

      <h2>联系我们</h2>
      <p>如果你遇到任何问题或有建议反馈，请通过以下方式联系我们：</p>
      <div class="contact-cards">
        <div class="contact-card">
          <div class="contact-icon">&#9993;</div>
          <div class="contact-label">邮箱</div>
          <a href="mailto:support@fdueat.com">support@fdueat.com</a>
        </div>
        <div class="contact-card">
          <div class="contact-icon">&#128736;</div>
          <div class="contact-label">GitHub Issues</div>
          <a href="https://github.com/Foodan-Dev/Danshi-frontend/issues" target="_blank" rel="noreferrer"
            >提交反馈</a
          >
        </div>
      </div>
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
  padding: 24px 28px 32px;
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
  margin-bottom: 18px;
}

.doc-content h2 {
  font-size: 20px;
  color: #6a3c13;
  font-weight: 600;
  margin: 22px 0 8px;
}

.doc-content p {
  color: #4a3a2a;
  line-height: 1.8;
}

.doc-content a {
  color: #815c3b;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.doc-content a:hover {
  color: #d17b1f;
}

.faq {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 12px;
}

.faq-item {
  border: 1px solid #f3e7d7;
  border-radius: 12px;
  padding: 14px 18px;
  background: #fffcf8;
}

.faq-item h3 {
  font-size: 16px;
  color: #7a5a3a;
  font-weight: 600;
  margin-bottom: 6px;
}

.faq-item p {
  font-size: 14px;
  color: #5a4a3a;
  line-height: 1.7;
}

.contact-cards {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-top: 14px;
}

.contact-card {
  border: 1px solid #f3e7d7;
  border-radius: 14px;
  padding: 18px;
  text-align: center;
  background: #fffaf3;
}

.contact-icon {
  font-size: 28px;
  margin-bottom: 8px;
}

.contact-label {
  font-size: 13px;
  color: #8b735c;
  margin-bottom: 6px;
}

.contact-card a {
  font-size: 14px;
  color: #815c3b;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.contact-card a:hover {
  color: #d17b1f;
}

@media (max-width: 640px) {
  .contact-cards {
    grid-template-columns: 1fr;
  }
}
</style>
