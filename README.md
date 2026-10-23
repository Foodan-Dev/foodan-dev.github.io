# 旦食官网

Vue 3 + Vite 静态网站，正式入口为 https://www.fdueat.com/。

```bash
npm ci
node --experimental-strip-types --test test/*.test.mjs
npm run build
```

## 下载信息

首页在浏览器运行时读取 `https://dl.fdueat.com/channels/stable.json`，以 `cache: no-store`、不携带凭据的方式请求。此 JSON 由 App 仓库的发布 workflow 直接更新到腾讯云 COS，再通过 CDN 读取；本仓库不保存或生成当前版本清单，App 发版无需重新构建官网。

Android 显示 APK 版本、大小和发布日期，下载地址必须属于 `https://dl.fdueat.com/releases/` 且匹配清单版本与构建 ID。清单结构未知或链接不合法时拒绝使用。加载失败时可展示最近 30 天内成功获取并重新校验过的版本，明确提示当前并非已确认的最新版本；首次获取失败提供重试按钮。

`schemaVersion` 保持 1。主按钮始终使用 `android.artifact`（兼容 armeabi-v7a 与 arm64-v8a 的 ARM 通用 APK）。可选 `android.variants` 必须恰好包含 arm64-v8a、armeabi-v7a、x86_64 三项且保持此顺序，不接受部分列表；有效时显示“其他版本”和各包大小。三项来自同一次 EAS 构建，必须共享同一个 `buildId` 和 `versionCode`，但二者均可与默认包的 `android.buildId` / `android.versionCode` 不同。每项的 `buildId` 必须是由小写 `a-f`、数字和连字符组成的 36 字符 UUID 形字符串，`sizeBytes` / `versionCode` 必须为正安全整数，`sha256` 必须为 64 位小写十六进制。每项 URL 必须为 `https://dl.fdueat.com/releases/v<android.version>/<该项 buildId>/<file>.apk`，文件名仅允许字母、数字、下划线、连字符和点，且以字母、数字、下划线或连字符开头；不接受嵌套路径、查询参数或片段。

兼容策略：缺失 variants 不显示入口；空列表、部分列表、任一条目或整个 variants 字段格式错误时丢弃整组 variants，保留已通过校验的主下载及 iOS 信息，不修改输入对象。网络响应和缓存读取均使用此策略，缓存期限、请求及重试逻辑不变。

iOS 继续使用 TestFlight。没有公开邀请链接时显示“申请 iOS 内测”，前往技术支持页。未来清单提供真实 `https://testflight.apple.com/join/...` 链接后，官网会自动显示安装入口。

站内导航的下载按钮跳转到首页下载区。公开下载不依赖私有 GitHub 仓库的访问权限。

## 部署

`.github/workflows/deploy-pages.yml` 更新 GitHub Pages 副本；正式 `www.fdueat.com` 当前使用独立静态托管，官网代码变更还需更新该入口。部署时先上传新散列静态资源，再原子替换 `index.html`，保留旧资源以兼容缓存中的页面，并核验真实域名的页面和资源校验和。每次 App 发布只更新 COS 清单，不触发网站部署。
