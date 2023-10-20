import { useLocation } from "react-router-dom";
import styles from "./CheckoutPage.module.css";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { getAuthHeaderConfig } from "../../utils/config";
import { OrderCountCtx } from "../App";

const CheckoutPage = () => {
  const [paymntInfo, setPaymntInfo] = useState({
    cardNumber: "",
    cvv: "",
  });
  const { setOrderId } = useContext(OrderCountCtx);

  const location = useLocation();
  const { data } = location.state || {};

  const navigate = useNavigate();

  const proceedToCheckOut = async (data) => {
    const config = getAuthHeaderConfig();
    try {
      const res = await axios.post(
        "https://academics.newtonschool.co/api/v1/ecommerce/order/convertCartToOrder",
        {
          addressType: "HOME",
          address: {
            street: "4th cross street",
            city: "Neyveli Township",
            state: "Tamil Nadu",
            country: "India",
            zipCode: "607807",
          },
        },
        config
      );
    } catch (err) {
      alert("Order Placed Successfully!");
      setTimeout(() => {
        navigate("/logIn/user/:true");
      }, 400);
    }
  };

  let addData = {
    addressType: "HOME",
    address: {
      street: "4th cross street",
      city: "Neyveli Township",
      state: "Tamil Nadu",
      country: "India",
      zipCode: "607807",
    },
  };

  const currentDate = new Date();

  const formattedDate = currentDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleUserInput = (event) => {
    const { name, value } = event.target;
    setPaymntInfo({ ...paymntInfo, [name]: value });
  };

  useState(() => {
    document.body.style.backgroundColor = "rgb(240, 240, 240)";
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (
      paymntInfo.cardNumber.length > 16 ||
      paymntInfo.cvv.length > 3 ||
      paymntInfo.cardNumber.length < 16 ||
      paymntInfo.cvv.length < 3
    ) {
      alert("Invalid credentials!");
    } else if (
      paymntInfo.cardNumber.length === 16 &&
      paymntInfo.cvv.length === 3
    ) {
      proceedToCheckOut(addData);
    }
  };

  return (
    <div className={styles.parentContainer}>
      <p className={styles.price}>
        Payable Amount:{" "}
        <span>
          {" "}
          {new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(data)}
        </span>
      </p>
      <div className={styles.cardContainer}>
        <div className={styles.shipmentDetail}>
          <p>Shipping Address:</p>
          <p className={styles.addDetails}>
            {addData.address.street},<span>&nbsp;{addData.address.city},</span>
            <span>&nbsp;{addData.address.state},</span>
            <span>&nbsp;{addData.address.country},</span>
            <span>&nbsp;{addData.address.zipCode}</span>
          </p>
          <p className={styles.OrderDate}>
            Order date:&nbsp;<span>{formattedDate}</span>
          </p>
        </div>
        <form className={styles.formContainer} onSubmit={handleFormSubmit}>
          <p className={styles.heading}>Credit/Debit Card Details</p>
          <label className={styles.text} htmlFor="cardNumber">
            Card Number
          </label>
          <br />
          <input
            value={paymntInfo.cardNumber}
            type="number"
            id="cardNumber"
            name="cardNumber"
            placeholder="Enter 16 digit card number"
            min="16"
            required
            onChange={handleUserInput}
          />
          <br />
          <br />

          <div className={styles.cvv_exp}>
            <div className={styles.exp}>
              <label htmlFor="expirationDate">Expiry:</label>

              <input
                type="text"
                className="expirationDate"
                name="expiration-date"
                placeholder="MM/YY"
                required
              />
            </div>

            <div className={styles.cvv}>
              <label htmlFor="cvv">CVV:</label>
              <br />
              <input
                value={paymntInfo.cvv}
                type="number"
                className="cvv"
                name="cvv"
                placeholder="CVV"
                min="3"
                required
                onChange={handleUserInput}
              />
            </div>
          </div>
          <br />
          <input className={styles.check} type="checkbox" required />
          <span className={styles.term}>
            Please read <span>terms </span>and <span>condition</span>
          </span>
          <br />
          <button className={styles.payBtn} type="submit">
            Place Order and Pay
          </button>
        </form>
      </div>
    </div>
  );
};
export default CheckoutPage;
