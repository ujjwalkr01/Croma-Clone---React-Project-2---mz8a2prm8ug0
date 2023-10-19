import "../styles/App.css";
import { Navigate, Route, Routes, redirect } from "react-router-dom";
import ProductInfo from "./Page/ProductInfo";
import ProductList from "./Page/ProductList";
import HomePage from "./Homepage";
import NavigationBar from "./NavBar/NavigationBar";
import { createContext, useState } from "react";
import { getToken } from "../utils/config";
import CartPage from "./OrderRelated/CartPage";
import Home from "./Home";
import MyAccountPage from "./Page/MyAccountPage";
import MyWishlistPage from "./Page/MyWishlistPage";
import CheckoutPage from "./Page/CheckoutPage";
import GetMyOrders from "./Page/GetMyOrders";

export const ModalCtx = createContext();
export const SwitchModalCtx = createContext();

function App() {
  const [showModal, setShowModal] = useState(false);
  const [switchModal, setSwitchModal] = useState(false);

  const isLoggedIn = getToken();
  console.log(isLoggedIn);

  return (
    <div className="App">
      <ModalCtx.Provider value={{ showModal, setShowModal }}>
        <SwitchModalCtx.Provider value={{ switchModal, setSwitchModal }}>
          <NavigationBar />

          <Routes>
            <Route
              path="/"
              element={
                !isLoggedIn ? <Home /> : <Navigate to={"/logIn/user/true"} />
              }
            />

            <Route
              path="/logIn/user/:true"
              element={isLoggedIn ? <HomePage /> : <Navigate to={"/"} />}
            />

            <Route
              path="/my-account"
              element={isLoggedIn && <MyAccountPage />}
            />

            <Route
              path="/my-account/wishlist"
              element={isLoggedIn ? <MyWishlistPage /> : <Navigate to={"/"} />}
            />

            <Route
              path="/productDetails/:brand/:subCategory/:productId"
              element={<ProductInfo />}
            />

            <Route path="/list/search/:search_term" element={<ProductList />} />

            <Route
              path="/cartSec"
              element={isLoggedIn ? <CartPage /> : <Navigate to={"/"} />}
            />

            <Route
              path="/checkout/payment"
              element={isLoggedIn ? <CheckoutPage /> : <Navigate to={"/"} />}
            />

            <Route
              path="/my-account/orders"
              element={isLoggedIn ? <GetMyOrders /> : <Navigate to={"/"} />}
            />
          </Routes>
        </SwitchModalCtx.Provider>
      </ModalCtx.Provider>
    </div>
  );
}

export default App;
