import { createContext, FC, ReactNode, useState } from 'react';
import { ViewType } from '../../types';

export interface MenuContextType {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  viewType: ViewType;
  setViewType: (view: ViewType) => void;
}

export const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [activeCategory, setActiveCategory] = useState('pizzas');
  const [viewType, setViewType] = useState<ViewType>('grid');

  return (
    <MenuContext.Provider value={{
      activeCategory,
      setActiveCategory,
      viewType,
      setViewType
    }}>
      {children}
    </MenuContext.Provider>
  );
};

