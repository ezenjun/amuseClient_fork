import { createContext, useContext, useEffect, useState } from "react";

interface Props {
  children: React.ReactElement;
}

type CategoryData = {
  categoriesInfo?: Array<any>;
  setCategoriesInfo?: any;
};

const CategoryContext = createContext<CategoryData>({});

export function CategoryContextProvider({ children }: Props) {
  const [categoriesInfo, setCategoriesInfo] = useState<Array<any>>([]);

  useEffect(() => {
    // setOrderData({ ...orderData, totalPrice: location.state.totalPrice });
  }, []);

  return (
    <CategoryContext.Provider
      value={{ categoriesInfo, setCategoriesInfo, }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategoryContext() {
  return useContext(CategoryContext);
}
