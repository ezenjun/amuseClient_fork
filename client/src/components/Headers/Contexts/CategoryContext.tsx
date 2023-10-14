import { createContext, useContext, useEffect, useState } from "react";
import { IProps } from "../../../interfaces/PropsInterfaces";
import { CategoryInfoData } from "../../../types/DataTypes";

const CategoryContext = createContext<CategoryInfoData>({});

export function CategoryContextProvider({ children }: IProps) {
  const [categoriesInfo, setCategoriesInfo] = useState<Array<any>>([]);

  useEffect(() => {
    // setOrderData({ ...orderData, totalPrice: location.state.totalPrice });
  }, []);

  return (
    <CategoryContext.Provider value={{ categoriesInfo, setCategoriesInfo }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategoryContext() {
  return useContext(CategoryContext);
}
