import styles from "./Authentication.module.css";
import { useState, useContext } from "react";
import Button from "./Button";
import { ModalCtx, SwitchModalCtx } from "../App";

const SignUp = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { setShowModal } = useContext(ModalCtx);
  const { setSwitchModal } = useContext(SwitchModalCtx);

  const handleUserInput = (event) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleCloseBtn = () => {
    setShowModal(false);
    setSwitchModal(false);
  };

  const handleSwitchModal = () => {
    setSwitchModal(false);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modalWindow}>
        <button className={styles["btn_close"]} onClick={handleCloseBtn}>
          &times;
        </button>
        <h1>Sign Up</h1>
        <hr />
        <form>
          <input
            className={styles.userNameInp}
            type="text"
            name="name"
            placeholder="Enter your name"
            value={userInfo.name}
            onChange={handleUserInput}
            required
          />
          <br />
          <input
            className={styles.emailInp}
            type="email"
            name="email"
            placeholder="Enter your email"
            value={userInfo.email}
            onChange={handleUserInput}
            required
          />
          <br />
          <input
            className={styles.signUpPassInp}
            type="password"
            name="password"
            placeholder="Enter your password"
            value={userInfo.password}
            onChange={handleUserInput}
            required
          />

          <p className={styles.terms}>
            By continuing you agree to our <span>Terms</span> of Use &{" "}
            <span>Privacy Policy</span>
          </p>

          <p>ErrMsg</p>

          <Button />

          <p className={styles.switchSignUpPage}>
            Already a user? <span onClick={handleSwitchModal}>Log In</span>
          </p>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
