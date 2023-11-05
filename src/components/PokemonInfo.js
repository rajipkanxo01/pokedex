import React from "react";
import { useQuery } from "react-query";
import "../css/PokemonInfo.css";

export function PokemonInfo({ pokeId }) {
  const {
    data: pokemon,
    isLoading,
    isError,
  } = useQuery(["pokemon", pokeId], () =>
    pokeId > 0 ? fetchPokemon(pokeId) : null
  );

  return (
    <div className="pokemoninfo-container">
      {isLoading && <p>Loading......</p>} {isError && <p>Error......</p>}
      {!isLoading && pokemon && (
        <>
          <div className="info-container">
            <p>{pokemon.name}</p>
          </div>
          <div className="image-container">
            <img
              className="pokemon-image"
              src={pokemon.sprites.back_default}
              alt=""
            />
            <img
              className="pokemon-image"
              src={pokemon.sprites.front_default}
              alt=""
            />
            <img
              className="pokemon-image"
              src={pokemon.sprites.front_female}
              alt=""
            />
          </div>
        </>
      )}
    </div>
  );
}

async function fetchPokemon(pokeId) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokeId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
}
