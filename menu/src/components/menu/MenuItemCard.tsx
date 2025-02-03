import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  styled,
  Typography
} from '@mui/material';
import { FC, useState } from 'react';
import { MenuItem, ViewType } from '../../../types';
import { useMenu } from '../../utils/useMenu';

interface MenuItemCardProps {
  item: MenuItem;
  viewType: ViewType;
}

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'viewType'
})<{ viewType: ViewType }>(({ theme, viewType }) => ({
  display: 'flex',
  flexDirection: viewType === 'grid' ? 'column' : 'row',
  height: viewType === 'grid' ? '100%' : 'auto',
  width: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  color: 'white',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const MenuItemCard: FC<MenuItemCardProps> = ({ item, viewType }) => {
  const { language, activeCategory } = useMenu();
  const [imageError, setImageError] = useState(false);
  const isDrink = activeCategory === 'drinks';

  const handleOrderClick = () => {
    const RESTAURANT_WOLT_URL = 'https://wolt.com/fi/fin/espoo/restaurant/monadi';
    window.open(RESTAURANT_WOLT_URL, '_blank', 'noopener,noreferrer');
  };

  const getImagePath = (imagePath: string) => {
    if (imagePath.startsWith('http')) return imagePath;
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    if (process.env.NODE_ENV === 'development') {
      return `http://localhost:3001/${cleanPath}`;
    }
    return `/${cleanPath}`;
  };

  return (
      <StyledCard viewType={viewType}>
      <CardMedia
  component="img"
  image={imageError ? '/assets/placeholder.png' : getImagePath(item.image)}
  alt={item.name}
  onError={() => setImageError(true)}
  sx={viewType === 'grid' ? {
    width: '100%',
    height: '200px',
    maxHeight: {
      xs: '200px',
      sm: '220px',
      md: '180px',
      lg: '160px'  // Even smaller for large screens
    },
    objectFit: 'cover',
    objectPosition: 'center',
  } : {
    // List view remains unchanged
    width: { xs: '120px', sm: '140px' },
    height: '140px',
    objectFit: 'cover',
    flexShrink: 0,
  }}
/>
      <CardContent 
        sx={{ 
          flex: 1,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: viewType === 'grid' ? (isDrink ? '120px' : '180px') : 'auto',
        }}
      >
        <Box>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 1 
          }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#D68240',
                fontSize: isDrink ? '1rem' : '1.1rem',
                flex: 1
              }}
            >
              {item.name}
            </Typography>
            {isDrink && item.volume && (
              <Typography 
                variant="caption" 
                sx={{ 
                  color: 'grey.500',
                  ml: 1,
                  whiteSpace: 'nowrap'
                }}
              >
                {item.volume}
              </Typography>
            )}
          </Box>
          
          {(!isDrink || item.description?.[language]) && (
            <Typography 
              variant="body2" 
              sx={{ 
                opacity: 0.9,
                display: '-webkit-box',
                WebkitLineClamp: viewType === 'list' ? 2 : (isDrink ? 2 : 3),
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                mb: 2,
                minHeight: viewType === 'grid' ? (isDrink ? '40px' : '60px') : 'auto',
              }}
            >
              {item.description[language] || ' '}
            </Typography>
          )}
        </Box>
        
        <Box 
          sx={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            mt: isDrink ? 1 : 'auto'
          }}
        >
          <Box>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#D68240',
                fontSize: isDrink ? '1rem' : (viewType === 'list' ? '1rem' : '1.25rem')
              }}
            >
              {item.price.toFixed(2)} €
            </Typography>
            {isDrink && item.pricePerLiter && (
              <Typography 
                variant="caption" 
                sx={{ 
                  color: 'grey.500',
                  display: 'block',
                  fontSize: '0.75rem',
                  mt: -0.5
                }}
              >
                ({item.pricePerLiter.toFixed(2)} €/l)
              </Typography>
            )}
          </Box>
          <Button
            variant="contained"
            onClick={handleOrderClick}
            size={isDrink ? 'small' : (viewType === 'list' ? 'small' : 'medium')}
            sx={{
              backgroundColor: '#D68240',
              '&:hover': {
                backgroundColor: '#c47538',
              },
            }}
          >
            Order on Wolt
          </Button>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default MenuItemCard;