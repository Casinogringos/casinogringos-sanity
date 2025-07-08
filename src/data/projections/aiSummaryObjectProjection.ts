export const aiSummaryObjectProjection = `
  _type == 'ai-summary-object' => {
    _type,
    _id,
    _key,
    title,
    content,
    message
  }
`
