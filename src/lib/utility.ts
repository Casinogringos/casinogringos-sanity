export const formatPageSlug = (slug: string) => {
  if (slug.startsWith('/') && !slug.endsWith('/')) {
    return slug
  }
  let newSlug = slug
  if (!slug.startsWith('/')) {
    newSlug = `/${newSlug}`
  }
  if (slug.endsWith('/')) {
    newSlug = newSlug.slice(0, -1)
  }
  return newSlug
}
