class UtilityService {
  getPublishedTimestamp({
    originalPublishedAt,
    newCreatedAt,
  }: {
    originalPublishedAt: number | null
    newCreatedAt: number | null
  }) {
    if (!originalPublishedAt || !newCreatedAt) return null
    if (originalPublishedAt) {
      return originalPublishedAt ?? null
    }
    return newCreatedAt ?? null
  }

  getHref({ slug, type }: { slug: string, type: string }) {
    switch (type) {
      default:
        return `${slug}`
    }
  }
}

export default UtilityService
