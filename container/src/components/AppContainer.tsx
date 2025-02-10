import { Box, CircularProgress } from "@mui/material";
import { Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";



const Hero = lazy(() => import("MenuHost/Hero"));
const Menu = lazy(() => import("MenuHost/Menu"));
const ReviewCarousel = lazy(() => import("FeedbackHost/ReviewCarousel"));
//const reviewsData = lazy(() => import("FeedbackHost/reviewsData"));


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
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingFallback />}>
        <Hero />
        <Menu />
        <Suspense fallback={<LoadingFallback />}>
        <ReviewCarousel />
      </Suspense>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AppContainer;