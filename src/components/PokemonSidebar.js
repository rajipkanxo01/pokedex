import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Color from "color-thief-react";
import bulbasaur from "../images/bulbasaur.png";

import "../css/PokemonSidebar.css";

export function Sidebar() {
  const [currentPage, setCurrentPage] = useState(1);
  const [primaryColour, setPrimaryColour] = useState("#FFFFFF");
  const limit = 25;
  const offset = (currentPage - 1) * limit;

  const {
    data: pokemonData,
    isLoading,
    isError,
  } = useQuery(["pokemons", limit, offset], () => fetchPokemons(limit, offset));

  function PaginationButtons() {
    const handlePrevious = () => {
      if (currentPage > 1) {
        setCurrentPage((prevPage) => prevPage - 1);
      }
    };

    const handleNext = () => {
      setCurrentPage((prevPage) => prevPage + 1);
    };

    return (
      <div className="buttons_container">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="button"
        >
          Prev
        </button>

        <button onClick={handleNext} className="button">
          Next
        </button>
      </div>
    );
  }

  async function fetchPokemons(limit, offset) {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const pokemonsData = await Promise.all(
      data.results.map(async (pokemon) => {
        const pokemonResponse = await fetch(pokemon.url);

        if (!pokemonResponse.ok) {
          throw new Error(`Network response for ${pokemon.name} was not ok`);
        }

        return await pokemonResponse.json();
      })
    );

    return pokemonsData;
  }

  return (
    <div className="container">
      <div className="pokemon-list">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading data</p>}

        {!isLoading &&
          pokemonData &&
          pokemonData.map((pokemon) => (
            <Color
              src={pokemon.sprites.front_default}
              format="hex"
              key={pokemon.id}
              crossOrigin="anonymous"
            >
              {({ data: colourData, loading, error }) => (
                <div
                  className="poke-card"
                  style={{
                    background: `linear-gradient(to left, ${colourData} 0%, transparent 90%)`,
                  }}
                  crossOrigin="anonymous"
                >
                  <p className="poke-id">#{pokemon.id}</p>
                  <img src={pokemon.sprites.front_default} alt="" />
                  <p className="poke-name">{pokemon.name}</p>
                </div>
              )}
            </Color>
          ))}
      </div>
      <PaginationButtons />
    </div>
  );
}
