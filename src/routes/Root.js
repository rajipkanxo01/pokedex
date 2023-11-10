import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../css/Navbar.css";

export function Root() {
  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <img
            src={require("../images/pokemon-logo-png-1421.png")}
            alt="Pokemon Logo"
          />
        </div>

        <div className="nav-elements">
          <NavItem
            to="/"
            imgSrc={require("../images/pikachu_sitting.png")}
            linkText="Home"
            className="navbar-pokemon-image"
          />
          <NavItem
            to="/about"
            imgSrc={require("../images/bulbasaur.png")}
            linkText="About"
            className="navbar-pokemon-image bulbasaur"
          />
        </div>
      </nav>
      <Outlet />
    </>
  );
}

function NavItem({ to, imgSrc, linkText, className }) {
  return (
    <div className="nav-link">
      <Link to={to}>
        <img src={imgSrc} alt="" className={className} />
        {linkText}
      </Link>
    </div>
  );
}
