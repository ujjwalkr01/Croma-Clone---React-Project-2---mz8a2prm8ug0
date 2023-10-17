import React, { useEffect, useState } from "react";
import styles from "./NewProducts.module.css";
import { getHeaderWithProjectId } from "../../utils/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewProducts = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchingNewProducts = async () => {
    const config = getHeaderWithProjectId();
    try {
      const res = await axios.get(
        `https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?filter={"sellerTag": "new arrival"}`,
        config
      );
      //   console.log(res.data.data[0].name);
      const proData = res.data.data.splice(0, 16);
      setData(proData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchingNewProducts();
  }, []);

  const handleSelectProduct = (product) => {
    navigate(
      `/productDetails/${product.brand}/${product.subCategory}/${product._id}`
    );
  };

  return (
    <>
      <section className={styles.dealName}>New at Croma</section>
      <div className={styles.parentContainer}>
        {data.map((ele, index) => {
          return (
            <div
              key={index}
              className={styles.productCard}
              onClick={() => handleSelectProduct(ele)}
            >
              <p className={styles.newTag}>NEW</p>

              <p className={styles.prodName}>{ele.name}</p>
              <p className={styles.prodPrice}>
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
                </span>{" "}
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(ele.price)}{" "}
              </p>

              <img
                className={styles.prodImage}
                src={ele.displayImage}
                alt={ele.name}
              />

              <div className={styles.border}></div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default React.memo(NewProducts);
