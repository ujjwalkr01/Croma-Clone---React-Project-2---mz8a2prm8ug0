import { useState } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import "./SliderBar.css";

const SliderBar = () => {
  const [imageNum, setImageNum] = useState(0);

  const sliderImage = [
    {
      url: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1695808854/Croma%20Assets/CMS/Homepage%20Banners/01_Homepage%20Bugs%20Daily/Sept%202023/27-09-2023/3:20%20pm/HP_TVCricket_Hero_27Sep23_shciqa.gif?tr=w-2048",
    },
    {
      url: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1696086045/Croma%20Assets/CMS/LP%20Page%20Banners/2023/HP%20Top%20Rotating%20Deals/October/Oct%202nd/Desktop/HP_AD_2Oct2023_t60ane.jpg?tr=w-2048",
    },
    {
      url: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1696086056/Croma%20Assets/CMS/LP%20Page%20Banners/2023/HP%20Top%20Rotating%20Deals/October/Oct%202nd/Desktop/HP_Vivo_2Oct2023_u1sszi.jpg?tr=w-2048",
    },
    {
      url: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1693408262/Croma%20Assets/CMS/LP%20Page%20Banners/2023/Incoming%20payday/30th%20August/HP_Income-ingPayDay_29March2023_dbhfdx.jpg?tr=w-2048",
    },
    {
      url: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1696086050/Croma%20Assets/CMS/LP%20Page%20Banners/2023/HP%20Top%20Rotating%20Deals/October/Oct%202nd/Desktop/HP_SA_2Oct2023_dpqmuz.jpg?tr=w-2048",
    },
    {
      url: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1696086067/Croma%20Assets/CMS/LP%20Page%20Banners/2023/HP%20Top%20Rotating%20Deals/October/Oct%202nd/Desktop/HP_Xiaomi_2Oct2023_enpaok.jpg?tr=w-2048",
    },
    {
      url: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1696086046/Croma%20Assets/CMS/LP%20Page%20Banners/2023/HP%20Top%20Rotating%20Deals/October/Oct%202nd/Desktop/HP_Mouse_2Oct2023_laaqm6.jpg?tr=w-2048",
    },
  ];
  return (
    <div className="sliderBox">
      <SimpleImageSlider
        width="100%"
        height="52%"
        images={sliderImage}
        showBullets={true}
        // showNavs={true}
        autoPlay={true}
        onStartSlide={(index, length) => {
          setImageNum(index);
        }}
        autoPlayDelay={6}
      />
    </div>
  );
};

export default SliderBar;
