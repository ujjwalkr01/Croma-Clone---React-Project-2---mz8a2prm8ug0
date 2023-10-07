import { createContext, useContext, useState } from "react";

const ProductInfoContext = createContext();

export const ProductInfoProvider = ({ children }) => {
  const [selectProduct, setSelectProduct] = useState({});
  const [selectProductName, setSelectProductName] = useState([]);

  return (
    <ProductInfoContext.Provider
      value={{
        selectProduct,
        setSelectProduct,
        selectProductName,
        setSelectProductName,
      }}
    >
      {children}
    </ProductInfoContext.Provider>
  );
};

export const useProduct = () => {
  return useContext(ProductInfoContext);
};
