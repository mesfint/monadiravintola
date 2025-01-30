import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { FC, useState } from 'react';
import logoPath from "../../assets/LOGO.png";



const LogoImage = styled('img')(({ theme }) => ({
  height: '40px',
  marginRight: theme.spacing(2),
  transition: 'transform 0.3s ease',
  cursor: 'pointer',
  
  '&:hover': {
    transform: 'scale(1.05)',
  },

  [theme.breakpoints.down('sm')]: {
    height: '40px',
  },
}));
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1, 2),
  
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(1, 4),
  },
}));

const Header: FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const menuItems = ['Menu', 'Book Table', 'Feedback'];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box 
    sx={{ 
      textAlign: 'center',
      height: '100%',
      position: 'relative',
    }}
  >
    {/* Close button */}
    <IconButton
      onClick={handleDrawerToggle}
      sx={{
        position: 'absolute',
        right: 8,
        top: 8,
        color: 'white',
      }}
    >
      <CloseIcon />
    </IconButton>

    {/* Logo */}
    <Box sx={{ p: 3, mt: 2 }}>
      <LogoImage 
        src={logoPath} 
        alt="Monadi Logo" 
        sx={{ height: '40px' }} 
      />
    </Box>
     {/* Menu Items */}
     <List sx={{ mt: 2 }}>
        {menuItems.map((item) => (
          <ListItem 
            key={item} 
            onClick={handleDrawerToggle} // Close drawer when item is clicked
            sx={{
              justifyContent: 'center',
              py: 2,
              '&:hover': {
                backgroundColor: 'rgba(214, 130, 64, 0.1)',
              }
            }}
          >
            <ListItemText 
              primary={item} 
              sx={{
                textAlign: 'center',
                '& .MuiTypography-root': {
                  fontSize: '1.1rem',
                  fontFamily: 'Poppins, sans-serif',
                }
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <AppBar 
    position="fixed"
    sx={{
      backgroundColor: 'black',
      boxShadow: 'none',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    }}
  >
      <StyledToolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            flex: isMobile ? 1 : 'auto',
            justifyContent: isMobile ? 'center' : 'flex-start',
          }}
        >
          <LogoImage 
            src={logoPath} 
            alt="Monadi Logo"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
        </Box>

        {!isMobile && (
          <Box sx={{ 
            display: 'flex', 
            gap: 4,
            alignItems: 'center'
          }}>
            {menuItems.map((item) => (
              <Typography
                key={item}
                sx={{ 
                  cursor: 'pointer',
                  color: 'white',
                  fontSize: '1rem',
                  fontFamily: 'Poppins, sans-serif',
                  position: 'relative',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    width: '0%',
                    height: '2px',
                    bottom: -4,
                    left: 0,
                    backgroundColor: '#D68240',
                    transition: 'width 0.3s ease',
                  },
                  '&:hover': {
                    '&:after': {
                      width: '100%',
                    },
                  },
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>
        )}
      </StyledToolbar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true
        }}
        sx={{
            display: { xs: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: { xs: '100%', sm: '100%', md: 340 }, // Full width on mobile, 340px on larger screens
            backgroundColor: 'black',
            color: 'white',
          },
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker backdrop
          }
        }}
        onClick={(e) => {
          // Close drawer when clicking backdrop
          if (e.target === e.currentTarget) {
            handleDrawerToggle();
          }
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Header;