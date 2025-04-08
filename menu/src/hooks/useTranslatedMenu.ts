import { MenuItem, TranslatedMenu } from '../../types/menu';
import menuData from '../data/menu.json';

export const useTranslatedMenu = (language: 'english' | 'finnish'): TranslatedMenu => {
  console.log('Current language in useTranslatedMenu:', language); 

  const categories = {} as Record<string, MenuItem[]>;
  
  Object.entries(menuData.menu.categories).forEach(([key, items]) => {
    categories[key] = (items as MenuItem[]).map(item => ({
      ...item,
      description: item.description ? {
        finnish: item.description.finnish || '',
        english: item.description[language] || item.description.english || ''
      } : {
        finnish: '',
        english: ''
      }
    }));
  });

  return { categories };
}; 