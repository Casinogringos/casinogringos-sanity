export interface BasePage {
  _id: string
  _type: string
  title: string
  slug: {
    current: string
  }
}
