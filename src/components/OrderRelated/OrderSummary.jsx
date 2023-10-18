import styles from "./CartPage.module.css";

const OrderSummary = ({ totPrice, totItem }) => {
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
        <span>
          {new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(totPrice)}
        </span>
      </p>
      <button>Checkout</button>

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
