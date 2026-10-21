export type InAppBrowser = 'wechat' | 'qq' | 'weibo'

/** In-app browsers that block app links, custom schemes and APK downloads. */
export function detectInAppBrowser(userAgent: string): InAppBrowser | null {
  if (/MicroMessenger|wxwork/i.test(userAgent)) return 'wechat'
  // QQ's in-app webview reports " QQ/<version>"; the standalone QQ Browser reports MQQBrowser only.
  if (/\sQQ\/\d/i.test(userAgent)) return 'qq'
  if (/Weibo/i.test(userAgent)) return 'weibo'
  return null
}

export function isAppleMobile(userAgent: string): boolean {
  return /iPhone|iPad|iPod/i.test(userAgent)
}

/** The menu item that hands the page to the system browser. */
export function openInBrowserLabel(userAgent: string): string {
  return isAppleMobile(userAgent) ? '在 Safari 中打开' : '在浏览器打开'
}
