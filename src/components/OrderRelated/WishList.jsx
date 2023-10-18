import { BiHeart } from "react-icons/bi";
import styles from "../Deals/Deals.module.css";
import axios from "axios";
import { getAuthHeaderConfig, getToken } from "../../utils/config";
import { useContext } from "react";
import { ModalCtx } from "../App";

const WishList = (props) => {
  const { setShowModal } = useContext(ModalCtx);

  const wishListProduct = async (data, e) => {
    const config = getAuthHeaderConfig();
    try {
      const res = await axios.patch(
        "https://academics.newtonschool.co/api/v1/ecommerce/wishlist/",
        data,
        config
      );
      if (res.data.status == "success") {
        e.style.color = "rgb(7, 233, 158)";
        alert(res.data.message);
      }
    } catch (err) {
      alert(err.response.data.message);
      e.style.color = "rgb(7, 233, 158)";
    }
  };

  const handleWishList = (e) => {
    const token = getToken();

    if (token) {
      let data = { productId: props.value };
      wishListProduct(data, e.target);
    } else {
      setShowModal(true);
    }
  };

  let setStyle;
  if (props.name == "prodInfo") {
    setStyle = props.classStyles;
  } else if (props.name == "prodList") {
    setStyle = props.classStyle;
  } else {
    setStyle = styles.wishList;
  }

  return (
    <>
      <BiHeart className={setStyle} onClick={handleWishList} />
    </>
  );
};
export default WishList;
