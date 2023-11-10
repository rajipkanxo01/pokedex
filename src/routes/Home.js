import React, { useState } from "react";

import "../css/index.css";
import { Root } from "../routes/Root.js";
import { Sidebar } from "../components/PokemonSidebar";
import { PokemonInfo } from "../components/PokemonInfo";
import Background from "../components/Background.js";

export default function Home() {
  const [pokemonId, setPokemonId] = useState(0);

  function handleCardClick(pokeId) {
    setPokemonId(pokeId);
  }

  return (
    <>
      <Background />
      <div>
        <Body pokemonId={pokemonId} handleCardClick={handleCardClick} />
      </div>
    </>
  );
}

function Body({ pokemonId, handleCardClick }) {
  return (
    <div className="body">
      <PokemonInfo pokeId={pokemonId} />
      <Sidebar handleClick={handleCardClick} />
    </div>
  );
}
