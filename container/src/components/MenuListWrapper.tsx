import { lazy, Suspense } from "react";

const MenuList = lazy(() => import("MenuListHost/MenuList"));

const MenuListWrapper = () => {
  return (
    <Suspense fallback={<div>Loading Menu...</div>}>
      <MenuList />
    </Suspense>
  );
};

export default MenuListWrapper;
