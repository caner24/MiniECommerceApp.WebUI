import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Product from "./pages/Products/Product";
import NotFound from "./pages/NotFound/NotFound";
import Layout from "./pages/Layout/Layout";
import MiniProvider from "./context/MiniProvider";
import ProductDetail from "./pages/ProductDetail/ProductDetail";

function App() {
  return (
    <MiniProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route
              path="/productDetail/:productId"
              element={<ProductDetail />}
            />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </MiniProvider>
  );
}

export default App;
