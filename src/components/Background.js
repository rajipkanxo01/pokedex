import React from "react";
import "../css/Background.css";

export default function Background({ children }) {
  return (
    <>
      <div className="background-container">{children}</div>
      <div className="overlay"></div>
    </>
  );
}
