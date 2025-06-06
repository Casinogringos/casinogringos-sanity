export interface MenuItem {
  _type: 'menu-item-object'
  _id: string
  label?: string
  page: {
    slug: string
  }
  children?: MenuItem[]
}

export interface Menu {
  _type: 'menus'
  _id: string
  items: MenuItem[]
}
