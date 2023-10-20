import { useEffect, useState } from "react";
import styles from "./WishlistPage.module.css";
import axios from "axios";
import {
  getAuthHeaderConfig,
  getAuthHeaderConfigWithContent,
} from "../../utils/config";
import { BsStarFill } from "react-icons/bs";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const GetMyOrders = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchOrderHistory = async () => {
    const config = getAuthHeaderConfigWithContent();
    try {
      const res = await axios.get(
        `https://academics.newtonschool.co/api/v1/ecommerce/order/`,
        config
      );
      // console.log(res.data.data);
      if (res.data.status == "success") {
        // console.log(res.data);
        setCartItems(res.data.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const currentDate = new Date();

  const formattedDate = currentDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleOnClickView = (e) => {
    // let prodId = e.target.getAttribute("alt");
    let prodId = e.target.parentNode.getAttribute("id");
    navigate(`/productDetails/:brand/:subCategory/${prodId}`);
  };

  return (
    <div className={styles.parentContainer}>
      {!isLoading ? (
        <>
          <p className={styles.heading}>Order History</p>
          <div className={styles.cartProd}>
            {cartItems.map((ele, indx) => {
              return (
                <div key={indx} className={styles.orderContainerCard}>
                  <section className={styles.imgSect}>
                    <img
                      src={ele.order.items[0].product.displayImage}
                      alt={ele.order.items[0].product._id}
                    />
                  </section>
                  <section
                    id={ele.order.items[0].product._id}
                    className={styles.descrSect}
                  >
                    <p className={styles.prodName}>
                      {ele.order.items[0].product.name}
                    </p>
                    <p className={styles.prodId}>
                      Product Id:&nbsp;{ele.order.items[0].product._id}
                    </p>
                    <p className={styles.prodRating}>
                      {(Math.random() * (5.0 - 4.0) + 4.0).toFixed(1)}
                      <BsStarFill />
                    </p>
                    <div className={styles.priceSec}>
                      <p className={styles.prodPrice}>
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(ele.order.items[0].product.price)}
                        &nbsp;
                      </p>
                    </div>
                    <span className={styles.deliveryStat}>
                      ordered on {ele.createdAt.substring(0, 10)}
                    </span>
                    <span
                      className={styles.viewProd}
                      onClick={handleOnClickView}
                    >
                      View
                    </span>
                  </section>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div style={{ height: "500px", padding: "10rem" }}>
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="70"
            visible={true}
          />
        </div>
      )}
    </div>
  );
};
export default GetMyOrders;
