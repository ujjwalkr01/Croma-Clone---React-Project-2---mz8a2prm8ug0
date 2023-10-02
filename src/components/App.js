import "../styles/App.css";
import NavigationBar from "./NavBar/NavigationBar";
import SliderBar from "./Slider/SliderBar";
import WhatsNew from "./Slider/WhatsNew";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <SliderBar />
      <WhatsNew />
    </div>
  );
}

export default App;
