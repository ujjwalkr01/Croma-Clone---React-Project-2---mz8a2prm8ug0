import styles from "./Authentication.module.css";
import { useState, useContext } from "react";
import Button from "./Button";
import { ModalCtx, SwitchModalCtx } from "../App";
import { getHeaderWithProjectId } from "../../utils/config";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

const SignUp = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [isErr, setIsErr] = useState(false);

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

  const postSignUpData = async (userInfo) => {
    userInfo.appType = "ecommerce";
    const config = getHeaderWithProjectId();
    try {
      setIsLoading(true);
      const resp = await axios.post(
        "https://academics.newtonschool.co/api/v1/user/signup",
        userInfo,
        config
      );

      if (resp.data.status == "success") {
        setIsLoading(false);
        setErrMsg("Account created succesffuly!");
      }
    } catch (err) {
      setIsErr(true);
      setIsLoading(false);
      setErrMsg(err.response.data.message);
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    postSignUpData(userInfo);
    setErrMsg("");
    setIsErr(false);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modalWindow}>
        <button className={styles["btn_close"]} onClick={handleCloseBtn}>
          &times;
        </button>
        <h1>Sign Up</h1>
        <hr />
        <form onSubmit={handleSignUp}>
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

          {!isLoading && !isErr && (
            <p className={styles.isSuccessfull}>{errMsg}</p>
          )}
          {!isLoading && isErr && <p className={styles.isErr}>{errMsg}</p>}

          {isLoading && (
            <p className={styles.loadingState}>
              <ThreeDots
                height="50"
                width="50"
                radius="9"
                color="#4fa94d"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            </p>
          )}

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
