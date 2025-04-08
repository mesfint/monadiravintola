import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { FC, memo, useEffect } from 'react';
import { MenuItem } from '../../../types';
import { useTranslatedMenu } from '../../hooks/useTranslatedMenu';
import useMenu from '../../utils/useMenu';
import MenuItemCard from './MenuItemCard';

interface MenuListProps {
  language: 'english' | 'finnish';
}

const MenuList: FC<MenuListProps> = ({ language }) => {
  const { activeCategory, viewType } = useMenu();
  const translatedMenu = useTranslatedMenu(language);
  const items: MenuItem[] = translatedMenu.categories[activeCategory] || [];
  useEffect(() => {
    console.log('TranslatedMenu updated:', translatedMenu);
  }, [translatedMenu]);

  if (viewType === 'grid') {
    return (
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {items && items.map((item: MenuItem, index: number) => (
            <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
              <Box sx={{ height: '100%', p: 1, spacing: { xs: 1, sm: 2, md: 3 } }}>
                <MenuItemCard 
                  item={item} 
                  viewType={viewType}
                  language={language}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        mt: 8,
        display: 'flex', 
        flexDirection: 'column', 
        gap: 2,
        px: 2,
        minHeight: '100vh',
        backgroundColor: '#1a1a1a',
        pb: 8
      }}
    >
      {items && items.map((item: MenuItem, index: number) => (
        <MenuItemCard 
          key={index}
          item={item} 
          viewType={viewType}
          language={language}
        />
      ))}
    </Box>
  );
};

export default memo(MenuList);