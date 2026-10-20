import assert from 'node:assert/strict'
import test from 'node:test'
import { isPostId } from '../src/lib/post-links.ts'

test('post IDs are canonical positive integers without numeric precision loss', () => {
  for (const id of ['1', '42', '9007199254740993']) assert.equal(isPostId(id), true)
  for (const id of ['', '0', '-1', '01', '1.5', '1e2', '+1', ' 1', '1\n', 'abc', '1/2', '%31', null, undefined, 1, ['1']]) {
    assert.equal(isPostId(id), false, String(id))
  }
})
