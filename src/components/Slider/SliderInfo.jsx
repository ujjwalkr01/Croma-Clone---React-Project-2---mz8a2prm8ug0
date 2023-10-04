import styles from "./WhatsNew.module.css";
import { TfiAngleLeft, TfiAngleRight } from "react-icons/tfi";
import { useRef } from "react";

const SliderInfo = ({ children, width }) => {
  const contentBoxRef = useRef();
//   console.log(props.children, props.width);
  const slideRight = () => {
    contentBoxRef.current.scrollLeft += width;
  };

  const slideLeft = () => {
    contentBoxRef.current.scrollLeft -= width;
  };

  return (
    <div className={styles.parentContainer}>
      <TfiAngleLeft className={styles.arrowBtn} onClick={slideLeft} />

      <div className={styles.imgContainer} ref={contentBoxRef}>
        {children}
      </div>

      <TfiAngleRight className={styles.arrowBtn} onClick={slideRight} />
    </div>
  );
};

export default SliderInfo;
