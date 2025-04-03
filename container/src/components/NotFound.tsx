import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      <Typography variant="h1" sx={{ mb: 2 }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ mb: 4 }}>
        Page Not Found
      </Typography>
      <Button 
        variant="contained" 
        onClick={() => navigate('/')}
        sx={{ 
          bgcolor: '#D68240',
          '&:hover': {
            bgcolor: '#bf7339'
          }
        }}
      >
        Go Home
      </Button>
    </Box>
  );
};

export default NotFound; 