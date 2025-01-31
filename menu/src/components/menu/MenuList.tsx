import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { FC } from 'react';
import { MenuData, MenuItem } from '../../../types';
import menuData from '../../data/menu.json';
import { useMenu } from '../../utils/useMenu';
import MenuItemCard from './MenuItemCard';

const MenuList: FC = () => {
  const { activeCategory, viewType } = useMenu();
  const typedMenuData = menuData as MenuData;
  const items = typedMenuData.menu.categories[activeCategory as keyof typeof typedMenuData.menu.categories] || [];

  if (viewType === 'grid') {
    return (
      <Box sx={{ 
        mt: 8, // More space from tabs
        px: 2,
        minHeight: '100vh',
        backgroundColor: '#1a1a1a', // Match Hero background
        pb: 8 // Space at bottom
      }}>
        <Grid container spacing={3}>
          {items.map((item: MenuItem, index: number) => (
            <Grid key={index} xs={12} sm={6} md={4}>
              <MenuItemCard 
                item={item} 
                viewType={viewType}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        mt: 8, // More space from tabs
        display: 'flex', 
        flexDirection: 'column', 
        gap: 2,
        px: 2,
        minHeight: '100vh',
        backgroundColor: '#1a1a1a', // Match Hero background
        pb: 8 // Space at bottom
      }}
    >
      {items.map((item: MenuItem, index: number) => (
        <MenuItemCard 
          key={index}
          item={item} 
          viewType={viewType}
        />
      ))}
    </Box>
  );
};

export default MenuList;