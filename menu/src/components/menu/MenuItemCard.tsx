import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  styled,
  Typography
} from '@mui/material';
import { translations } from 'container/translations';
import { FC, useState } from 'react';
import { MenuItem, ViewType } from '../../../types';
import useMenu from '../../utils/useMenu';



interface MenuItemCardProps {
  item: MenuItem;
  viewType: ViewType;
  language: 'english' | 'finnish';
}

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'viewType'
})<{ viewType: ViewType }>(({ theme, viewType }) => ({
  display: 'flex',
  flexDirection: viewType === 'grid' ? 'column' : 'row',
  height: viewType === 'grid' ? '100%' : 'auto',
  width: '100%',
  //padding: '30px',
  //margin: '10px 0',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  color: 'white',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const MenuItemCard: FC<MenuItemCardProps> = ({ item, viewType, language }) => {
  const {  activeCategory } = useMenu();
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
  image={imageError ? '/assets/placeholder.jpg' : getImagePath(item.image)}
  alt={item.name}
  onError={() => setImageError(true)}
  sx={viewType === 'grid' ? {
    width: '100%',
    height: '180px',
    maxHeight: {
      xs: '160px',
        sm: '180px',
        md: '200px',
        lg: '220px'
    },
    objectFit: 'contain',
    objectPosition: 'center',
    padding: { xs: '4px', sm: '8px', md: '12px' },

    //border: '1px solid #D68240'
  } : {
    // List view remains unchanged
    width: { xs: '100px', sm: '120px', md: '140px' },
    height: { xs: '100px', sm: '120px', md: '140px' },
    objectFit: 'cover',
    flexShrink: 0,
  }}
/>
      <CardContent 
        sx={{ 
          flex: 1,
          p: { xs: 1, sm: 1.5, md: 2 }, // Responsive padding
          display: 'flex',
          //border: '1px solid rgb(251, 9, 29)',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: viewType === 'grid' ? 
        (isDrink ? { xs: '100px', sm: '120px', md: '140px' } : 
                  { xs: '140px', sm: '160px', md: '180px' }) : 
        'auto',
    }}
      >
        <Box>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: { xs: 0.5, sm: 1 } 
          }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#D68240',
                fontSize: {
                  xs: isDrink ? '0.9rem' : '1rem',
                  sm: isDrink ? '1rem' : '1.1rem',
                  md: isDrink ? '1.1rem' : '1.2rem'
                },
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
                  whiteSpace: 'nowrap',
                  fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }
                }}
              >
                {item.volume}
              </Typography>
            )}
          </Box>
          
          {(!isDrink || item.description?.english || item.description?.finnish) && (
            <Typography 
              variant="body2" 
              sx={{ 
                opacity: 0.9,
                display: '-webkit-box',
                WebkitLineClamp: viewType === 'list' ? 2 : (isDrink ? 2 : 3),
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                mb: { xs: 1, sm: 1.5, md: 2 },
                minHeight: viewType === 'grid' ? (isDrink ? '40px' : '60px') : 'auto',
              }}
            >
            {item.description?.[language as keyof typeof item.description] || item.description?.english || ''}
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
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            
          }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#D68240',
                fontSize: {
                  xs: isDrink ? '0.9rem' : (viewType === 'list' ? '0.9rem' : '1.1rem'),
                  sm: isDrink ? '1rem' : (viewType === 'list' ? '1rem' : '1rem')
                }
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
              fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.9rem' },
              padding: { 
                xs: '2px 6px', 
                sm: '4px 10px', 
                md: '8px 16px' 
              },
              width: { xs: '100%', sm: 'auto' } // Full width on mobile
            }}
          >
        {translations?.[language]?.orderButton || 'Order on Wolt'}
        </Button>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default MenuItemCard;