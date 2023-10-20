import styles from "./ProductList.module.css";

const DefaultPage = () => {
  return (
    <div
      className={styles.errorMsg}
      style={{
        color: "white",
        marginTop: "6rem",
        fontSize: "24px",
        fontWeight: "700",
      }}
    >
      <p>404 Not Found</p>
      <img src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1638949344/Croma%20Assets/CMS/LP%20Page%20Banners/3828539-ai_1_77_ujluyw.png" />
      <p>We couldn't find any matches!</p>
    </div>
  );
};

export default DefaultPage;
