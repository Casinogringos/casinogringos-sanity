export const newsPageCountQuery = () => `
    count(*[_type == 'news-pages' && (!defined(publishedAt) || publishedAt <= now())])
`
