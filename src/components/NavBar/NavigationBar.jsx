import { useContext, useEffect, useState } from "react";
import styles from "./NavigationBar.module.css";
import { FaShoppingCart } from "react-icons/fa";
import { BsList, BsPersonFill } from "react-icons/bs";
import SearchInput from "./SearchInput";
import { useNavigate, useLocation } from "react-router-dom";
import { ModalCtx } from "../App";
import AuthModal from "../Authentication/AuthModal";
import { getCntCartItem, getToken } from "../../utils/config";

const NavigationBar = () => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const [noOfItem, setnoOfItem] = useState(0);
  const { showModal, setShowModal } = useContext(ModalCtx);

  const navigate = useNavigate();
  const token = getToken();
  const cntItem = getCntCartItem();

  const location = useLocation();
  const { data } = location.state || {};
  // console.log(data);

  const handleAuth = () => {
    if (!token) {
      setShowModal(true);
    }
  };

  useEffect(() => {
    setnoOfItem(cntItem);
  });

  const handleCartClick = () => {
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
        <BsList
          className={styles.menuBar}
          onClick={() => setDisplayMenu(!displayMenu)}
        />
        <p>Menu</p>
      </button>

      <SearchInput />

      <BsPersonFill className={styles.account} onClick={handleAuth} />

      {!token && <AuthModal />}

      <div className={styles.shoppingCart}>
        <FaShoppingCart className={styles.cart} onClick={handleCartClick} />
        <p>{noOfItem}</p>
      </div>
    </nav>
  );
};

export default NavigationBar;
