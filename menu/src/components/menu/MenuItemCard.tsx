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
  height: '100%',
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


// Function to get the correct image path
const getImagePath = (imagePath: string) => {
  // If the path already starts with http or https, return as is
  if (imagePath.startsWith('http')) return imagePath;
  
  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // In development, use the full path
  if (process.env.NODE_ENV === 'development') {
    return `http://localhost:3001/${cleanPath}`;
  }
  
  // In production, adjust the path accordingly
  return `/${cleanPath}`;
};

// Fallback image URL
const fallbackImage = '/assets/placeholder.jpg';

  return (
    <StyledCard viewType={viewType}>
    <CardMedia
      component="img"
      image={imageError ? fallbackImage : getImagePath(item.image)}
      alt={item.name}
      onError={() => setImageError(true)}
      sx={{
        width: viewType === 'grid' 
          ? '100%' 
          : { xs: '100px', sm: isDrink ? '100px' : '140px' },
        height: viewType === 'grid' 
          ? isDrink ? '150px' : '200px'
          : { xs: '100px', sm: isDrink ? '100px' : '140px' },
        objectFit: 'cover',
      }}
    />
      <CardContent 
        sx={{ 
          flex: 1, 
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
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
                fontSize: viewType === 'list' ? '1rem' : '1.25rem'
              }}
            >
              {item.name}
            </Typography>
            {isDrink && item.volume && (
              <Typography 
                variant="caption" 
                sx={{ 
                  color: 'grey.500',
                  ml: 2
                }}
              >
                {item.volume}
              </Typography>
            )}
          </Box>
          {item.description && item.description[language] && (
            <Typography 
              variant="body2" 
              sx={{ 
                mb: 2, 
                opacity: 0.9,
                display: '-webkit-box',
                WebkitLineClamp: viewType === 'list' ? 2 : 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                fontSize: viewType === 'list' ? '0.875rem' : '1rem'
              }}
            >
              {item.description[language]}
            </Typography>
          )}
        </Box>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: isDrink ? 1 : 2
        }}>
          <Box>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#D68240',
                fontSize: viewType === 'list' ? '1rem' : '1.25rem'
              }}
            >
              {item.price.toFixed(2)} €
            </Typography>
            {isDrink && item.pricePerLiter && (
              <Typography 
                variant="caption" 
                sx={{ 
                  color: 'grey.500',
                  display: 'block'
                }}
              >
                ({item.pricePerLiter.toFixed(2)} €/l)
              </Typography>
            )}
          </Box>
          <Button
            variant="contained"
            size={viewType === 'list' ? 'small' : 'medium'}
            sx={{
              backgroundColor: '#D68240',
              '&:hover': {
                backgroundColor: '#c47538',
              },
              fontSize: viewType === 'list' ? '0.75rem' : '0.875rem'
            }}
          >
            Order
          </Button>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default MenuItemCard;