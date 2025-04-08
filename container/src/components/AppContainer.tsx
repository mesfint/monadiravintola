import { Box, CircularProgress } from "@mui/material";
import { FC, Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useLanguage } from "../context/LanguageContext";
import RestaurantStory from "./layout/RestaurantStory";


type MenuProps = {
  language: 'english' | 'finnish';
  toggleLanguage: () => void;
};
type ReviewCarouselProps = {
  language: 'english' | 'finnish';
};

const Hero = lazy(() => import("menu/Hero"));
const Menu = lazy(() => import("menu/Menu")) as FC<MenuProps>;
const ReviewCarousel = lazy(() => import("feedback/ReviewCarousel")) as FC<ReviewCarouselProps>;
//const reviewsData = lazy(() => import("FeedbackHost/reviewsData"));
const { language} = useLanguage()


const ErrorFallback = () => (
  <Box sx={{ p: 3, color: 'error.main' }}>
    Something went wrong loading the component
  </Box>
);

const LoadingFallback = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
    <CircularProgress />
  </Box>
);


const AppContainer = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingFallback />}>
        <Box component="main">
          <Hero />
          <Menu language={language} toggleLanguage={toggleLanguage} />
          <RestaurantStory />
          <ReviewCarousel language={language} />
        </Box>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AppContainer;