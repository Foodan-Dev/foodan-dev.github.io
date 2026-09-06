<template>
  <section class="doc-page">
    <article class="doc-content">
      <RouterLink class="back" to="/docs">&larr; 返回文档首页</RouterLink>
      <h1>隐私政策</h1>
      <p class="meta">生效日期：2026 年 9 月 6 日 &nbsp;|&nbsp; 最近更新：2026 年 9 月 6 日</p>

      <p>
        旦食（以下简称"我们"）重视用户隐私。本隐私政策适用于旦食移动应用（iOS 和 Android）以及
        <a href="https://www.fdueat.com">www.fdueat.com</a>
        官方网站，说明我们如何收集、使用、存储和保护你的个人信息。使用旦食即表示你同意本政策。
      </p>

      <h2>一、我们收集的信息</h2>
      <h3>1.1 你主动提供的信息</h3>
      <ul>
        <li>
          <strong>账号信息</strong>：注册时你需要提供复旦大学域名邮箱（@fudan.edu.cn /
          @m.fudan.edu.cn / @fdueat.com）、密码、昵称和可选的性别。
        </li>
        <li><strong>个人资料</strong>：你可以上传头像图片。</li>
        <li>
          <strong>用户内容</strong>：你发布的帖子文字、图片、评论，以及点赞、收藏和关注操作。
        </li>
      </ul>
      <h3>1.2 自动收集的信息</h3>
      <ul>
        <li>
          <strong>设备与会话信息</strong>：我们使用 JWT（JSON Web
          Token）管理登录会话，记录会话的创建和过期时间。我们不收集设备型号、IMEI、广告标识符等设备指纹信息。
        </li>
        <li>
          <strong>日志信息</strong
          >：服务端记录请求日志（请求路径模板、状态码、响应时间），用于运维监控。日志不记录用户发布的内容。
        </li>
      </ul>
      <h3>1.3 我们不收集的信息</h3>
      <p>
        我们不收集你的地理位置、通讯录、通话记录、短信、日历、麦克风录音、相机实时画面、传感器数据或应用使用跟踪（App
        Tracking Transparency）数据。
      </p>

      <h2>二、信息的使用目的</h2>
      <ul>
        <li>提供账号注册、登录和身份验证服务</li>
        <li>发送注册验证码邮件</li>
        <li>展示用户发布的美食分享和提问内容</li>
        <li>提供搜索、互动（点赞、收藏、关注、评论）功能</li>
        <li>对用户发布的内容进行合规审核</li>
        <li>维护平台安全、防范违规行为</li>
      </ul>

      <h2>三、信息的存储与安全</h2>
      <ul>
        <li>
          <strong>密码安全</strong
          >：用户密码使用 bcrypt 单向加密存储，我们无法获取你的明文密码。
        </li>
        <li>
          <strong>验证码安全</strong>：邮箱验证码仅保存摘要（HMAC），不保留明文。
        </li>
        <li>
          <strong>存储位置</strong
          >：用户数据存储在中华人民共和国境内的腾讯云服务器。用户上传的图片存储在腾讯云对象存储（COS）中国大陆区域。我们不会将你的个人信息传输至境外。
        </li>
        <li>
          <strong>传输加密</strong
          >：客户端与服务端之间的所有通信使用 HTTPS/TLS 加密传输。
        </li>
        <li>
          <strong>访问控制</strong
          >：数据库部署在私有网络中，仅允许应用服务通过内部网络访问，不对公网暴露。
        </li>
      </ul>

      <h2>四、第三方服务</h2>
      <p>我们使用以下第三方服务，仅用于列出的目的：</p>
      <table>
        <thead>
          <tr>
            <th>服务</th>
            <th>提供方</th>
            <th>用途</th>
            <th>涉及的数据</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>腾讯云 SES</td>
            <td>腾讯云</td>
            <td>发送注册验证码邮件</td>
            <td>邮箱地址</td>
          </tr>
          <tr>
            <td>腾讯云 COS</td>
            <td>腾讯云</td>
            <td>存储用户上传的图片</td>
            <td>图片文件</td>
          </tr>
          <tr>
            <td>腾讯云数据万象</td>
            <td>腾讯云</td>
            <td>图片和文字内容合规审核</td>
            <td>图片文件、帖子文字</td>
          </tr>
        </tbody>
      </table>
      <p>我们不使用任何第三方数据分析、广告追踪或用户行为统计 SDK。</p>

      <h2>五、信息的共享与披露</h2>
      <p>
        我们不会将你的个人信息出售、出租或交易给任何第三方。仅在以下情况下可能共享或披露：
      </p>
      <ul>
        <li>经你明确同意；</li>
        <li>为遵守法律法规、司法程序或政府主管部门的强制性要求；</li>
        <li>为维护平台安全和其他用户的合法权益。</li>
      </ul>

      <h2>六、你的权利</h2>
      <ul>
        <li>
          <strong>查看和修改</strong
          >：你可以随时在应用内查看和修改你的昵称、性别、头像等个人资料。
        </li>
        <li><strong>删除内容</strong>：你可以删除自己发布的帖子和评论。</li>
        <li>
          <strong>注销账号</strong
          >：你可以通过联系我们申请注销账号。注销后你的个人信息将被匿名化处理，公开发布的内容将标记为已注销用户。
        </li>
      </ul>

      <h2>七、未成年人保护</h2>
      <p>
        旦食面向复旦大学在校师生，我们不主动向未满 14
        周岁的未成年人提供服务。如果我们发现在未获得可核实的监护人同意的情况下收集了不满
        14 周岁未成年人的个人信息，我们将尽快删除该信息。
      </p>

      <h2>八、隐私政策的更新</h2>
      <p>
        我们可能会不时更新本隐私政策。更新后的政策将在本页面发布，并更新顶部的"最近更新"日期。重大变更时，我们会通过应用内通知或邮件告知你。
      </p>

      <h2>九、联系我们</h2>
      <p>如果你对本隐私政策有任何疑问或建议，请通过以下方式联系我们：</p>
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

.doc-content h3 {
  font-size: 16px;
  color: #7a5a3a;
  font-weight: 600;
  margin: 14px 0 6px;
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

.doc-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 10px 0;
  font-size: 14px;
}

.doc-content th,
.doc-content td {
  border: 1px solid #f0e8dc;
  padding: 8px 12px;
  text-align: left;
  color: #4a3a2a;
}

.doc-content th {
  background: #fdf6ee;
  color: #6a3c13;
  font-weight: 600;
}
</style>
