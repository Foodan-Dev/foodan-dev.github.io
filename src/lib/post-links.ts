export function isPostId(id: unknown): id is string {
  return typeof id === 'string' && /^[1-9]\d*$/.test(id)
}
