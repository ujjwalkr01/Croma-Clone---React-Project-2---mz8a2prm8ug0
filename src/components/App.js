import "../styles/App.css";
import { useState } from "react";
import AirConditionerDeals from "./Deals/AirConditionerDeals";
import AudioDeals from "./Deals/AudioDeals";
import KitchenAppliances from "./Deals/KitchenAppliances";
import LaptopDeals from "./Deals/LaptopDeals";
import NewProducts from "./Deals/NewProducts";
import PaymentBanner from "./Deals/PaymentBanner";
import RefrigeratorDeals from "./Deals/RefrigeratorDeals";
import TabletDeals from "./Deals/TabletDeals";
import TelevisionDeals from "./Deals/TelevisionDeals";
import TrendingDeals from "./Deals/TrendingDeals";
import WashingMachineDeals from "./Deals/WashingMachineDeals";
import NavigationBar from "./NavBar/NavigationBar";
import SliderBar from "./Slider/SliderBar";
import WhatsNew from "./Slider/WhatsNew";
import Footer from "./Footer";
import { Route, Routes } from "react-router-dom";
import ProductInfo from "./Page/ProductInfo";
import { createContext } from "react";

export const ClickedContext = createContext();
export const ProductIdDataCtx = createContext();

function App() {
  const [isClicked, setIsClicked] = useState(false);
  const [productId, setProductId] = useState({});

  return (
    <div className="App">
      <NavigationBar />
      {!isClicked && (
        <ClickedContext.Provider value={{ isClicked, setIsClicked }}>
          <ProductIdDataCtx.Provider value={{ productId, setProductId }}>
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
          </ProductIdDataCtx.Provider>
          <PaymentBanner />
        </ClickedContext.Provider>
      )}

      <ProductIdDataCtx.Provider value={{ productId, setProductId }}>
        <Routes>
          {isClicked && (
            <Route path="/productDetails" element={<ProductInfo />} />
          )}
        </Routes>
      </ProductIdDataCtx.Provider>
      <Footer />
    </div>
  );
}

export default App;
