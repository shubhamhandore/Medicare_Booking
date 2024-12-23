/* eslint-disable no-unused-vars */
import React from "react";
import HashLoader from "react-spinners/HashLoader";

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-opacity-50 bg-gray-700">
      <HashLoader color="#0067FF" />
    </div>
  );
};

export default Loading;
