import { Box, Container } from '@mui/material';
import { FC } from 'react';
//import { MenuLanguageProvider } from '../../context/LanguageContext';
import { MenuProvider } from '../../context/MenuContext';
import MenuCategories from './MenuCategories';
import MenuList from './MenuList';

interface MenuProps {
  language: 'english' | 'finnish';
  toggleLanguage: () => void;
}

const Menu: FC<MenuProps> = ({ language, toggleLanguage }) => {
  console.log("Menu component rendered");
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
            <MenuCategories language={language} />
            <MenuList language={language}  />
          </Container>
        </Box>
      </MenuProvider>
      
    
    
  );
};

export default Menu;