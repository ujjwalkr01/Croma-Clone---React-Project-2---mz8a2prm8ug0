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
      console.log(res.data.data[0].order.items);
      if (res.data.status == "success") {
        setCartItems(res.data.data[0].order.items);
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

  const handleOnClickImg = (e) => {
    let prodId = e.target.getAttribute("alt");
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
                <div key={indx} className={styles.containerCard}>
                  <section className={styles.imgSect}>
                    <img
                      src={ele.product.displayImage}
                      alt={ele.product._id}
                      onClick={handleOnClickImg}
                    />
                  </section>
                  <section id={ele.product._id} className={styles.descrSect}>
                    <p className={styles.prodName}>{ele.product.name}</p>
                    <p className={styles.prodId}>
                      Product Id:&nbsp;{ele.product._id}
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
                        }).format(ele.product.price)}
                        &nbsp;
                      </p>
                    </div>
                    <span className={styles.deliveryStat}>
                      ordered on {formattedDate}
                    </span>
                    <span className={styles.viewProd}>View</span>
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
