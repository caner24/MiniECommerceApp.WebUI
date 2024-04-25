import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";

const Layout = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
    >
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
