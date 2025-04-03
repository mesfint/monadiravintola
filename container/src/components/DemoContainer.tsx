import { Box, CircularProgress } from "@mui/material";
import { Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";

// Specify the correct remote module paths
const Hero = lazy(() => import("menu/Hero"));
const Menu = lazy(() => import("menu/Menu"));
const ReviewCarousel = lazy(() => import("feedback/ReviewCarousel"));

const LoadingSpinner = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
    <CircularProgress />
  </Box>
);

const ErrorFallback = ({ error }: { error: Error }) => (
  <Box sx={{ p: 3, color: 'error.main' }}>
    <h2>Something went wrong:</h2>
    <pre>{error.message}</pre>
  </Box>
);

const DemoContainer = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingSpinner />}>
        <Box>
          <Hero />
          <Menu />
          <ReviewCarousel />
        </Box>
      </Suspense>
    </ErrorBoundary>
  );
};

export default DemoContainer;