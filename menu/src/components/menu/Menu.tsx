import { Box, Container } from '@mui/material';
import { FC } from 'react';
import { MenuProvider } from '../../context/MenuContext';
import MenuCategories from './MenuCategories';
import MenuList from './MenuList';

const Menu: FC = () => {
  return (
    <MenuProvider>
      <Box 
        sx={{ 
          bgcolor: '#1a1a1a', 
          color: 'white',     
          minHeight: '100vh',
          width: '100%',
         position: 'relative'
        }}
      >
       <Container maxWidth="lg">
          <MenuCategories />
          <MenuList />
        </Container>
      </Box>
    </MenuProvider>
  );
};

export default Menu;