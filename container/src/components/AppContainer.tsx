import { Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";

const Hero = lazy(() => import("MenuHost/Hero"));
const Menu = lazy(() => import("MenuHost/Menu"));

const ErrorFallback = () => (
  <div>Something went wrong loading the component</div>
);

const LoadingFallback = () => (
  <div>Loading...</div>
);

const AppContainer = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingFallback />}>
        <Hero />
        <Menu />
      </Suspense>
    </ErrorBoundary>
  );
};

export default AppContainer;