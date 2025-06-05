export const aiSummaryObjectProjection = `
  _type == 'ai-summary-object' => {
    _type,
    _id,
    title,
    content,
    message
  }
`
