import { Box, Container } from '@mui/material';
import { FC } from 'react';
import { MenuProvider } from '../../context/MenuContext';
import MenuCategories from './MenuCategories';


const Menu: FC = () => {
  return (
    <MenuProvider>
      <Box 
        sx={{ 
          bgcolor: '#1a1a1a', 
          color: 'white',     
          minHeight: '100vh',
          width: '100%',
          pt: { xs: 2, md: 4 },
          pb: 4
        }}
      >
        <Container maxWidth="lg">
          <MenuCategories />
          {/* MenuList will come here - that's why you don't see any changes when clicking */}
        
          <Box sx={{ 
            height: '200px', // Temporary, remove when MenuList is added
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#D68240'
          }}>
            MenuList component coming soon...
          </Box>
        </Container>
      </Box>
    </MenuProvider>
  );
};

export default Menu;