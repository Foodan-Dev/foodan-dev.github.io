<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { PhArrowLeft, PhArrowUpRight, PhCaretRight, PhEnvelopeSimple, PhGithubLogo } from '@phosphor-icons/vue'

type DocPage = 'index' | 'privacy' | 'terms' | 'support'
const route = useRoute()
const page = computed<DocPage>(() => (['privacy', 'terms', 'support'].includes(String(route.params.page)) ? String(route.params.page) as DocPage : 'index'))

const metadata: Record<DocPage, { title: string; summary: string }> = {
  index: { title: '旦食 App 官网文档', summary: '' },
  privacy: { title: '隐私政策', summary: '信息收集、使用与保护说明' },
  terms: { title: '使用条款', summary: '平台使用规则与免责声明' },
  support: { title: '技术支持', summary: '常见问题与联系方式' },
}

const current = computed(() => metadata[page.value])
watchEffect(() => {
  document.title = page.value === 'index' ? '旦食文档 | 旦食 App' : `${current.value.title} | 旦食 App`
})

const privacySections = [
  {
    title: '一、我们收集的信息', blocks: [
      { heading: '1.1 你主动提供的信息', items: ['账号信息：注册时你需要提供复旦大学域名邮箱（@fudan.edu.cn / @m.fudan.edu.cn / @fdueat.com）、密码、昵称和可选的性别。', '个人资料：你可以上传头像图片。', '用户内容：你发布的帖子文字、图片、评论，以及点赞、收藏和关注操作。'] },
      { heading: '1.2 自动收集的信息', items: ['设备与会话信息：我们使用 JWT（JSON Web Token）管理登录会话，记录会话的创建和过期时间。我们不收集设备型号、IMEI、广告标识符等设备指纹信息。', '日志信息：服务端记录请求日志（请求路径模板、状态码、响应时间），用于运维监控。日志不记录用户发布的内容。'] },
      { heading: '1.3 我们不收集的信息', paragraphs: ['我们不收集你的地理位置、通讯录、通话记录、短信、日历、麦克风录音、相机实时画面、传感器数据或应用使用跟踪（App Tracking Transparency）数据。'] },
    ]
  },
  { title: '二、信息的使用目的', items: ['提供账号注册、登录和身份验证服务', '发送注册验证码邮件', '展示用户发布的美食分享和提问内容', '提供搜索、互动（点赞、收藏、关注、评论）功能', '对用户发布的内容进行合规审核', '维护平台安全、防范违规行为'] },
  { title: '三、信息的存储与安全', items: ['密码安全：用户密码使用 bcrypt 单向加密存储，我们无法获取你的明文密码。', '验证码安全：邮箱验证码仅保存摘要（HMAC），不保留明文。', '存储位置：用户数据存储在中华人民共和国境内的腾讯云服务器。用户上传的图片存储在腾讯云对象存储（COS）中国大陆区域。我们不会将你的个人信息传输至境外。', '传输加密：客户端与服务端之间的所有通信使用 HTTPS/TLS 加密传输。', '访问控制：数据库部署在私有网络中，仅允许应用服务通过内部网络访问，不对公网暴露。'] },
  { title: '四、第三方服务', table: [['服务', '提供方', '用途', '涉及的数据'], ['腾讯云 SES', '腾讯云', '发送注册验证码邮件', '邮箱地址'], ['腾讯云 COS', '腾讯云', '存储用户上传的图片', '图片文件'], ['腾讯云数据万象', '腾讯云', '图片和文字内容合规审核', '图片文件、帖子文字']], paragraphs: ['我们不使用任何第三方数据分析、广告追踪或用户行为统计 SDK。'] },
  { title: '五、信息的共享与披露', paragraphs: ['我们不会将你的个人信息出售、出租或交易给任何第三方。仅在以下情况下可能共享或披露：'], items: ['经你明确同意；', '为遵守法律法规、司法程序或政府主管部门的强制性要求；', '为维护平台安全和其他用户的合法权益。'] },
  { title: '六、你的权利', items: ['查看和修改：你可以随时在应用内查看和修改你的昵称、性别、头像等个人资料。', '删除内容：你可以删除自己发布的帖子和评论。', '注销账号：你可以通过联系我们申请注销账号。注销后你的个人信息将被匿名化处理，公开发布的内容将标记为已注销用户。'] },
  { title: '七、未成年人保护', paragraphs: ['旦食面向复旦大学在校师生，我们不主动向未满 14 周岁的未成年人提供服务。如果我们发现在未获得可核实的监护人同意的情况下收集了不满 14 周岁未成年人的个人信息，我们将尽快删除该信息。'] },
  { title: '八、隐私政策的更新', paragraphs: ['我们可能会不时更新本政策。更新后的政策将在本页面发布，并更新顶部的“最近更新”日期。重大变更时，我们会通过应用内通知或邮件告知你。'] },
]

const termsSections = [
  { title: '一、服务说明', paragraphs: ['旦食是面向复旦大学在校师生的校园美食分享平台。用户可以在平台上分享美食体验、发布提问、评论互动和搜索内容。'] },
  { title: '二、账号注册', items: ['注册旦食需要使用复旦大学域名邮箱。', '你有义务妥善保管账号密码，因密码泄露导致的损失由你自行承担。', '每个邮箱仅可注册一个账号。'] },
  { title: '三、用户行为规范', paragraphs: ['使用旦食时，你同意不进行以下行为：'], items: ['发布违反中华人民共和国法律法规的内容；', '发布虚假、误导性信息或恶意攻击他人的内容；', '发布色情、暴力、恐怖主义或其他违规内容；', '侵犯他人知识产权、隐私权或其他合法权益；', '利用技术手段干扰平台正常运行或获取未授权的数据；', '使用自动化工具批量注册、发帖或采集数据。'] },
  { title: '四、内容审核', paragraphs: ['我们对用户发布的内容进行自动化审核和人工复核。违规内容可能被限制展示或删除，严重违规者可能被封禁账号。审核结果以平台判定为准。'] },
  { title: '五、知识产权', items: ['你发布的原创内容，知识产权归你所有。发布内容即表示你授予旦食在平台内展示和传播该内容的非独占许可。', '旦食平台本身的设计、代码和品牌标识受相关法律保护。'] },
  { title: '六、免责声明', items: ['旦食提供的餐厅和美食信息来自用户分享，我们不对信息的准确性、时效性做任何担保。', '对于因不可抗力、第三方服务中断或系统维护导致的服务中断，我们不承担责任。', '我们有权在法律允许的范围内修改、暂停或终止部分或全部服务，并尽可能提前通知用户。'] },
  { title: '七、条款修改', paragraphs: ['我们保留随时修改本条款的权利。修改后的条款将在本页面发布。继续使用旦食即视为你接受修改后的条款。'] },
  { title: '八、适用法律与争议解决', paragraphs: ['本条款适用中华人民共和国法律。因本条款产生的争议，双方应友好协商解决；协商不成的，任何一方可向旦食运营方所在地有管辖权的人民法院提起诉讼。'] },
]

const faqs = [
  { q: '如何注册？', a: '打开旦食 App，点击“注册”，输入你的复旦大学邮箱（@fudan.edu.cn 或 @m.fudan.edu.cn），点击“获取验证码”，在邮箱中查收验证码后填入，设置密码和昵称即可完成注册。' },
  { q: '支持哪些邮箱注册？', a: '目前支持以 @fudan.edu.cn、@m.fudan.edu.cn 和 @fdueat.com 结尾的邮箱注册。' },
  { q: '如何发布帖子？', a: '登录后，在首页点击右下角的发布按钮。你可以选择发布“分享帖”（推荐或避雷一道菜或一家窗口）或“提问帖”（询问美食推荐、排队情况等）。填写内容后，可以从相册选择图片上传，选择餐厅和窗口，然后点击发布。' },
  { q: '收不到验证码邮件？', a: '请检查邮箱的垃圾邮件文件夹。验证码邮件的发件人是 no-reply@danshi.fdueat.com。如果仍未收到，请等待 60 秒后重新发送。如果问题持续，请联系我们。' },
  { q: '如何修改头像和昵称？', a: '登录后进入“个人”页面，点击头像或昵称即可修改。头像支持从手机相册选择图片上传。' },
  { q: '如何注销账号？', a: '请发送邮件至 support@fdueat.com，注明你的注册邮箱，我们将在 3 个工作日内处理你的注销请求。' },
]
</script>

<template>
  <div class="docs-page">
    <div class="container docs-shell">
      <main class="docs-content">
        <RouterLink v-if="page !== 'index'" class="docs-back-link" to="/docs">
          <PhArrowLeft :size="16" weight="bold" />返回
        </RouterLink>
        <header class="docs-header" :class="{ 'docs-index-header': page === 'index' }">
          <div>
            <h1>{{ current.title }}</h1>
            <p>{{ current.summary }}</p>
          </div>
          <div class="docs-dates" v-if="page === 'privacy' || page === 'terms'"><span>生效日期</span><strong>2026 年 9 月 6
              日</strong><span>最近更新</span><strong>2026 年 9 月 6 日</strong></div>
        </header>

        <article v-if="page === 'index'" class="docs-index">
          <div class="docs-index-list">
            <RouterLink to="/docs/privacy"><span><strong>隐私政策</strong><small>信息收集、使用与保护说明</small></span>
              <PhArrowUpRight :size="20" weight="bold" />
            </RouterLink>
            <RouterLink to="/docs/terms"><span><strong>使用条款</strong><small>平台使用规则与免责声明</small></span>
              <PhArrowUpRight :size="20" weight="bold" />
            </RouterLink>
            <RouterLink to="/docs/support"><span><strong>技术支持</strong><small>常见问题与联系方式</small></span>
              <PhArrowUpRight :size="20" weight="bold" />
            </RouterLink>
          </div>
        </article>

        <article v-else-if="page === 'privacy'" class="prose">
          <section v-for="section in privacySections" :key="section.title">
            <h2>{{ section.title }}</h2>
            <template v-if="'blocks' in section">
              <div v-for="block in section.blocks" :key="block.heading" class="prose-subsection">
                <h3>{{ block.heading }}</h3>
                <p v-for="item in block.paragraphs" :key="item">{{ item }}</p>
                <ul v-if="block.items">
                  <li v-for="item in block.items" :key="item">{{ item }}</li>
                </ul>
              </div>
            </template>
            <p v-for="paragraph in section.paragraphs" v-else :key="paragraph">{{ paragraph }}</p>
            <ul v-if="section.items">
              <li v-for="item in section.items" :key="item">{{ item }}</li>
            </ul>
            <div v-if="section.table" class="doc-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th v-for="cell in section.table[0]" :key="cell">{{ cell }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in section.table.slice(1)" :key="row[0]">
                    <td v-for="cell in row" :key="cell">{{ cell }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          <section>
            <h2>九、联系我们</h2>
            <p>如果你对本隐私政策有任何疑问或建议，请通过以下方式联系我们：</p>
            <div class="contact-links"><a href="mailto:support@fdueat.com">
                <PhEnvelopeSimple :size="18" />support@fdueat.com
              </a><a href="https://github.com/Foodan-Dev" target="_blank" rel="noreferrer">
                <PhGithubLogo :size="18" />github.com/Foodan-Dev
              </a></div>
          </section>
        </article>

        <article v-else-if="page === 'terms'" class="prose">
          <section v-for="section in termsSections" :key="section.title">
            <h2>{{ section.title }}</h2>
            <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
            <ul v-if="section.items">
              <li v-for="item in section.items" :key="item">{{ item }}</li>
            </ul>
          </section>
          <section>
            <h2>九、联系我们</h2>
            <p>如果你对本使用条款有任何疑问，请通过以下方式联系我们：</p>
            <div class="contact-links"><a href="mailto:support@fdueat.com">
                <PhEnvelopeSimple :size="18" />support@fdueat.com
              </a><a href="https://github.com/Foodan-Dev" target="_blank" rel="noreferrer">
                <PhGithubLogo :size="18" />github.com/Foodan-Dev
              </a></div>
          </section>
        </article>

        <article v-else class="prose support-prose">
          <section>
            <h2>关于旦食</h2>
            <p>旦食是面向复旦大学在校师生的校园美食分享平台。你可以在旦食上分享美食体验、发布就餐提问、浏览其他同学的推荐和评价，发现校园里的好味道。</p>
          </section>
          <section>
            <h2>常见问题</h2>
            <div class="faq-list">
              <details v-for="faq in faqs" :key="faq.q">
                <summary>{{ faq.q }}
                  <PhCaretRight :size="18" weight="bold" />
                </summary>
                <p>{{ faq.a }}</p>
              </details>
            </div>
          </section>
          <section>
            <h2>联系我们</h2>
            <p>如果你遇到任何问题或有建议反馈，请通过以下方式联系我们：</p>
            <div class="contact-card"><a href="mailto:support@fdueat.com">
                <PhEnvelopeSimple :size="20" />support@fdueat.com
              </a><a href="https://github.com/Foodan-Dev/Danshi-frontend/issues" target="_blank" rel="noreferrer">
                <PhGithubLogo :size="20" />提交反馈
                <PhArrowUpRight :size="16" />
              </a></div>
          </section>
        </article>
      </main>
    </div>
  </div>
</template>
