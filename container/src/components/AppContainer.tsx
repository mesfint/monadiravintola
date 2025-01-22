import { lazy, Suspense } from "react";


const Hero = lazy(() => import("MenuListHost/Hero"));
const BookTable = lazy(() => import("BookTableHost/BookTable"));
const FeedBackList = lazy(() => import("FeedbackHost/FeedBackList"));

const AppContainer = () => {
  return (
    <>
    
    <Suspense fallback={<div>Loading Menu...</div>}>
      <Hero />
      <BookTable />
      <FeedBackList />
    </Suspense>
    
    
    
    </>
  );
};

export default AppContainer;
