import React from "react";
import "../css/Navbar.css";

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img
          src={require("../images/pokemon-logo-png-1421.png")}
          alt="Pokemon Logo"
        />
      </div>

      <div className="nav-elements">
        <NavItem
          imgSrc={require("../images/pikachu_sitting.png")}
          linkText="Home"
          className="navbar-pokemon-image"
        />
        <NavItem
          imgSrc={require("../images/bulbasaur.png")}
          linkText="About"
          className="navbar-pokemon-image bulbasaur"
        />
      </div>
    </nav>
  );
}

function NavItem({ imgSrc, linkText, className }) {
  return (
    <div className="nav-link">
      <img src={imgSrc} alt="" className={className} />
      <a href={`#${linkText}`}>{linkText}</a>
    </div>
  );
}
