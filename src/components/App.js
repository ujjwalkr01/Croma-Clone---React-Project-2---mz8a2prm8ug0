import "../styles/App.css";
import Footer from "./Footer";
import { Route, Routes } from "react-router-dom";
import ProductInfo from "./Page/ProductInfo";
import ProductList from "./Page/ProductList";
import HomePage from "./Homepage";
import NavigationBar from "./NavBar/NavigationBar";
import { createContext, useState } from "react";
import { getToken } from "../utils/config";

export const ModalCtx = createContext();
export const SwitchModalCtx = createContext();

function App() {
  const [showModal, setShowModal] = useState(false);
  const [switchModal, setSwitchModal] = useState(false);

  const isLoggedIn = getToken();

  return (
    <div className="App">
      <ModalCtx.Provider value={{ showModal, setShowModal }}>
        <SwitchModalCtx.Provider value={{ switchModal, setSwitchModal }}>
          <NavigationBar />

          <Routes>
            {!isLoggedIn && (
              <>
                <Route path="/" element={<HomePage />} />
                <Route path="" element={<HomePage />} />
              </>
            )}
            {isLoggedIn && (
              <Route path="/logIn/user/:status" element={<HomePage />} />
            )}

            <Route
              path="/productDetails/:brand/:subCategory/:productId"
              element={<ProductInfo />}
            />

            <Route path="/list/search/:search_term" element={<ProductList />} />
          </Routes>
        </SwitchModalCtx.Provider>
      </ModalCtx.Provider>
      <Footer />
    </div>
  );
}

export default App;
