import { useContext, useEffect, useState } from "react";
import styles from "./WishlistPage.module.css";
import { RotatingLines } from "react-loader-spinner";
import {
  getAuthHeaderConfig,
  getAuthHeaderConfigWithContent,
} from "../../utils/config";
import axios from "axios";
import { BsStarFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { OrderCountCtx } from "../App";

const MyWishlistPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // fetching the wishlist data....
  const fetchWishListProd = async () => {
    const config = getAuthHeaderConfig();
    try {
      setIsLoading(true);
      const res = await axios.get(
        "https://academics.newtonschool.co/api/v1/ecommerce/wishlist/",
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

  useEffect(() => {
    fetchWishListProd();
  }, []);

  //deleing the product from wishlist....
  const removeProductFromWishlist = async (prodId, data) => {
    const config = getAuthHeaderConfigWithContent();
    try {
      setIsLoading(true);
      const res = await axios.delete(
        `https://academics.newtonschool.co/api/v1/ecommerce/wishlist/${prodId}`,
        config,
        data
      );

      if (res.data.status == "success") {
        setCartItems(res.data.data.items);
        setTimeout(() => {
          setIsLoading(false);
        }, 200);
      }
    } catch (err) {
      console.error(err.response.data.message);
    }
  };
  const handleDeleteWishlistProd = (e) => {
    let prodId = e.target.parentNode.parentNode.getAttribute("id");
    let data = { quantity: 2 };
    removeProductFromWishlist(prodId, data);
  };

  const handleOnClickImg = (e) => {
    let prodId = e.target.getAttribute("alt");
    navigate(`/productDetails/:brand/:subCategory/${prodId}`);
  };
  const { setOrderId } = useContext(OrderCountCtx);
  // moving wishlist item to cart...
  const addProductToCart = async (prodId, data) => {
    const config = getAuthHeaderConfig();
    try {
      const res = await axios.patch(
        `https://academics.newtonschool.co/api/v1/ecommerce/cart/${prodId}`,
        data,
        config
      );
      // console.log(res.data);
      sessionStorage.setItem("noOfItems", res.data.data.items.length);
      navigate({ state: { data: res.data.data.items } });
      setOrderId(prodId);
      alert(res.data.message);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleOnClickAddCart = (e) => {
    let prodId = e.target.parentNode.parentNode.getAttribute("id");
    let data = { quantity: 2 };
    addProductToCart(prodId, data);
    removeProductFromWishlist(prodId, data);
  };

  return (
    <div className={styles.parentContainer}>
      {!isLoading ? (
        <>
          <p className={styles.heading}>My Wishlist</p>
          <div className={styles.cartProd}>
            {cartItems.map((ele, indx) => {
              return (
                <div
                  key={indx}
                  className={styles.containerCard}
                  id={ele.products.brand}
                >
                  <section
                    className={styles.imgSect}
                    id={ele.products.subCategory}
                  >
                    <img
                      src={ele.products.displayImage}
                      alt={ele.products._id}
                      onClick={handleOnClickImg}
                    />
                  </section>
                  <section id={ele.products._id} className={styles.descrSect}>
                    <p className={styles.prodName}>{ele.products.name}</p>
                    <p className={styles.prodId}>
                      Product Id:&nbsp;{ele.products._id}
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
                        }).format(ele.products.price)}
                        &nbsp;
                        <span className={styles.discountPrice}>
                          MRP:{" "}
                          {new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                          }).format(
                            parseFloat(
                              Math.floor(
                                Math.random() *
                                  (parseInt(ele.products.price) +
                                    12000 -
                                    parseInt(ele.products.price) +
                                    4000)
                              ) + parseInt(ele.products.price)
                            )
                          )}
                        </span>
                      </p>
                    </div>
                    <div className={styles.btns}>
                      <button
                        className={styles.deleteProdBtn}
                        onClick={handleDeleteWishlistProd}
                      >
                        Remove
                      </button>
                      <button
                        className={styles.addCartProdBtn}
                        onClick={handleOnClickAddCart}
                      >
                        Add To Cart
                      </button>
                    </div>
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

export default MyWishlistPage;
