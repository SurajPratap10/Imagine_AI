import React from "react";
import Main from "./components/Input/Main";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.css";
// import Shared from "./components/Shared";
// import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      {/* WE CAN EVEN USE OUTLET FOR BETTER APPROACH IF THERE ARE MORE ROUTES */}

      {/* <Routes>
        <Route path="/" element={<Shared />}>
          <Input />
        </Route>
      </Routes> */}
      <Header />
      <Main />
      <Footer />
    </>
  );
};

export default App;
