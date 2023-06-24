import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";

const Shared = () => {
  return (
    <>
      <Header />
      <Footer />
      <Outlet />
    </>
  );
};

export default Shared;
