import React from "react";
import { useQuery } from "react-query";
import Color from "color-thief-react";

import "../css/PokemonInfo.css";
import pokemonPhone from "../images/pokephone.png";

export function PokemonInfo({ pokeId }) {
  const {
    data: pokemon,
    isLoading,
    isError,
  } = useQuery(["pokemon", pokeId], () =>
    pokeId > 0 ? fetchPokemon(pokeId) : null
  );

  return (
    /*
    <div className="pokemoninfo-container">
      {isLoading && <p>Loading......</p>} {isError && <p>Error......</p>}
      {!isLoading && pokemon && (
        <>
          { <div className="info-container">
            <p className="name">{pokemon.name}</p>
            <p>{pokemon.height}</p>
            <p>{pokemon.weight}</p>
          </div>
          <div className="image-container">
            <img
              className="pokemon-image"
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt=""
            />
          </div> }
          <div className="image-border"></div>
          <img className="image-container" src={pokemonPhone} alt="" />
        </>
      )}
    </div>
*/
    /*
    added comment */

    <div className="pokemoninfo-container">
      {isLoading && <p>Loading......</p>} {isError && <p>Error......</p>}
      {!isLoading && pokemon && (
        <Color
          src={pokemon.sprites.front_default}
          format="hex"
          key={pokemon.id}
          crossOrigin="anonymous"
        >
          {({ data: colourData, loading, error }) => (
            <>
              <div
                style={{
                  background: `${colourData}`,
                }}
                className="image-border"
              >
                <img
                  className="pokemon-image"
                  src={pokemon.sprites.other["official-artwork"].front_default}
                  alt=""
                />
              </div>

              <p className="pokemon-name">{pokemon.name}</p>

              <div className="basic-stats">
                <p>Height: {pokemon.height}</p>
                <p>Weight: {pokemon.weight}</p>
                <p>Basic XP: {pokemon.base_experience}</p>
                <p>
                  Abilities:
                  {pokemon.abilities.map((ability, index) => (
                    <span>
                      {ability.ability.name}
                      {index < pokemon.abilities.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              </div>

              <MovesContainer pokemon={pokemon} />

              <p className="pokemon-id">#{pokemon.id}</p>
              <p className="pokemon-type">
                {pokemon.types.map((typeData, index) => (
                  <p>
                    {typeData.type.name}
                    {index < pokemon.types.length - 1 ? ", " : ""}
                  </p>
                ))}
              </p>

              <img className="pokephone-image" src={pokemonPhone} alt=""></img>
            </>
          )}
        </Color>
      )}
    </div>
  );
}

function MovesContainer({ pokemon }) {
  const moves = pokemon.moves.map((move) => move.move.name);
  return (
    <div className="moves-container">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="box">
          <p>{moves.length > 0 ? moves[index % moves.length] : ""}</p>
        </div>
      ))}
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
