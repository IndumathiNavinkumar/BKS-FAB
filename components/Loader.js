import React from "react";
import { SpinnerDiamond } from "spinners-react";

const Loader = () => {
  return (
    <div
      className="text-center"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <SpinnerDiamond
        size={50}
        thickness={100}
        speed={100}
        color="#36ad47"
        secondaryColor="rgba(0, 0, 0, 0.44)"
      />{" "}
    </div>
  );
};

export default Loader;
