import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import StarIcon from '@mui/icons-material/Star';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { translations } from 'container/translations';
import { FC, useEffect, useState } from 'react';
import { reviews as reviewsData } from '../data/reviews'; // Import the reviews data
import { Review } from '../types/review';

const CarouselContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: theme.spacing(4),
  backgroundColor: '#0A1316',
  position: 'relative',
  overflow: 'hidden',
  zIndex: 1,
  isolation: 'isolate'
}));

const ReviewsTrack = styled(Box)(({ theme }) => ({
  display: 'flex',
  transition: 'transform 0.5s ease-in-out',
  gap: theme.spacing(2), // Add gap between cards
  willChange: 'transform',
  width: '100%',
  position: 'relative',
}));

const ReviewCard = styled(Box)(({ theme }) => ({
  flex: '0 0 calc(33.333% - 16px)', // Adjust for gap
  minWidth: 'calc(33.333% - 16px)', // Ensure cards don't shrink
  [theme.breakpoints.down('md')]: {
    flex: '0 0 calc(50% - 16px)',
    minWidth: 'calc(50% - 16px)',
  },
  [theme.breakpoints.down('sm')]: {
    flex: '0 0 calc(100% - 16px)',
    minWidth: 'calc(100% - 16px)',
  },
}));

const ReviewContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(2.5),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -2,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80px',
    height: '4px',
    backgroundColor: '#D68240',
    borderRadius: '2px',
  },
}));

// const defaultReviews: Review[] = [
//   {
//     id: '1',
//     author: 'Mikael Winqvist',
//     text: 'Super good food and friendly restaurant owner. Will definitely come back.',
//     ratings: { food: 5, service: 5, atmosphere: 4 },
//     date: 'a month ago',
//     source: 'Google review'
//   },
  
// ];

interface ReviewCarouselProps {
  reviews?: Review[];
  language: 'english' | 'finnish';
}

const ReviewCarousel: FC<ReviewCarouselProps> = ({ reviews = reviewsData, language }) => {
  const [position, setPosition] = useState(0);
  const [clonedReviews, setClonedReviews] = useState<Review[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    //wait for the component to be mounted
    setIsVisible(true);
    // Clone reviews for infinite scroll - triple the array
    const cloned = [...reviews, ...reviews, ...reviews];
    setClonedReviews(cloned);

    // Log to verify cloning
    console.log('Cloned reviews:', cloned.length);
  }, [reviews]);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setPosition((prev) => {
        const next = prev + 1;
        // Reset position when reaching the end of first set
        if (next >= reviews.length) {
          //reset position to the first review
          setTimeout(() => {
            setPosition(0);
          }, 0);
          return prev;
        }
        return next;
      });

      
      //console.log('Current position:', position);
    }, 3000);

    return () => clearInterval(interval);
  }, [reviews.length, isVisible]);

  // Calculate the translation percentage based on position
  const translateX = -(position * (100 / 3 + 1.4)); // Adjust for gap

  //console.log('Transform value:', translateX);

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
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
        {translations[language].customerReviews}
      </Typography>

      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      <ReviewsTrack
         sx={{
          transform: `translateX(${translateX}%)`,
          opacity: isVisible ? 1 : 0,
          transition: 'transform 0.5s ease-in-out, opacity 0.3s ease-in-out',
        }}
      >
        {clonedReviews.map((review, index) => (
          <ReviewCard key={`${review.id}-${index}`}>
            <ReviewContent>
              <FormatQuoteIcon 
                sx={{ 
                  color: '#D68240',
                  fontSize: '2rem',
                  mb: 1
                }}
              />
              
              <Typography 
                sx={{ 
                  color: 'white',
                  mb: 2,
                  lineHeight: 1.6,
                  flex: 1,
                  fontSize: '0.9rem',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 4, // Limit to 4 lines
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {review.text}
              </Typography>

              <Box sx={{ mb: 1 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon 
                    key={i}
                    sx={{ 
                      color: i < (review.ratings.food || 0) ? '#D68240' : 'rgba(255,255,255,0.2)',
                      fontSize: '1rem'
                    }}
                  />
                ))}
              </Box>

              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#D68240',
                  fontWeight: 600,
                  fontSize: '0.95rem'
                }}
              >
                {review.author}
              </Typography>

              <Typography 
                variant="caption"
                sx={{ 
                  color: 'rgba(255,255,255,0.7)',
                  mt: 0.5,
                  fontSize: '0.75rem'
                }}
              >
                {review.source} • {review.date}
              </Typography>
            </ReviewContent>
          </ReviewCard>
        ))}
        </ReviewsTrack>
      </Box>
    </CarouselContainer>
    </Box>
  );
};

export default ReviewCarousel;