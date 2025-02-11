import { Box } from '@mui/material';
import { FC } from 'react';
import { globalTheme } from '../../styles/globalTheme';
import AppContainer from '../AppContainer';
import Footer from './Footer';
import Header from './Header';
import RestaurantStory from './RestaurantStory';



const Layout: FC = () => {
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
        <AppContainer />
        <RestaurantStory />

      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;