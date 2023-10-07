import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { getHeaderWithProjectId } from "../../utils/config";
import SliderInfo from "../Slider/SliderInfo";
import styles from "./Deals.module.css";
import { BiHeart } from "react-icons/bi";
import ProductInfo from "../Page/ProductInfo";

const RefrigeratorDeals = () => {
  const [data, setData] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  //   const prodRef = useRef();

  const fetchingTrendingData = async () => {
    const config = getHeaderWithProjectId();
    try {
      const res = await axios.get(
        `https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?filter={"subCategory": "refrigerator"}`,
        config
      );
      //   console.log(res.data.data[0].name);
      setData(res.data.data);
      // console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchingTrendingData();
  }, []);

  const handleEachCard = (product) => {
    console.log(product);
    setIsClicked(true);
    setProductDetails(product);
  };

  return (
    <>
      <section>Refrigerators</section>
      <SliderInfo width={280}>
        {data.map((ele, indx) => {
          return (
            <div
              key={indx}
              className={styles.cardContainer}
              //   ref={prodRef}
              onClick={() => handleEachCard(ele)}
            >
              <BiHeart className={styles.wishList} />
              <img className={styles.prodImage} src={ele.displayImage} />
              <p className={styles.prodName} style={{ color: "white" }}>
                {ele.name}
              </p>
              <p className={styles.prodPrice} style={{ color: "white" }}>
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(ele.price)}{" "}
                <span>
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(
                    parseFloat(
                      Math.floor(
                        Math.random() *
                          (parseInt(ele.price) +
                            12000 -
                            parseInt(ele.price) +
                            8000)
                      ) + parseInt(ele.price)
                    ).toFixed(2)
                  )}
                </span>
              </p>
              <p className={styles.prodRating} style={{ color: "white" }}>
                {ele.ratings}
              </p>
            </div>
          );
        })}
      </SliderInfo>
      {isClicked && <ProductInfo product={productDetails} />}
    </>
  );
};
export default React.memo(RefrigeratorDeals);
