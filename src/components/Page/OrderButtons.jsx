import { useContext, useState } from "react";
import { getAuthHeaderConfig, getToken } from "../../utils/config";
import { ModalCtx, OrderCountCtx } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OrderButtons = ({ prodId }) => {
  const { setShowModal } = useContext(ModalCtx);
  const { setOrderId } = useContext(OrderCountCtx);

  const navigate = useNavigate();

  const addProductToCart = async (data, btnName) => {
    const config = getAuthHeaderConfig();
    try {
      const res = await axios.patch(
        `https://academics.newtonschool.co/api/v1/ecommerce/cart/${prodId}`,
        data,
        config
      );
      // console.log(res.data);

      if (res.data.status == "success" && btnName == "buyNowBtn") {
        sessionStorage.setItem("noOfItems", res.data.data.items.length);
        // setOrderId(prodId);
        navigate("/cartSec", {
          state: { data: res.data.data.items, Id: prodId },
        });
      } else if (res.data.status == "success" && btnName == "cartBtn") {
        sessionStorage.setItem("noOfItems", res.data.data.items.length);
        setOrderId(prodId);
        navigate({ state: { data: res.data.data.items, Id: prodId } });
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  const handleBuyNow = (e) => {
    console.log(e.target.id);
    const token = getToken();
    if (token) {
      let data = { quantity: 2 };

      addProductToCart(data, e.target.id);
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <button id="buyNowBtn" onClick={handleBuyNow}>
        Buy Now
      </button>

      <button id="cartBtn" onClick={handleBuyNow}>
        Add To Cart
      </button>
    </>
  );
};
export default OrderButtons;
