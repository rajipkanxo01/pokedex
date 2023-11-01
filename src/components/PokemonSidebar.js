import React, { useState } from "react";
import { useQuery } from "react-query";

import "../css/PokemonSidebar.css";

export function Sidebar() {
  const [currentPage, setCurrentPage] = useState(1);
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
            <div key={pokemon.id} className="pokemon">
              <p>{pokemon.id}</p>
              <p>{pokemon.name}</p>
            </div>
          ))}
      </div>
      <PaginationButtons />
    </div>
  );
}
