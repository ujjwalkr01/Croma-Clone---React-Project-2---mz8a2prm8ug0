import styles from "./Footer.module.css";
import { BsYoutube, BsGithub, BsLinkedin } from "react-icons/bs";

const Footer = () => {
  return (
    <div className={styles.parentContainer}>
      <div className={styles.sect1}>
        <p>CONNECT WITH US</p>
        <input type="email" placeholder="Enter Email ID" />

        <div className={styles.socialLink}>
          <BsYoutube />
          <BsGithub />
          <BsLinkedin />
        </div>
        <p>© Copyright 2023 Croma. All rights reserved</p>
      </div>
      <div className={styles.sect2}>
        <p>FAQs</p>
        <p>Buying Guide</p>
        <p>Return Policy</p>
        <p>B2B Orders</p>
        <p>Store Locator</p>
      </div>
      <div className={styles.sect3}>
        <div>
          <p>USEFUL LINKS</p>
          <p>About Croma</p>
          <p>Help And Support</p>
        </div>
      </div>
      {/* <div className={styles.sect4}>
        <div>
          <p>E-Waste</p>
          <p>Franchise Opportunity</p>
          <p>Site Map</p>
          <p>Careers At Croma</p>
          <p>Terms Of Use</p>
          <p>Disclaimer</p>
          <p>Privacy Policy</p>
          <p>Gift Card</p>
        </div>
      </div> */}
    </div>
  );
};
export default Footer;
