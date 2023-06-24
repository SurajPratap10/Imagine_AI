import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <>
      <div className="container-fluid overflow-hidden nav-wrapper">
        <div className="row p-0 overflow-hidden nav-wrapper-child-one">
          <div className="col-md m-0 p-4 d-flex justify-content-between overflow-hidden nav-wrapper-child-two">
            <h3 className="mb-0">Imagine - AI</h3>
            <h3 className="mb-0">OpenAI</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
