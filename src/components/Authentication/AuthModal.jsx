import SignUp from "./SignUp";
import LogIn from "./LogIn";
import { useContext } from "react";
import { ModalCtx, SwitchModalCtx } from "../App";

const AuthModal = () => {
  const { showModal } = useContext(ModalCtx);
  const { switchModal } = useContext(SwitchModalCtx);

  return (
    <>
      {showModal && !switchModal && <LogIn />}
      {showModal && switchModal && <SignUp />}
    </>
  );
};
export default AuthModal;
