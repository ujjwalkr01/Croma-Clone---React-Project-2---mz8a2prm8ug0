import React, { useContext, useEffect, useState } from "react";
import styles from "./ProductInfo.module.css";
import { getHeaderWithProjectId } from "../../utils/config";
import axios from "axios";
import { BiHeart } from "react-icons/bi";
import SliderInfo from "../Slider/SliderInfo";
import { useParams } from "react-router-dom";
import { ModalCtx } from "../App";
import WishList from "../OrderRelated/WishList";

const ProductInfo = () => {
  const [selectedProduct, setSelectedProduct] = useState({});
  const [productImg, setProductImg] = useState([]);
  const [prodFeature, setProductFeature] = useState([]);
  const [prodPrice, setProdPrice] = useState(0);
  const { showModal } = useContext(ModalCtx);

  const { productId } = useParams();

  const fetchProductDetails = async (productId) => {
    const config = getHeaderWithProjectId();

    try {
      const res = await axios.get(
        `https://academics.newtonschool.co/api/v1/ecommerce/product/${productId}`,
        config
      );
      setSelectedProduct(res.data.data);
      setProductFeature(res.data.data.features);
      setProductImg([res.data.data.displayImage, ...res.data.data.images]);
      setProdPrice(res.data.data.price);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProductDetails(productId);
  }, []);

  const discountPrice = parseFloat(
    Math.floor(
      Math.random() * (parseInt(prodPrice) + 24000 - parseInt(prodPrice) + 9000)
    ) + parseInt(prodPrice)
  );

  const savings = Number(discountPrice) - prodPrice;
  const priceOff = parseFloat((savings * 100) / prodPrice).toFixed(2);

  useEffect(() => {
    if (showModal) {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showModal]);

  const handleOnClick = (e) => {
    document.querySelectorAll("#indx").forEach((el) => {
      el.parentNode.style.border = "1px solid rgb(66, 66, 66)";
    });
    e.target.parentNode.style.border = "2px solid rgb(8, 199, 135)";
    document
      .getElementById("posterDisplay")
      .setAttribute("src", `${e.target.src}`);
  };

  return (
    <>
      <div className={styles.parent}>
        <div className={styles.imageSect}>
          {/* <BiHeart className={styles.wishList} /> */}
          <WishList value={selectedProduct._id} classStyles={styles.wishList} name="prodInfo"/>
          <img id="posterDisplay" src={selectedProduct.displayImage} />

          <SliderInfo width={110}>
            <div className={styles.imgSlideContainer}>
              {productImg.map((ele, indx) => {
                return (
                  <div key={indx} className={styles.imgSlideBox}>
                    <img id="indx" src={ele} onClick={handleOnClick} />
                  </div>
                );
              })}
            </div>
          </SliderInfo>
        </div>
        <div className={styles.decsriptionSect}>
          <p className={styles.prodName}>{selectedProduct.name}</p>
          <p className={styles.prodRating}>{selectedProduct.ratings} ratings</p>
          <p className={styles.prodPrice}>
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(prodPrice)}
            &nbsp;
            <span>(Incl. all Taxes)</span>
          </p>
          <div className={styles.discountPriceSect}>
            <p className={styles.discountPrice}>
              MRP:{" "}
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(discountPrice)}
            </p>
            <span>
              (Save{" "}
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(savings)}
              , {priceOff}% off)
            </span>
          </div>
          <div className={styles.feature}>
            <p>Key Features</p>
            <ul>
              {prodFeature.map((ele, indx) => {
                return <li key={indx}>{ele}</li>;
              })}
            </ul>
          </div>
          <div className={styles.careImg}></div>
          <hr />
          <div className={styles.extndWarnty}>
            <p>Extended Warranty</p>
            <p>
              Extended protection for your device beyond the manufacturer
              warranty with coverage against all manufacturing defects.
            </p>
          </div>
          <hr />
          <div className={styles.buttons}>
            <button>Buy Now</button>
            <button>Add To Cart</button>
          </div>
        </div>
      </div>
      <div className={styles.overview}>
        <h1>Overview</h1>
        <div
          dangerouslySetInnerHTML={{ __html: selectedProduct.description }}
        />
      </div>
    </>
  );
};

export default React.memo(ProductInfo);
