import { lazy, Suspense } from "react";

const MenuList = lazy(() => import("MenuListHost/MenuList"));
const BookTable = lazy(() => import("BookTableHost/BookTable"));

const AppContainer = () => {
  return (
    <Suspense fallback={<div>Loading Menu...</div>}>
      <MenuList />
      <BookTable />
    </Suspense>
  );
};

export default AppContainer;
