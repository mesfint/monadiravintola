import { Box } from '@mui/material';
import { FC } from 'react';
import { globalTheme } from '../../styles/globalTheme';
import Footer from './Footer';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: globalTheme.palette.primary.main
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          paddingTop: { xs: '56px', sm: '64px' }, // Adjust based on header height
        }}
      >
        {children}
      
        {/* <RestaurantStory /> */}

      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;