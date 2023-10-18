import React from "react";
import "../css/PokemonSidebar.css";

export function Sidebar() {
  return (
    <div className="poke-card">
      <span className="poke-id">001</span>
      <img src={require("../images/pikachu_sitting.png")} alt=""></img>
      <span className="poke-name">Pikachu</span>
    </div>
  );
}
