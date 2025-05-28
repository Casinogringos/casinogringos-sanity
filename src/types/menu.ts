export interface MenuItem {
  uri: string;
  id: string;
  label: string;
  title: string;
  parentId?: string;
  connectedNode: {
    node: {
      indexSlug: string;
    };
  };
  childItems?: {
    edges: { node: MenuItem }[];
  };
}

export interface Menu {
  __typename: "Menu";
  databaseId: number;
  id: string;
  menuId: number;
  menuItems: {
    edges: { node: MenuItem }[];
  };
}
