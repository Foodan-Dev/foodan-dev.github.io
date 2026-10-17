export const CHANNEL_URL = 'https://dl.fdueat.com/channels/stable.json'
const CACHE_KEY = 'danshi-download-channel-v1'

export interface ReleaseManifest {
  schemaVersion: 1
  channel: 'stable'
  updatedAt: string
  android: {
    version: string
    versionCode: number
    buildId: string
    publishedAt: string
    artifact: { url: string; sizeBytes: number; sha256: string }
  }
  ios: {
    distribution: 'testflight'
    installUrl: string | null
    availableVersion: string | null
  }
}

function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Invalid release manifest')
  return value as Record<string, unknown>
}

export function parseManifest(value: unknown): ReleaseManifest {
  const root = record(value)
  const android = record(root.android)
  const artifact = record(android.artifact)
  const ios = record(root.ios)
  const semver = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/
  if (root.schemaVersion !== 1 || root.channel !== 'stable'
    || typeof root.updatedAt !== 'string' || !Number.isFinite(Date.parse(root.updatedAt))
    || typeof android.version !== 'string' || !semver.test(android.version)
    || typeof android.versionCode !== 'number' || !Number.isSafeInteger(android.versionCode) || android.versionCode < 1
    || typeof android.buildId !== 'string' || !/^[a-f0-9-]{36}$/.test(android.buildId)
    || typeof android.publishedAt !== 'string' || !Number.isFinite(Date.parse(android.publishedAt))
    || typeof artifact.sizeBytes !== 'number' || !Number.isSafeInteger(artifact.sizeBytes) || artifact.sizeBytes <= 0
    || typeof artifact.sha256 !== 'string' || !/^[a-f0-9]{64}$/.test(artifact.sha256)
    || typeof artifact.url !== 'string') throw new Error('Invalid release metadata')
  const download = new URL(artifact.url)
  if (download.origin !== 'https://dl.fdueat.com' || download.username || download.password
    || !download.pathname.startsWith(`/releases/v${android.version}/${android.buildId}/`)
    || !download.pathname.endsWith('.apk') || download.search || download.hash) throw new Error('Invalid download URL')
  if (ios.distribution !== 'testflight'
    || (ios.installUrl !== null && (typeof ios.installUrl !== 'string' || !/^https:\/\/testflight\.apple\.com\/join\/[A-Za-z0-9]+$/.test(ios.installUrl)))
    || (ios.availableVersion !== null && (typeof ios.availableVersion !== 'string' || !semver.test(ios.availableVersion)))) {
    throw new Error('Invalid iOS distribution')
  }
  return value as ReleaseManifest
}

export function cachedManifest(): ReleaseManifest | null {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) ?? 'null')
    if (!cached || typeof cached.savedAt !== 'number' || Date.now() - cached.savedAt > 30 * 24 * 60 * 60 * 1000) return null
    return parseManifest(cached.manifest)
  } catch {
    return null
  }
}

export async function fetchManifest(signal: AbortSignal): Promise<ReleaseManifest> {
  const response = await fetch(CHANNEL_URL, { cache: 'no-store', credentials: 'omit', signal })
  if (!response.ok) throw new Error('Download information is unavailable')
  const manifest = parseManifest(await response.json())
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), manifest }))
  } catch {
    // Storage may be disabled; a successful network response still works.
  }
  return manifest
}
