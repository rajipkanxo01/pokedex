import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "../css/Navbar.css";
import pokeball from "../images/pokeball.png";
import tornado from "../images/tornado.png";

export function Root() {
  // const []

  const [activeMenu, setActiveMenu] = useState("Home");

  return (
    <>
      <nav className="navbar">
        <Link
          to="/"
          className="logo-link"
          onClick={() => setActiveMenu("Home")}
        >
          <div className="logo">
            <img
              src={require("../images/pokemon-logo-png-1421.png")}
              alt="Pokemon Logo"
            />
          </div>
        </Link>
        <div
          className="link-background"
          style={{ right: activeMenu === "Home" ? "150px" : "7px" }}
        ></div>

        <div className="nav-elements">
          <NavItem
            to="/"
            linkText="Home"
            imgSrc={pokeball}
            className="navbar-pokemon-image"
            onClick={() => setActiveMenu("Home")}
          />
          <NavItem
            to="/about"
            linkText="About"
            imgSrc={tornado}
            className="navbar-pokemon-image"
            onClick={() => setActiveMenu("About")}
          />
        </div>
      </nav>
      <Outlet />
    </>
  );
}

function NavItem({ to, imgSrc, linkText, className, onClick }) {
  return (
    <div className="nav-link">
      <Link to={to} onClick={onClick}>
        <img src={imgSrc} alt="" className={className} />
        {linkText}
      </Link>
    </div>
  );
}
