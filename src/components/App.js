import "../styles/App.css";
import Footer from "./Footer";
import { Route, Routes } from "react-router-dom";
import ProductInfo from "./Page/ProductInfo";
import ProductList from "./Page/ProductList";
import HomePage from "./Homepage";
import NavigationBar from "./NavBar/NavigationBar";

function App() {
  return (
    <div className="App">
      <NavigationBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/productDetails/:brand/:subCategory/:productId"
          element={<ProductInfo />}
        />

        <Route path="/list/search/:search_term" element={<ProductList />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
