import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import StarIcon from '@mui/icons-material/Star';
import { Box, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FC, useState } from 'react';
import { Review } from '../types/review';
const CarouselContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: theme.spacing(4),
  backgroundColor: '#0A1316',
  borderRadius: theme.spacing(2),
  position: 'relative',
}));

const ReviewCard = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4),
  margin: theme.spacing(1),
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'transform 0.3s ease',
  minHeight: '300px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const DotIndicator = styled(Box)<{ active?: boolean }>(({ theme, active }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: active ? '#D68240' : 'rgba(255, 255, 255, 0.3)',
  margin: '0 4px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
}));

interface ReviewCarouselProps {
  reviews?: Review[];
}

// Sample default review data
const defaultReviews: Review[] = [
  {
    id: '1',
    author: 'Mikael Winqvist',
    text: 'Super good food and friendly restaurant owner. Will definitely come back.',
    ratings: {
      food: 5,
      service: 5,
      atmosphere: 4
    },
    date: 'a month ago',
    source: 'Google review'
  },
  // Add more default reviews here
];

const ReviewCarousel: FC<ReviewCarouselProps> = ({ reviews = defaultReviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!reviews || reviews.length === 0) {
    return (
      <Box sx={{ 
        textAlign: 'center', 
        p: 4, 
        color: 'white',
        backgroundColor: '#0A1316',
        borderRadius: 2
      }}>
        <Typography>No reviews available</Typography>
      </Box>
    );
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const currentReview = reviews[currentIndex];

  return (
    <CarouselContainer>
    <Typography 
      variant="h4" 
      component="h2" 
      align="center"
      sx={{ 
        color: '#D68240',
        mb: 4,
        fontWeight: 600
      }}
    >
      Customer Reviews
    </Typography>

    {currentReview && (
      <ReviewCard>
        <Box>
          <Typography variant="h6" sx={{ color: '#D68240', mb: 2 }}>
            {currentReview.author}
          </Typography>
          
          <Typography sx={{ color: 'white', mb: 3, lineHeight: 1.8 }}>
            {currentReview.text}
          </Typography>
        </Box>

        <Box>
          <Box sx={{ mb: 2 }}>
            {currentReview.ratings && (
              <>
                <Typography component="div" sx={{ color: 'white', mb: 1 }}>
                  Food: {Array.from({ length: currentReview.ratings.food }).map((_, i) => (
                    <StarIcon key={i} sx={{ color: '#D68240', fontSize: '1.2rem' }} />
                  ))}
                </Typography>
                <Typography component="div" sx={{ color: 'white', mb: 1 }}>
                  Service: {Array.from({ length: currentReview.ratings.service }).map((_, i) => (
                    <StarIcon key={i} sx={{ color: '#D68240', fontSize: '1.2rem' }} />
                  ))}
                </Typography>
                {currentReview.ratings.atmosphere && (
                  <Typography component="div" sx={{ color: 'white', mb: 1 }}>
                    Atmosphere: {Array.from({ length: currentReview.ratings.atmosphere }).map((_, i) => (
                      <StarIcon key={i} sx={{ color: '#D68240', fontSize: '1.2rem' }} />
                    ))}
                  </Typography>
                )}
              </>
            )}
          </Box>

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'rgba(255, 255, 255, 0.7)'
          }}>
            <Typography variant="caption">
              {currentReview.date}
            </Typography>
            <Typography variant="caption">
              {currentReview.source}
            </Typography>
          </Box>
        </Box>
      </ReviewCard>
    )}

    {reviews.length > 1 && (
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 3,
        gap: 2
      }}>
        <IconButton onClick={handlePrev} sx={{ color: 'white' }}>
          <NavigateBeforeIcon />
        </IconButton>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          {reviews.map((_, index) => (
            <DotIndicator
              key={index}
              active={index === currentIndex}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </Box>

        <IconButton onClick={handleNext} sx={{ color: 'white' }}>
          <NavigateNextIcon />
        </IconButton>
      </Box>
    )}
  </CarouselContainer>
);
};

export default ReviewCarousel;