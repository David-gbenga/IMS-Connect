import React from "react";
import spinnerImg from "../../assets/images/spinner.gif";

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <img src={spinnerImg} alt="spinner" />
    </div>
  );
};

export default Spinner;
