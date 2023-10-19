import styles from "./MyAccountPage.module.css";
import { CgProfile } from "react-icons/cg";
import { BsBoxSeam } from "react-icons/bs";
import { BiHeart } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const MyAccountPage = () => {
  const navigate = useNavigate();

  const handleDisplayWishlist = () => {
    navigate("/my-account/wishlist");
  };

  return (
    <div className={styles.parentContainer}>
      <p className={styles.heading}>My Account</p>

      <div className={styles.cardContainer}>
        <div className={styles.profileSect}>
          <div className={styles.logo}>
            <CgProfile />
          </div>
          <div className={styles.text}>
            <p>My Profile</p>
            <p>Edit your profile,Reset Password</p>
          </div>
        </div>

        <div className={styles.profileSect}>
          <div className={styles.logo}>
            <BsBoxSeam />
          </div>
          <div className={styles.text}>
            <p>My Orders</p>
            <p>View,track,cancel orders and buy again</p>
          </div>
        </div>

        <div className={styles.profileSect} onClick={handleDisplayWishlist}>
          <div className={styles.logo}>
            <BiHeart />
          </div>
          <div className={styles.text}>
            <p>My Wishlist</p>
            <p>Have a look at your favourite products</p>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};
export default MyAccountPage;
