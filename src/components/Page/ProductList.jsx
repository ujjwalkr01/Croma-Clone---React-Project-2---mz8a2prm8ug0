import { useEffect, useState } from "react";
import styles from "./ProductList.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getHeaderWithProjectId } from "../../utils/config";

const ProductList = () => {
  const { search_term } = useParams();
  const [searchTerm, setSearchTerm] = useState([]);

  const fetchSearchData = async (inpValue) => {
    const config = getHeaderWithProjectId();
    try {
      const resp = await axios.get(
        "https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?limit=700",
        config
      );
      console.log(resp.data);
      const searchData = resp.data.data.filter((el) => {
        if (el.name.toLowerCase().includes(inpValue)) {
          return el;
        }
      });
      setSearchTerm(searchData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSearchData(search_term);
  }, []);
  return (
    <div>
      <p className={styles.name}>hiiii</p>
    </div>
  );
};

export default ProductList;
