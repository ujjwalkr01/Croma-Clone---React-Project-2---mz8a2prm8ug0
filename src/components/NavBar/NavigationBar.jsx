import { useState } from "react";
import styles from "./NavigationBar.module.css";
import { slide as Menu } from "react-burger-menu";
import { BsList, BsPersonFill, BsFillCartFill } from "react-icons/bs";
import SearchInput from "./SearchInput";

const NavigationBar = () => {
  const [displayMenu, setDisplayMenu] = useState(false);

  return (
    <nav className={styles.parentContainer}>
      <img
        className={styles.logoImg}
        src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1637759004/Croma%20Assets/CMS/Category%20icon/Final%20icon/Croma_Logo_acrkvn.svg"
        alt="cromaLogo"
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

      <BsFillCartFill className={styles.cart}/>
    </nav>
  );
};

export default NavigationBar;
