type MenuItem = {
  uri: string
  id: string
  label: string
  parentId?: string
  connectedNode: {
    node: {
      indexSlug: string
    }
  }
  childItems?: {
    edges: { node: MenuItem }[]
  }
}

export type Menu = {
  __typename: 'Menu'
  databaseId: number
  id: string
  menuId: number
  menuItems: {
    edges: { node: MenuItem }[]
  }
}
