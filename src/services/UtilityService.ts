class UtilityService {
  getPublishedTimestamp({
    originalPublishedAt,
    newCreatedAt,
  }: {
    originalPublishedAt: number | null
    newCreatedAt: number | null
  }) {
    if (!originalPublishedAt && !newCreatedAt) return null
    if (originalPublishedAt) {
      return originalPublishedAt ?? null
    }
    return newCreatedAt ?? null
  }
  getUpdatedAtTimestamp({
    originalModifiedAt,
    newUpdatedAt,
  }: {
    originalModifiedAt: number | null
    newUpdatedAt: number | null
  }) {
    if (!originalModifiedAt && !newUpdatedAt) return null
    if (newUpdatedAt) {
      return newUpdatedAt ?? null
    }
    return originalModifiedAt ?? null
  }
  getHref({ slug, type }: { slug: string; type: string }) {
    switch (type) {
      default:
        return `${slug}`
    }
  }

  removeFirstSlash(url: string) {
    return url?.startsWith('/') ? url.slice(1) : url
  }
}

export default UtilityService
