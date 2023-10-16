import { useState } from "react";
import styles from "./NavigationBar.module.css";
import { FaShoppingCart } from "react-icons/fa";
import { BsList, BsPersonFill } from "react-icons/bs";
import SearchInput from "./SearchInput";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const navigate = useNavigate();

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

      <BsPersonFill className={styles.account} />

      <div className={styles.shoppingCart}>
        <FaShoppingCart className={styles.cart} />
        <p>0</p>
      </div>
    </nav>
  );
};

export default NavigationBar;
