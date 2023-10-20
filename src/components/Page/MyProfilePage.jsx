import styles from "./MyProfilePage.module.css";

const MyProfilePage = () => {
  return (
    <div className={styles.parentContainer}>
      <p className={styles.heading1}>My Profile</p>
      <form className={styles.formContainer}>
        <div className={styles.firstSec}>
          <label htmlFor="password" className={styles.text1}>
            Name
          </label>
          <br />
          <input
            className={styles.userNameInp1}
            type="text"
            name="name"
            value={sessionStorage.getItem("name")}
            required
          />
          <br />
          <label htmlFor="password" className={styles.text1}>
            Email
          </label>
          <br />
          <input
            className={styles.emailInp1}
            type="email"
            name="email"
            value={sessionStorage.getItem("email")}
            required
          />
          <br />
          <label htmlFor="password" className={styles.text1}>
            Password
          </label>
          <br />
          <input
            className={styles.passInp1}
            type="password"
            name="password"
            placeholder="Enter your password"
            //   value={userInfo.password}
            required
          />
        </div>

        <div className={styles.secSec}>
          <label htmlFor="password" className={styles.text1}>
            Date of Birth
          </label>
          <br />
          <input
            className={styles.userNameInp1}
            type="date"
            name="name"
            placeholder="DD/MM/YYYY"
          />
          <br />
          <label htmlFor="password" className={styles.text1}>
            Mobile Number
          </label>
          <br />
          <input
            className={styles.emailInp1}
            type="number"
            name="email"
            value={sessionStorage.getItem("mobile")}
          />
          <br />
        </div>
      </form>
    </div>
  );
};
export default MyProfilePage;
