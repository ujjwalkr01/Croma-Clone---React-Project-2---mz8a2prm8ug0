import axios from "axios";
import { getAuthHeaderConfig } from "../../utils/config";
import styles from "./CartPage.module.css";
import { useNavigate } from "react-router-dom";

const OrderSummary = ({ totPrice, totItem, value }) => {
  const navigate = useNavigate();

  const proceedToCheckOut = async (data) => {
    const config = getAuthHeaderConfig();
    try {
      const res = await axios.post(
        "https://academics.newtonschool.co/api/v1/ecommerce/order/convertCartToOrder",
        data,
        config
      );
      // console.log(res.data.data.shipmentDetails.address);
      if (res.data.status == "success" && totItem > 0) {
        navigate("/checkout/payment", {
          state: {
            data: totPrice,
          },
        });
      }
    } catch (err) {
      console.error(err.response.data.message);
    }
  };

  const handleCheckoutPage = () => {
   
    let data = {
      addressType: "HOME",
      address: {
        street: "4th cross street",
        city: "Neyveli Township",
        state: "Tamil Nadu",
        country: "India",
        zipCode: "607807",
      },
    };

    // console.log(data);
    if (totItem > 0) {
      proceedToCheckOut(data);
    } else {
      alert("Cart is empty!");
    }
  };

  return (
    <div className={styles.orderSummary}>
      <p>Order Summary ( {totItem} items )</p>
      <p>
        Original Price{" "}
        <span>
          {new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(totPrice)}
        </span>
      </p>
      <p>
        Delivery <span>Free</span>
      </p>
      <p>
        Total{" "}
        <span className={styles.totalPrice}>
          {new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(totPrice)}
        </span>
      </p>
      <button onClick={handleCheckoutPage}>Checkout</button>

      <div className={styles.cartLogo}>
        <div>
          <img src="https://images.bewakoof.com/web/cart-badge-trust.svg" />

          <img src="https://images.bewakoof.com/web/cart-easy-return.svg" />

          <img src="https://images.bewakoof.com/web/quality-check.svg" />
        </div>
        <div>
          <p className={styles.text}>100% SECURE PAYMENTS</p>
          <p className={styles.text}>EASY RETURNS & QUICK REFUNDS</p>
          <p className={styles.text}>QUALITY ASSURANCE</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
