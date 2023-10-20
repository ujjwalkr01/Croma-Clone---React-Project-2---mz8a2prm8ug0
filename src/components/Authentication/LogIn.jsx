import styles from "./Authentication.module.css";
import { useContext, useState, useEffect } from "react";
import Button from "./Button";
import { ModalCtx, SwitchModalCtx } from "../App";
import axios from "axios";
import { getHeaderWithProjectId } from "../../utils/config";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

const LogIn = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const { setShowModal, showModal } = useContext(ModalCtx);
  const { setSwitchModal } = useContext(SwitchModalCtx);
  const [errMsg, setErrMsg] = useState("");
  const [isErr, setIsErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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

  const fetchLogInData = async (userInfo) => {
    userInfo.appType = "ecommerce";
    const config = getHeaderWithProjectId();
    try {
      setIsLoading(true);
      const resp = await axios.post(
        "https://academics.newtonschool.co/api/v1/user/login",
        userInfo,
        config
      );

      if (resp.data.status == "success") {
        sessionStorage.setItem("authToken", resp.data.token);
        sessionStorage.setItem("name", resp.data.data.name);
        sessionStorage.setItem("email", resp.data.data.email);
        sessionStorage.setItem(
          "mobile",
          Math.floor(Math.random() * (1000000000 - 9999999999)) + 9999999999
        );


        setIsLoading(false);
        setErrMsg("Logged In Successfully!");
        setTimeout(() => {
          setShowModal(false);
          navigate("/logIn/user/true");
        }, 2800);
      }
    } catch (err) {
      setIsErr(true);
      setIsLoading(false);
      setErrMsg(err.response.data.message);
    }
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    fetchLogInData(userInfo);
    setErrMsg("");
    setIsErr(false);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modalWindow}>
        <button className={styles["btn_close"]} onClick={handleCloseBtn}>
          &times;
        </button>
        <h1>Log In</h1>
        <hr />
        <form onSubmit={handleLogIn}>
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
            New to Croma? <span onClick={handleSwitchModal}>Sign Up</span>
          </p>
        </form>
      </div>
    </div>
  );
};
export default LogIn;
