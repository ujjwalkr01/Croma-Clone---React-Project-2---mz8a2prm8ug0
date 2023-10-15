import { useRef } from "react";
import styles from "./NavigationBar.module.css";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const inpRef = useRef();
  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    if (e.key == "Enter") {
      const inpValue = inpRef.current.value;
      navigate(`/list/search/${inpValue}`);
      inpRef.current.value = "";
    }
  };
  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.noSubmit}
        type="search"
        ref={inpRef}
        placeholder="What are you looking for ?"
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};

export default SearchInput;
