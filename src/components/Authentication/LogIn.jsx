import styles from "./Authentication.module.css";
import { useContext, useState, useEffect } from "react";
import Button from "./Button";
import { ModalCtx, SwitchModalCtx } from "../App";

const LogIn = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const { setShowModal, showModal } = useContext(ModalCtx);
  const { setSwitchModal } = useContext(SwitchModalCtx);

  const handleUserInput = (event) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleCloseBtn = () => {
    setShowModal(false);
  };

  const handleSwitchModal = () => {
    setSwitchModal(true);
  };

  useEffect(() => {
    if (showModal) {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.querySelector("body").style.overflow = "unset";
    }
  }, [showModal]);

  return (
    <div className={styles.overlay}>
      <div className={styles.modalWindow}>
        <button className={styles["btn_close"]} onClick={handleCloseBtn}>
          &times;
        </button>
        <h1>Log In</h1>
        <hr />
        <form>
          <input
            className={styles.emailInp}
            type="text"
            placeholder="Enter your email"
            name="email"
            value={userInfo.email}
            onChange={handleUserInput}
          />
          <br />
          <input
            className={styles.passInp}
            type="password"
            placeholder="Enter your password"
            name="password"
            value={userInfo.password}
            onChange={handleUserInput}
          />

          <p className={styles.terms}>
            By continuing you agree to our <span>Terms</span> of Use &{" "}
            <span>Privacy Policy</span>
          </p>

          <p>ErrMsg</p>

          <Button />

          <p className={styles.switchSignUpPage}>
            New to Croma? <span onClick={handleSwitchModal}>Sign Up</span>
          </p>
        </form>
      </div>
    </div>
  );
};
export default LogIn;
