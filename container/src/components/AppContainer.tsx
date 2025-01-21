import { lazy, Suspense } from "react";


const MenuList = lazy(() => import("MenuListHost/MenuList"));
const BookTable = lazy(() => import("BookTableHost/BookTable"));
const FeedBackList = lazy(() => import("FeedbackHost/FeedBackList"));

const AppContainer = () => {
  return (
    <>
    
    <Suspense fallback={<div>Loading Menu...</div>}>
      <MenuList />
      <BookTable />
      <FeedBackList />
    </Suspense>
    
    
    
    </>
  );
};

export default AppContainer;
