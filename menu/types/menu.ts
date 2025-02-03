export interface MenuItem {
  name: string;
  price: number;
  image: string;
  description: {
    english?: string;
    finnish: string;
  };
  volume?: string;
  pricePerLiter?: number;
}

export interface MenuCategories {
  pizzas: MenuItem[];
  whitePizzas: MenuItem[];
  kidsPizzas: MenuItem[];
  pastas: MenuItem[];
  desserts: MenuItem[];
  drinks: MenuItem[];
}
//entire menu data
export interface MenuData {
  menu: {
    categories: MenuCategories;
  };
}

export type ViewType = 'grid' | 'list';
export type Language = 'english' | 'finnish';



export const CATEGORY_NAMES = {
  pizzas: "Pizzas",
  whitePizzas: "White Pizzas",
  kidsPizzas: "Kids Pizzas",
  pastas: "Pastas",
  desserts: "Desserts",
  drinks: "Drinks"
} as const;