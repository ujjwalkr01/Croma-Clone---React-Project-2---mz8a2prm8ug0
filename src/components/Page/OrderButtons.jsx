// import styles from "./ProductInfo.module.css";
import { useContext } from "react";
import { getAuthHeaderConfig, getToken } from "../../utils/config";
import { ModalCtx } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OrderButtons = ({ prodId }) => {
  const { setShowModal } = useContext(ModalCtx);
  const navigate = useNavigate();

  const addProductToCart = async (data) => {
    const config = getAuthHeaderConfig();
    try {
      const res = await axios.patch(
        `https://academics.newtonschool.co/api/v1/ecommerce/cart/${prodId}`,
        data,
        config
      );
      console.log(res);
    } catch (err) {
      // console.error(err.response.data.message);
    }
  };
  const handleBuyNow = () => {
    const token = getToken();
    if (token) {
      let data = { quantity: 2 };
      addProductToCart(data);
      navigate("/cart");
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <button onClick={handleBuyNow}>Buy Now</button>
      <button onClick={handleBuyNow}>Add To Cart</button>
    </>
  );
};
export default OrderButtons;
