export interface MenuItem {
    name: string;
    price: number;
    image: string;
    description: {
      english: string;
      finnish: string;
    };
    volume?: string;
    pricePerLiter?: number;
  }
  
  export interface MenuCategory {
    pizza: MenuItem[];
    whitePizza: MenuItem[];
    kidsPizza: MenuItem[];
    pasta: MenuItem[];
    dessert: MenuItem[];
    drinks: MenuItem[];
  }
  
  export type Language = 'english' | 'finnish';

  export const CATEGORY_NAMES = {
    pizzas: "Pizzas",
    whitePizzas: "White Pizzas",
    kidsPizzas: "Kids Pizzas",
    pastas: "Pastas",
    desserts: "Desserts",
    drinks: "Drinks"
  } as const;

  //  view type
export type ViewType = 'grid' | 'list';