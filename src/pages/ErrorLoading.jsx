import React from "react";
import errorImg from "../assets/error-404.png";

const ErrorPage = () => {
  return (
    <div>
      <title>Error !</title>
      <div className="mt-20 mb-20 justify-center items-center flex flex-col">
        <img src={errorImg} alt="" />
        <h1 className="text-3xl font-bold text-violet-700 text-center mt-8 mb-4">
          OPPS!! OUTSIDE UNIVERSE REQUEST 👽
        </h1>
      </div>
    </div>
  );
};

export default ErrorPage;
