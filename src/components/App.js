import "../styles/App.css";
import AirConditionerDeals from "./Deals/AirConditionerDeals";
import AudioDeals from "./Deals/AudioDeals";
import KitchenAppliances from "./Deals/KitchenAppliances";
import LaptopDeals from "./Deals/LaptopDeals";
import NewProducts from "./Deals/NewProducts";
import RefrigeratorDeals from "./Deals/RefrigeratorDeals";
import TabletDeals from "./Deals/TabletDeals";
import TelevisionDeals from "./Deals/TelevisionDeals";
import TrendingDeals from "./Deals/TrendingDeals";
import WashingMachineDeals from "./Deals/WashingMachineDeals";
import NavigationBar from "./NavBar/NavigationBar";
import SliderBar from "./Slider/SliderBar";
import WhatsNew from "./Slider/WhatsNew";

function App() {
  return (
    <div className="App">
      <NavigationBar />
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
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}

export default App;
