import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Product from "./pages/Products/Product";
import NotFound from "./pages/NotFound/NotFound";
import Layout from "./pages/Layout/Layout";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Authorization from "./components/Authentication/Authorization";
import PERMISSIONS from "./components/Authentication/Permissions";
import About from "./pages/About/About";
import Info from "./pages/Info/Info";
import Cart from "./pages/Cart/Cart";
import Register from "./pages/Register/Register";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
function App() {
  const dispatch = useDispatch();
  var user = JSON.parse(localStorage.getItem("userDetails"));
  var bearer = JSON.parse(localStorage.getItem("bearer"));
  var refreshTokenCode = JSON.parse(localStorage.getItem("refreshToken"));

  const refreshToken = useCallback(async () => {
    const options = {
      refreshToken: refreshTokenCode,
    };
    await axios
      .post(
        "https://miniecommerceapi.caprover.caneraycelep.social/api/identity/refresh",
        options
      )
      .then((response) => {
        localStorage.setItem(
          "bearer",
          JSON.stringify(response.data.accessToken)
        );
        localStorage.setItem(
          "refreshToken",
          JSON.stringify(response.data.refreshToken)
        );
        const bearer = { bearer: response.data.accessToken };
        const refreshToken = { refreshToken: response.data.refreshToken };
        dispatch({ type: "SET_BEARER", payload: { bearer } });
        dispatch({ type: "SET_REFRESH", payload: { refreshToken } });
      })
      .catch((err) => console.log(err));
  }, [refreshTokenCode, dispatch]);

  useEffect(() => {
    if (user !== null) {
      dispatch({ type: "LOGIN_USER", payload: { user } });
      dispatch({ type: "SET_BEARER", payload: { bearer } });
      setTimeout(() => {
        refreshToken();
      }, 36000);
    }
  }, [bearer, dispatch, refreshToken, user]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/productDetail/:productId" element={<ProductDetail />} />
          <Route path="/info" element={<Info />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/resetPassword/:email/:token/" element={<ResetPassword />} />
        </Route>
        <Route
          element={<Authorization permissions={[PERMISSIONS.CAN_VIEW_ABOUT]} />}
        >
          <Route path="/about" element={<About />} />
        </Route>
        {user === null ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        ) : (
          <Route path="/login" element={<Home />} />
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
