import { useContext, useState } from "react";
import { ProductIdDataCtx } from "../App";
import "./ProductInfo.css";

const ProductInfo = (props) => {
  const [selectedProduct, setSelectedProduct] = useState({});
  const { productId, setProductId } = useContext(ProductIdDataCtx);

  console.log(productId);
  const handleSelectedProduct = (product) => {
    console.log(product.id);
  };

  console.log(props);
  return (
    <div className="parent">
      <p>Product data page</p>
    </div>
  );
};

export default ProductInfo;
