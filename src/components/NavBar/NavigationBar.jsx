import { useContext, useEffect, useState } from "react";
import styles from "./NavigationBar.module.css";
import { FaShoppingCart } from "react-icons/fa";
import { BsList, BsPersonFill } from "react-icons/bs";
import SearchInput from "./SearchInput";
import { useNavigate, useLocation } from "react-router-dom";
import { ModalCtx, OrderCountCtx } from "../App";
import AuthModal from "../Authentication/AuthModal";
import {
  getAuthHeaderConfig,
  getCntCartItem,
  getToken,
} from "../../utils/config";
import axios from "axios";

const NavigationBar = () => {
  // const [displayMenu, setDisplayMenu] = useState(false);
  const [noOfItem, setnoOfItem] = useState(0);
  const { setShowModal } = useContext(ModalCtx);
  const { orderId } = useContext(OrderCountCtx);

  const navigate = useNavigate();
  const token = getToken();
  const cntItem = getCntCartItem();

  const location = useLocation();
  const { data, Id } = location.state || {};

  const fetchCartCount = async () => {
    const config = getAuthHeaderConfig();
    try {
      const res = await axios.get(
        "https://academics.newtonschool.co/api/v1/ecommerce/cart",
        config
      );

      if (res.data.status == "success") {
        setnoOfItem(res.data.data.items.length);
        if (res.data.data.items.length == 0) {
          setnoOfItem(0);
        }
      }
    } catch (err) {
      console.error(err.response.data.message);
    }
  };

  const handleAuth = () => {
    if (!token) {
      setShowModal(true);
      return;
    } else {
      navigate("/my-account");
    }
  };

  useEffect(() => {
    if (token && data == undefined) {
      fetchCartCount();
    }
    setnoOfItem(cntItem);
  }, [token, data, orderId]);

  const handleCartClick = () => {
    if (!token) {
      setShowModal(true);
      return;
    }
    navigate("/cartSec");
  };

  return (
    <nav className={styles.parentContainer}>
      <img
        className={styles.logoImg}
        src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1637759004/Croma%20Assets/CMS/Category%20icon/Final%20icon/Croma_Logo_acrkvn.svg"
        alt="cromaLogo"
        onClick={() => {
          navigate("/");
        }}
      />
      <button className={styles.menuBtn}>
        <BsList className={styles.menuBar} />
        <p>Menu</p>
      </button>

      <SearchInput />

      <BsPersonFill className={styles.account} onClick={handleAuth} />

      {!token && <AuthModal />}

      <div className={styles.shoppingCart} onClick={handleCartClick}>
        <FaShoppingCart className={styles.cart} />
        <p>{noOfItem}</p>
      </div>
    </nav>
  );
};

export default NavigationBar;
