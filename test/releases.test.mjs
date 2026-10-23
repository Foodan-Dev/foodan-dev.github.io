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

function withVariants() {
  const manifest = fixture()
  manifest.android.variants = ['arm64-v8a', 'armeabi-v7a', 'x86_64'].map((abi, index) => {
    const buildId = index === 2 ? '11111111-2222-3333-4444-555555555555' : manifest.android.buildId
    return {
      abi, buildId, versionCode: index === 2 ? 21 : 20,
      url: `https://dl.fdueat.com/releases/v0.10.0/${buildId}/DanShi-v0.10.0-testflight-${abi}.apk`,
      sizeBytes: [68123456, 55000000, 79155555][index], sha256: 'b'.repeat(64),
    }
  })
  return manifest
}

test('older manifests and empty variants retain the default download', () => {
  const manifest = fixture()
  assert.deepEqual(parseManifest(manifest), manifest)
  manifest.android.variants = []
  assert.deepEqual(parseManifest(manifest).android.variants, [])
})

test('accepts ordered variants including an independent x86 build and ABI subsets', () => {
  const manifest = withVariants()
  assert.deepEqual(parseManifest(manifest), manifest)
  manifest.android.variants = [manifest.android.variants[2]]
  assert.deepEqual(parseManifest(manifest), manifest)
})

const invalidVariants = {
  'unknown ABI': x => x.android.variants[0].abi = 'mips',
  'duplicate ABI': x => x.android.variants[1] = { ...x.android.variants[0] },
  'out-of-order ABIs': x => x.android.variants.reverse(),
  'non-array variants': x => x.android.variants = {},
  'null variants': x => x.android.variants = null,
  'null entry': x => x.android.variants[1] = null,
  'missing ABI': x => delete x.android.variants[0].abi,
  'invalid build ID': x => x.android.variants[2].buildId = '../bad',
  'different ARM build': x => x.android.variants[0] = { ...x.android.variants[2], abi: 'arm64-v8a' },
  'different ARM version code': x => x.android.variants[0].versionCode++,
}
for (const [name, transform] of Object.entries({
  'wrong host': url => url.replace('dl.fdueat.com', 'evil.example'),
  'wrong protocol': url => url.replace('https:', 'http:'),
  'credentials': url => url.replace('https://', 'https://user@'),
  'wrong path': url => url.replace('/releases/', '/other/'),
  'wrong version': url => url.replace('/v0.10.0/', '/v0.9.0/'),
  'wrong build directory': url => url.replace('11111111-2222-3333-4444-555555555555', fixture().android.buildId),
  'nested file': url => url.replace('/DanShi-', '/nested/DanShi-'),
  'path traversal': url => url.replace('/DanShi-', '/../DanShi-'),
  'encoded slash': url => url.replace('/DanShi-', '/nested%2FDanShi-'),
  'wrong extension': url => url.replace('.apk', '.zip'),
  'trailing newline': url => `${url}\n`,
  'query': url => `${url}?download=1`,
  'fragment': url => `${url}#download`,
  'malformed URL': () => 'not a URL',
  'missing URL': () => undefined,
})) invalidVariants[name] = x => x.android.variants[2].url = transform(x.android.variants[2].url)
for (const field of ['sizeBytes', 'versionCode']) {
  for (const value of [0, -1, 1.5, '42', null, undefined, Number.MAX_SAFE_INTEGER + 1, Infinity]) {
    invalidVariants[`${field}: ${String(value)}`] = x => x.android.variants[2][field] = value
  }
}
for (const value of ['a'.repeat(63), 'a'.repeat(65), 'A'.repeat(64), 'g'.repeat(64), 'a'.repeat(64) + '\n', null, 123]) {
  invalidVariants[`sha256: ${String(value)}`] = x => x.android.variants[2].sha256 = value
}
for (const [name, mutate] of Object.entries(invalidVariants)) {
  test(`drops all variants but preserves the main release for ${name}`, () => {
    const manifest = withVariants()
    mutate(manifest)
    const before = structuredClone(manifest)
    const parsed = parseManifest(manifest)
    assert.equal(Object.hasOwn(parsed.android, 'variants'), false)
    assert.deepEqual(parsed, fixture())
    assert.deepEqual(manifest, before, 'parsing does not mutate the input')
  })
}

test('formats variant sizes with the same decimal MB convention as the default APK', async () => {
  const { formatDownloadSize } = await import('../src/lib/releases.ts')
  assert.deepEqual(parseManifest(withVariants()).android.variants.map(v => formatDownloadSize(v.sizeBytes)), ['68.1 MB', '55.0 MB', '79.2 MB'])
  assert.equal(formatDownloadSize(fixture().android.artifact.sizeBytes), '119.9 MB')
})

test('valid variants survive caching and malformed cached variants preserve the default APK', async () => {
  storage()
  globalThis.fetch = async () => new Response(JSON.stringify(withVariants()))
  assert.deepEqual(await fetchManifest(new AbortController().signal), withVariants())
  assert.deepEqual(cachedManifest(), withVariants())
  const damaged = withVariants()
  damaged.android.variants[1].sizeBytes = 0
  storage(JSON.stringify({ savedAt: Date.now(), manifest: damaged }))
  assert.deepEqual(cachedManifest(), fixture())
  globalThis.fetch = async () => new Response(JSON.stringify(damaged))
  assert.deepEqual(await fetchManifest(new AbortController().signal), fixture())
  assert.deepEqual(cachedManifest(), fixture())
})
