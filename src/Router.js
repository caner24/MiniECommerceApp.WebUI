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
import Success from "./pages/Success/Success";
import Cancel from "./pages/Cancel/Cancel";
function App() {
  console.log("sa");
  const dispatch = useDispatch();
  var user = JSON.parse(localStorage.getItem("userDetails"));
  var bearer = JSON.parse(localStorage.getItem("bearer"));
  var refreshTokenCode = JSON.parse(localStorage.getItem("refreshToken"));
  var basket = JSON.parse(localStorage.getItem("basket"));

  const refreshInterval = 3600 * 1000;
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

  const getUserBasket = useCallback(async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${bearer.bearer}`,
      },
    };
    await axios
      .get(
        "https://miniecommerceapi.caprover.caneraycelep.social/api/basket/getUserBasket",
        config
      )
      .then((response) => {
        var basket = response.data;
        dispatch({ type: "SET_BASKET", payload: { basket } });
      });
  }, [bearer, dispatch]);
  useEffect(() => {
    console.log(user);
    if (user !== null) {
      dispatch({ type: "LOGIN_USER", payload: { user } });
      dispatch({ type: "SET_BEARER", payload: { bearer } });
      setInterval(refreshToken, refreshInterval - 5 * 60 * 1000);
      getUserBasket();
    } else {
      dispatch({ type: "SET_BASKET", payload: { basket } });
    }
  }, [
    bearer,
    dispatch,
    refreshToken,
    user,
    basket,
    getUserBasket,
    refreshInterval,
  ]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/productDetail/:productId" element={<ProductDetail />} />
          <Route path="/info" element={<Info />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
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
