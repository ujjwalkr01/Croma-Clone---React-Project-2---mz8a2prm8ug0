import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./WhatsNew.module.css";
import { TfiAngleLeft, TfiAngleRight } from "react-icons/tfi";

const WhatsNew = () => {
  const images = [
    {
      url: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1690220193/Croma%20Assets/CMS/LP%20Page%20Banners/2023/UNBOXED/UPDATE/2407/category-icon_unboxed_e123f4.png?tr=w-1000",
    },
    {
      url: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1676968095/Croma%20Assets/CMS/LP%20Page%20Banners/2023/01_HP_BUGS_LP_BUGS/FEB/21-02-2023/Category%20Navigation%20-%20Audio%20Split/CategoryNavigation_AudioSplit_Mobile_21Feb2023_y6hsfe.png?tr=w-1000",
    },
    {
      url: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1676968095/Croma%20Assets/CMS/LP%20Page%20Banners/2023/01_HP_BUGS_LP_BUGS/FEB/21-02-2023/Category%20Navigation%20-%20Audio%20Split/CategoryNavigation_AudioSplit_TV_21Feb2023_repyuk.png?tr=w-1000",
    },
    {
      url: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1683281227/Croma%20Assets/CMS/LP%20Page%20Banners/2023/HP%20Category%20Navigation/laptop_categoryicons_nixzuv.png?tr=w-1000",
    },
    {
      url: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1676968094/Croma%20Assets/CMS/LP%20Page%20Banners/2023/01_HP_BUGS_LP_BUGS/FEB/21-02-2023/Category%20Navigation%20-%20Audio%20Split/CategoryNavigation_AudioSplit_H_E_21Feb2023_cw375r.png?tr=w-1000",
    },
    {
      url: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1676968094/Croma%20Assets/CMS/LP%20Page%20Banners/2023/01_HP_BUGS_LP_BUGS/FEB/21-02-2023/Category%20Navigation%20-%20Audio%20Split/CategoryNavigation_AudioSplit_Ref_21Feb2023_ztynzt.png?tr=w-1000",
    },
    {
      url: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1676968094/Croma%20Assets/CMS/LP%20Page%20Banners/2023/01_HP_BUGS_LP_BUGS/FEB/21-02-2023/Category%20Navigation%20-%20Audio%20Split/CategoryNavigation_AudioSplit_HT_SB_21Feb2023_rk8ohd.png?tr=w-1000",
    },
    {
      url: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1676968094/Croma%20Assets/CMS/LP%20Page%20Banners/2023/01_HP_BUGS_LP_BUGS/FEB/21-02-2023/Category%20Navigation%20-%20Audio%20Split/CategoryNavigation_AudioSplit_AC_21Feb2023_azyacw.png?tr=w-1000",
    },
    {
      url: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1676968095/Croma%20Assets/CMS/LP%20Page%20Banners/2023/01_HP_BUGS_LP_BUGS/FEB/21-02-2023/Category%20Navigation%20-%20Audio%20Split/CategoryNavigation_AudioSplit_S_M_21Feb2023_qllhag.png?tr=w-1000",
    },
    {
      url: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1683281227/Croma%20Assets/CMS/LP%20Page%20Banners/2023/HP%20Category%20Navigation/washingmachine_categoryicons_ktcdeu.png?tr=w-1000",
    },
    {
      url: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1683281227/Croma%20Assets/CMS/LP%20Page%20Banners/2023/HP%20Category%20Navigation/kitchenappliances_categoryicons_xulmep.png?tr=w-1000",
    },
    {
      url: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1683281227/Croma%20Assets/CMS/LP%20Page%20Banners/2023/HP%20Category%20Navigation/grooming_categoryicons_oj7mrc.png?tr=w-1000",
    },
    {
      url: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1683281228/Croma%20Assets/CMS/LP%20Page%20Banners/2023/HP%20Category%20Navigation/tablet_categoryicons_d9a5ru.png?tr=w-1000",
    },
    {
      url: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1683281228/Croma%20Assets/CMS/LP%20Page%20Banners/2023/HP%20Category%20Navigation/wearable_categoryicons_sl3n0l.png?tr=w-1000",
    },
    {
      url: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1690270086/Croma%20Assets/CMS/Category%20icon/Updated%20Icons/LP_WishlistSale_CN_WP_4July2023_jtwzp9.png?tr=w-1000",
    },
    {
      url: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1690521345/Croma%20Assets/CMS/Category%20icon/CategoryNavigation_AudioSplit_Cameras_21Feb2023_fxbmtt.png?tr=w-1000",
    },
    {
      url: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1680608144/Croma%20Assets/CMS/Homepage%20Banners/Category%20Navigation/CategoryNavigation_AudioSplit_Accessories_21Feb2023_mtqgol.png?tr=w-1000",
    },
    {
      url: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1683281227/Croma%20Assets/CMS/LP%20Page%20Banners/2023/HP%20Category%20Navigation/gaming_categoryicons_hfqpze.png?tr=w-1000",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(7);

  const prevSlide = () => {
    const newIndex = currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className={styles.parentContainer}>
      <div>
        <TfiAngleLeft className={styles.arrowBtn} onClick={prevSlide} />{" "}
      </div>
      <div className={styles.imgContainer}>
        {images.map((image, indx) => {
          return (
            <div key={indx}>
              <img src={image.url} className={styles.imageLogo} />
            </div>
          );
        })}
      </div>
      <div>
        {" "}
        <TfiAngleRight className={styles.arrowBtn} onClick={nextSlide} />
      </div>
    </div>
  );
};

export default WhatsNew;
