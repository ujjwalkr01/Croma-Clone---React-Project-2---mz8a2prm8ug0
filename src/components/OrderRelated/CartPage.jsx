import { useContext, useEffect, useState } from "react";
import styles from "./CartPage.module.css";
import { BsStarFill } from "react-icons/bs";
import OrderSummary from "./OrderSummary";
import { RotatingLines } from "react-loader-spinner";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  getAuthHeaderConfig,
  getAuthHeaderConfigWithContent,
} from "../../utils/config";
import { OrderCountCtx } from "../App";

function getRandomDate(startDate, endDate) {
  const startTimestamp = startDate.getTime();
  const endTimestamp = endDate.getTime();
  const randomTimestamp =
    startTimestamp + Math.random() * (endTimestamp - startTimestamp);
  return new Date(randomTimestamp);
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [randomDate, setRandomDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const { data } = location.state || {};

  const { setOrderId } = useContext(OrderCountCtx);

  const generateRandomDate = () => {
    const startDate = new Date("2023-10-18");
    const endDate = new Date("2023-12-31");
    const randomDate = getRandomDate(startDate, endDate);
    setRandomDate(randomDate);
  };

  const fetchCartData = async () => {
    const config = getAuthHeaderConfig();
    try {
      setIsLoading(true);
      const res = await axios.get(
        "https://academics.newtonschool.co/api/v1/ecommerce/cart",
        config
      );
      if (res.data.status == "success") {
        setCartItems(res.data.data.items);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    } catch (err) {
      console.error(err.response.data.message);
    }
  };

  useState(() => {
    document.body.style.backgroundColor = "rgb(240, 240, 240)";
  }, []);
  const deleteProductFromCart = async (prodId, data) => {
    const config = getAuthHeaderConfigWithContent();
    try {
      setIsLoading(true);
      const res = await axios.delete(
        `https://academics.newtonschool.co/api/v1/ecommerce/cart/${prodId}`,
        config,
        data
      );

      if (res.data.status == "success") {
        setCartItems(res.data.data.items);
        setOrderId(prodId);
        setTimeout(() => {
          setIsLoading(false);
        }, 200);
      } else {
        setTimeout(() => {
          setIsLoading(false);
        }, 200);
      }
    } catch (err) {
      console.error(err.response.data.message);
    }
  };

  useEffect(() => {
    if (data == undefined) {
      fetchCartData();
    } else {
      setIsLoading(true);
      setCartItems(data);
      setTimeout(() => {
        setIsLoading(false);
      }, 400);
    }

    generateRandomDate();
  }, [data]);

  const handleDeleteProd = (e) => {
    // console.log(e.target.parentNode.getAttribute("id"));
    let prodId = e.target.parentNode.getAttribute("id");
    let data = { quantity: 2 };

    deleteProductFromCart(prodId, data);
  };

  let sum = 0;
  const totalPrice = cartItems.map((ele) => {
    sum += ele.product.price;
    return ele;
  });

  return (
    <div className={styles.parentContainer}>
      {!isLoading ? (
        <>
          <h2>YOUR CART</h2>
          <div className={styles.cardContainer}>
            <div className={styles.cartProd}>
              <div className={styles.couponSect}>
                <div>%</div>
                <p>Apply Coupon</p>
              </div>

              {cartItems.map((ele, indx) => {
                return (
                  <div key={indx} className={styles.containerCard}>
                    <section className={styles.imgSect}>
                      <img
                        src={ele.product.displayImage}
                        alt={ele.product.name}
                      />
                    </section>
                    <section id={ele.product._id} className={styles.descrSect}>
                      <p className={styles.prodName}>{ele.product.name}</p>
                      <p className={styles.prodId} id="prodId">
                        Product Id:&nbsp;{ele.product._id}
                      </p>
                      <p className={styles.prodRating}>
                        {(Math.random() * (5.0 - 4.0) + 4.0).toFixed(1)}
                        <BsStarFill />
                      </p>
                      <p className={styles.prodPrice}>
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(ele.product.price)}
                        &nbsp;
                        <span>(Incl. all Taxes)</span>
                      </p>
                      <p className={styles.discountPrice}>
                        MRP:{" "}
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(
                          parseFloat(
                            Math.floor(
                              Math.random() *
                                (parseInt(ele.product.price) +
                                  12000 -
                                  parseInt(ele.product.price) +
                                  4000)
                            ) + parseInt(ele.product.price)
                          )
                        )}
                      </p>
                      <p className={styles.deliveryStat}>
                        Standard Delivery by{" "}
                        {randomDate ? `${randomDate.toDateString()}` : ""}
                      </p>
                      <button
                        className={styles.deleteProdBtn}
                        onClick={handleDeleteProd}
                      >
                        Remove
                      </button>
                    </section>
                  </div>
                );
              })}
            </div>

            <div className={styles.prodCheckOutDetails}>
              <div className={styles.deliveryDate}>
                <p>
                  Delivery options for <span>400049</span>
                </p>
                <div>
                  <img src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1637828583/Croma%20Assets/UI%20Assets/Standard_Delivery_White_Theme.svg" />
                  <span>
                    Standard Delivery by Fri,{" "}
                    {randomDate ? `${randomDate.toDateString()}` : ""}
                  </span>
                </div>
              </div>
              <OrderSummary
                totPrice={sum}
                totItem={cartItems.length}
                value={cartItems}
              />
            </div>
          </div>
        </>
      ) : (
        <div style={{ height: "500px", padding: "8rem" }}>
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="80"
            visible={true}
          />
        </div>
      )}
    </div>
  );
};
export default CartPage;
