import assert from 'node:assert/strict'
import test from 'node:test'
import { detectInAppBrowser, openInBrowserLabel } from '../src/lib/in-app-browser.ts'

const ua = {
  wechatIos: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.50(0x1800322d) NetType/WIFI Language/zh_CN',
  wechatAndroid: 'Mozilla/5.0 (Linux; Android 14; 23127PN0CC) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/122.0 Mobile Safari/537.36 XWEB/1220099 MMWEBSDK/20240404 MicroMessenger/8.0.49.2600(0x28003133) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN',
  wecom: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 wxwork/4.1.30 MicroMessenger/7.0.1 Language/zh',
  qq: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 QQ/9.0.60.611 V1_IPH_SQ_9.0.60_1_APP_A Pixel/1179 MiniAppEnable SimpleUISwitch/0 StudyMode/0 CurrentMode/0 CurrentFontScale/1.000000 QQTheme/1000 AppId/537230561 Core/WKWebView Device/Apple(iPhone 15 Pro) NetType/WIFI QBWebViewType/1 WKType/1',
  weibo: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Weibo (iPhone15,2__weibo__14.9.0__iphone__os18.0)',
  safari: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
  chromeAndroid: 'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Mobile Safari/537.36',
  qqBrowser: 'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/116.0 MQQBrowser/15.4 Mobile Safari/537.36',
}

test('in-app browsers that block app links are detected', () => {
  assert.equal(detectInAppBrowser(ua.wechatIos), 'wechat')
  assert.equal(detectInAppBrowser(ua.wechatAndroid), 'wechat')
  assert.equal(detectInAppBrowser(ua.wecom), 'wechat')
  assert.equal(detectInAppBrowser(ua.qq), 'qq')
  assert.equal(detectInAppBrowser(ua.weibo), 'weibo')
})

test('system and standalone browsers show no guide', () => {
  for (const value of [ua.safari, ua.chromeAndroid, ua.qqBrowser, '']) assert.equal(detectInAppBrowser(value), null)
})

test('the guide names the platform browser menu item', () => {
  assert.equal(openInBrowserLabel(ua.wechatIos), '在 Safari 中打开')
  assert.equal(openInBrowserLabel(ua.wechatAndroid), '在浏览器打开')
})
