import { useContext, useEffect, useState } from "react";
import styles from "./ProductList.module.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getHeaderWithProjectId } from "../../utils/config";
import { BsStarFill } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { ColorRing } from "react-loader-spinner";
import { ModalCtx } from "../App";
import WishList from "../OrderRelated/WishList";
import Footer from "../Footer";

const ProductList = () => {
  const { search_term } = useParams();
  const [searchTermData, setSearchTermData] = useState([]);
  const [hasNotError, setHasNotError] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { showModal } = useContext(ModalCtx);

  const fetchSearchData = async (inpValue) => {
    const config = getHeaderWithProjectId();
    try {
      const resp = await axios.get(
        "https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?limit=700",
        config
      );
      // console.log(resp.data);

      setIsLoading(true);
      const searchData = resp.data.data.filter((el) => {
        if (
          el.name.toLowerCase().includes(inpValue.toLowerCase()) ||
          el.subCategory.toLowerCase().includes(inpValue.toLowerCase())
        ) {
          return el;
        }
      });
      if (searchData.length > 0) {
        setSearchTermData(searchData);
      } else {
        setHasNotError(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSearchData(search_term);
    setIsLoading(true);
    setHasNotError(true);
  }, [search_term]);

  useEffect(() => {
    if (showModal) {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showModal]);

  useEffect(() => {
    document.body.style.backgroundColor = "rgb(32, 32, 32)";
  }, []);

  const handleCardClick = (product) => {
    navigate(
      `/productDetails/${product.brand}/${product.subCategory}/${product._id}`
    );
  };

  return (
    <>
      <div className={styles.parentContainer}>
        {!isLoading ? (
          <>
            {hasNotError ? (
              <>
                <section className={styles.searchInfo}>
                  <p>Results for "{search_term}"</p>
                  <p>{searchTermData.length} Products found</p>
                </section>
                {searchTermData.map((ele, indx) => {
                  return (
                    <div key={indx} className={styles.containerCard}>
                      <section className={styles.imgSect}>
                        <img
                          src={ele.displayImage}
                          alt={ele.name}
                          onClick={() => handleCardClick(ele)}
                        />
                      </section>
                      <section className={styles.descrSect}>
                        <div className={styles.heading}>
                          <p className={styles.prodName}>{ele.name}</p>
                          <WishList
                            value={ele._id}
                            classStyle={styles.wishList}
                            name="prodList"
                          />
                        </div>
                        <div className={styles.btnSect}>
                          <button>
                            {Math.floor(
                              Math.random() * (6000 - 2000 + 1) + 2000
                            )}
                            &nbsp;off on payment OTP page
                          </button>
                          <button>6 Months No CostEMI</button>
                        </div>
                        <p className={styles.prodRating}>
                          {(Math.random() * (5.0 - 4.0) + 4.0).toFixed(1)}
                          <BsStarFill />
                        </p>
                        <p className={styles.prodPrice}>
                          {new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                          }).format(ele.price)}
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
                                  (parseInt(ele.price) +
                                    12000 -
                                    parseInt(ele.price) +
                                    4000)
                              ) + parseInt(ele.price)
                            )
                          )}
                        </p>
                        <p className={styles.location}>
                          <IoLocationOutline />
                          Delivery at: <span>Mumbai,</span>
                          &nbsp;
                          <span>400049</span>
                        </p>
                        <p className={styles.deliveryStat}>
                          Standard Delivery by Tomorrow
                        </p>
                      </section>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className={styles.errorMsg}>
                <p>You searched for {search_term}</p>
                <img src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1638949344/Croma%20Assets/CMS/LP%20Page%20Banners/3828539-ai_1_77_ujluyw.png" />
                <p>We couldn't find any matches!</p>
                <p>Please check the spelling or try searching something else</p>
              </div>
            )}
          </>
        ) : (
          <div style={{ height: "500px", padding: "8rem" }}>
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
            />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductList;
