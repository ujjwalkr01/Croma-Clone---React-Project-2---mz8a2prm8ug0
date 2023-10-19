import { useContext, useEffect } from "react";
import AirConditionerDeals from "./Deals/AirConditionerDeals";
import AudioDeals from "./Deals/AudioDeals";
import Health from "./Deals/Health";
import KitchenAppliances from "./Deals/KitchenAppliances";
import LaptopDeals from "./Deals/LaptopDeals";
import NewProducts from "./Deals/NewProducts";
import PaymentBanner from "./Deals/PaymentBanner";
import RefrigeratorDeals from "./Deals/RefrigeratorDeals";
import TabletDeals from "./Deals/TabletDeals";
import TelevisionDeals from "./Deals/TelevisionDeals";
import TrendingDeals from "./Deals/TrendingDeals";
import WashingMachineDeals from "./Deals/WashingMachineDeals";
import SliderBar from "./Slider/SliderBar";
import WhatsNew from "./Slider/WhatsNew";
import { ModalCtx } from "./App";
import Footer from "./Footer";

const Home = () => {
  const { showModal } = useContext(ModalCtx);

  useEffect(() => {
    if (showModal) {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showModal]);

  return (
    <>
      <SliderBar />
      <WhatsNew />
      <TrendingDeals />
      <NewProducts />
      <AudioDeals />
      <KitchenAppliances />
      <LaptopDeals />
      <TelevisionDeals />
      <AirConditionerDeals />
      <RefrigeratorDeals />
      <WashingMachineDeals />
      <TabletDeals />
      <PaymentBanner />
      <Health />
      <Footer />
    </>
  );
};
export default Home;
