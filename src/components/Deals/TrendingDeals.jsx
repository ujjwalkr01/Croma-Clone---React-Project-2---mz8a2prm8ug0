import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { getHeaderWithProjectId } from "../../utils/config";
import SliderInfo from "../Slider/SliderInfo";
import styles from "./Deals.module.css";
import { BiHeart } from "react-icons/bi";
import { ClickedContext, ProductIdDataCtx } from "../App";
import { useNavigate } from "react-router-dom";

const TrendingDeals = () => {
  const [data, setData] = useState([]);
  const { isClicked, setIsClicked } = useContext(ClickedContext);
  const { productId, setProductId } = useContext(ProductIdDataCtx);
  const navigate = useNavigate();

  const fetchingTrendingData = async () => {
    const config = getHeaderWithProjectId();
    try {
      const res = await axios.get(
        `https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?filter={"sellerTag": "trending"}`,
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
    setIsClicked(true);
    setProductId(product._id);
    navigate("/productDetails");
    // console.log(product);
  };

  return (
    <>
      <section>Top Trending Deals</section>
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
                            6000 -
                            parseInt(ele.price) +
                            1000)
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
    </>
  );
};
export default React.memo(TrendingDeals);
