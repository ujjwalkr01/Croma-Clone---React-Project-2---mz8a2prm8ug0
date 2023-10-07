import { useState } from "react";

const ProductInfo = (props) => {
  const [selectedProduct, setSelectedProduct] = useState({});

  const handleSelectedProduct = (product) => {
    console.log(product);
  };

  console.log(props);
  return (
    <div>
      
    </div>
  );
};

export default ProductInfo;
