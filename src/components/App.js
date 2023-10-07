import "../styles/App.css";
import NewProducts from "./Deals/NewProducts";
import TrendingDeals from "./Deals/TrendingDeals";
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
