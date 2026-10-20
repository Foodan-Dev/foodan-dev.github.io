import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { isPostId } from '../src/lib/post-links.ts'

const readAssociation = name => JSON.parse(readFileSync(new URL(`../public/.well-known/${name}`, import.meta.url), 'utf8'))

test('post IDs are canonical positive integers without numeric precision loss', () => {
  for (const id of ['1', '42', '9007199254740993']) assert.equal(isPostId(id), true)
  for (const id of ['', '0', '-1', '01', '1.5', '1e2', '+1', ' 1', '1\n', 'abc', '1/2', '%31', null, undefined, 1, ['1']]) {
    assert.equal(isPostId(id), false, String(id))
  }
})

test('Apple association supports modern and legacy post-only links', () => {
  assert.deepEqual(readAssociation('apple-app-site-association'), {
    applinks: { apps: [], details: [{
      appIDs: ['68G9FZ2ZV2.com.fdueat.danshi'], appID: '68G9FZ2ZV2.com.fdueat.danshi',
      components: [{ '/': '/post/*', comment: 'post detail' }], paths: ['/post/*'],
    }] },
  })
})

test('Android association uses the exact package and signing certificate', () => {
  assert.deepEqual(readAssociation('assetlinks.json'), [{
    relation: ['delegate_permission/common.handle_all_urls'],
    target: {
      namespace: 'android_app', package_name: 'com.fdueat.DanShi',
      sha256_cert_fingerprints: ['37:FE:AC:E1:8D:43:E8:22:86:E6:A6:35:C5:B7:1A:CF:19:74:85:DE:B2:30:A3:67:7E:3F:18:7A:C5:4A:67:3E'],
    },
  }])
})
