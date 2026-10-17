import assert from 'node:assert/strict'
import { afterEach, test } from 'node:test'
import { cachedManifest, fetchManifest, parseManifest, CHANNEL_URL } from '../src/lib/releases.ts'

const fixture = () => ({
  schemaVersion: 1, channel: 'stable', updatedAt: '2026-10-17T00:00:00Z',
  android: {
    version: '0.10.0', versionCode: 20, buildId: 'bc92edeb-4196-430b-a78f-a1bbce32d2ed', publishedAt: '2026-10-16T19:21:14Z',
    artifact: { url: 'https://dl.fdueat.com/releases/v0.10.0/bc92edeb-4196-430b-a78f-a1bbce32d2ed/DanShi-v0.10.0-testflight.apk', sizeBytes: 119873975, sha256: 'a'.repeat(64) },
  },
  ios: { distribution: 'testflight', installUrl: null, availableVersion: null },
})
const originalFetch = globalThis.fetch
const originalStorage = Object.getOwnPropertyDescriptor(globalThis, 'localStorage')
afterEach(() => {
  globalThis.fetch = originalFetch
  if (originalStorage) Object.defineProperty(globalThis, 'localStorage', originalStorage)
  else delete globalThis.localStorage
})
function storage(initial = null) {
  let value = initial
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: {
    getItem: () => value, setItem: (_, next) => { value = next },
  } })
  return () => value
}

test('accepts a CDN Android release without claiming an iOS version is available', () => {
  const parsed = parseManifest(fixture())
  assert.equal(parsed.android.version, '0.10.0')
  assert.equal(parsed.ios.installUrl, null)
})

test('rejects external, credential-bearing and inconsistent download URLs', () => {
  for (const url of ['https://evil.example/app.apk', 'javascript:alert(1)', fixture().android.artifact.url.replace('https://', 'https://user@'), fixture().android.artifact.url.replace('/v0.10.0/', '/v0.9.0/')]) {
    const manifest = fixture()
    manifest.android.artifact.url = url
    assert.throws(() => parseManifest(manifest))
  }
})

test('rejects unknown schemas, preview channels and invalid metadata', () => {
  for (const mutate of [x => x.schemaVersion = 2, x => x.channel = 'preview', x => x.android.artifact.sizeBytes = -1, x => x.android.versionCode = 0, x => x.android.artifact.sha256 = 'invalid', x => x.ios.installUrl = 'https://evil.example']) {
    const manifest = fixture()
    mutate(manifest)
    assert.throws(() => parseManifest(manifest))
  }
})

test('reads the COS/CDN channel at runtime without browser cache or credentials', async () => {
  storage()
  let calls = 0
  globalThis.fetch = async (url, options) => {
    assert.equal(url, CHANNEL_URL)
    assert.equal(options.cache, 'no-store')
    assert.equal(options.credentials, 'omit')
    calls++
    return new Response(JSON.stringify(fixture()))
  }
  const result = await fetchManifest(new AbortController().signal)
  assert.equal(calls, 1)
  assert.deepEqual(cachedManifest(), result)
})

test('keeps a known release when a new request fails', async () => {
  storage(JSON.stringify({ savedAt: Date.now(), manifest: fixture() }))
  globalThis.fetch = async () => new Response('unavailable', { status: 503 })
  await assert.rejects(fetchManifest(new AbortController().signal))
  assert.equal(cachedManifest().android.version, '0.10.0')
})

test('does not trust a damaged, expired or poisoned cached release', () => {
  for (const value of ['broken JSON', JSON.stringify({ savedAt: 1, manifest: fixture() }), JSON.stringify({ savedAt: Date.now(), manifest: { ...fixture(), channel: 'preview' } })]) {
    storage(value)
    assert.equal(cachedManifest(), null)
  }
})

test('a successful network response works when browser storage is disabled', async () => {
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, get() { throw new Error('disabled') } })
  globalThis.fetch = async () => new Response(JSON.stringify(fixture()))
  assert.equal((await fetchManifest(new AbortController().signal)).android.version, '0.10.0')
})
