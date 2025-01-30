import { Box } from '@mui/material';
import { FC } from 'react';
import AppContainer from '../AppContainer';
import Footer from './Footer';
import Header from './Header';

const Layout: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default'
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
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;