<template>
  <section class="doc-page">
    <article class="doc-content">
      <RouterLink class="back" to="/docs">&larr; 返回文档首页</RouterLink>
      <h1>使用条款</h1>
      <p class="meta">生效日期：2026 年 9 月 6 日 &nbsp;|&nbsp; 最近更新：2026 年 9 月 6 日</p>

      <p>
        欢迎使用旦食。访问和使用旦食移动应用及官方网站（以下统称"旦食"或"本服务"）即表示你同意遵守本使用条款。如果你不同意本条款的任何部分，请停止使用本服务。
      </p>

      <h2>一、服务说明</h2>
      <p>
        旦食是面向复旦大学在校师生的校园美食分享平台。用户可以在平台上分享美食体验、发布提问、评论互动和搜索内容。
      </p>

      <h2>二、账号注册</h2>
      <ul>
        <li>注册旦食需要使用复旦大学域名邮箱。</li>
        <li>你有义务妥善保管账号密码，因密码泄露导致的损失由你自行承担。</li>
        <li>每个邮箱仅可注册一个账号。</li>
      </ul>

      <h2>三、用户行为规范</h2>
      <p>使用旦食时，你同意不进行以下行为：</p>
      <ul>
        <li>发布违反中华人民共和国法律法规的内容；</li>
        <li>发布虚假、误导性信息或恶意攻击他人的内容；</li>
        <li>发布色情、暴力、恐怖主义或其他违规内容；</li>
        <li>侵犯他人知识产权、隐私权或其他合法权益；</li>
        <li>利用技术手段干扰平台正常运行或获取未授权的数据；</li>
        <li>使用自动化工具批量注册、发帖或采集数据。</li>
      </ul>

      <h2>四、内容审核</h2>
      <p>
        我们对用户发布的内容进行自动化审核和人工复核。违规内容可能被限制展示或删除，严重违规者可能被封禁账号。审核结果以平台判定为准。
      </p>

      <h2>五、知识产权</h2>
      <ul>
        <li>
          你发布的原创内容，知识产权归你所有。发布内容即表示你授予旦食在平台内展示和传播该内容的非独占许可。
        </li>
        <li>旦食平台本身的设计、代码和品牌标识受相关法律保护。</li>
      </ul>

      <h2>六、免责声明</h2>
      <ul>
        <li>
          旦食提供的餐厅和美食信息来自用户分享，我们不对信息的准确性、时效性做任何担保。
        </li>
        <li>对于因不可抗力、第三方服务中断或系统维护导致的服务中断，我们不承担责任。</li>
        <li>
          我们有权在法律允许的范围内修改、暂停或终止部分或全部服务，并尽可能提前通知用户。
        </li>
      </ul>

      <h2>七、条款修改</h2>
      <p>
        我们保留随时修改本条款的权利。修改后的条款将在本页面发布。继续使用旦食即视为你接受修改后的条款。
      </p>

      <h2>八、适用法律与争议解决</h2>
      <p>
        本条款适用中华人民共和国法律。因本条款产生的争议，双方应友好协商解决；协商不成的，任何一方可向旦食运营方所在地有管辖权的人民法院提起诉讼。
      </p>

      <h2>九、联系我们</h2>
      <p>如果你对本使用条款有任何疑问，请通过以下方式联系我们：</p>
      <ul>
        <li>
          邮箱：<a href="mailto:support@fdueat.com">support@fdueat.com</a>
        </li>
        <li>
          GitHub：<a href="https://github.com/Foodan-Dev" target="_blank" rel="noreferrer"
            >github.com/Foodan-Dev</a
          >
        </li>
      </ul>
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
  margin-bottom: 4px;
}

.meta {
  font-size: 13px;
  color: #a08c78;
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

.doc-content p + p {
  margin-top: 10px;
}

.doc-content ul {
  padding-left: 20px;
  color: #4a3a2a;
  line-height: 1.8;
}

.doc-content li {
  margin-bottom: 4px;
}

.doc-content a {
  color: #815c3b;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.doc-content a:hover {
  color: #d17b1f;
}
</style>
