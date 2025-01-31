import { createContext, FC, ReactNode, useState } from 'react';
import { Language, ViewType } from '../../types';

interface MenuContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  viewType: ViewType;
  setViewType: (view: ViewType) => void;
}

export const MenuContext = createContext<MenuContextType | undefined>(undefined);

interface MenuProviderProps {
  children: ReactNode;
}

export const MenuProvider: FC<MenuProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('finnish');
  const [activeCategory, setActiveCategory] = useState('pizzas');
  const [viewType, setViewType] = useState<ViewType>('grid');

  return (
    <MenuContext.Provider value={{
      language,
      setLanguage,
      activeCategory,
      setActiveCategory,
      viewType,
      setViewType
    }}>
      {children}
    </MenuContext.Provider>
  );
};