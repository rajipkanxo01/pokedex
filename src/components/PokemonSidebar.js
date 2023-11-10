import React, { useState } from "react";
import { useQuery } from "react-query";
import Color from "color-thief-react";
import "../css/PokemonSidebar.css";

import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Stack from "@mui/material/Stack";

export function Sidebar({ handleClick }) {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 25;
  const offset = (currentPage - 1) * limit;

  const {
    data: pokemonData,
    isLoading,
    isError,
  } = useQuery(["pokemons", limit, offset], () => fetchPokemons(limit, offset));

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePokeCardClick = (event) => {
    const pokeId = event.currentTarget.getAttribute("data-pokemon");
    handleClick(pokeId);
  };

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
                  onClick={handlePokeCardClick}
                  data-pokemon={pokemon.id}
                >
                  <p className="poke-id">#{pokemon.id}</p>
                  <img src={pokemon.sprites.front_default} alt="" />
                  <p className="poke-name">{pokemon.name}</p>
                </div>
              )}
            </Color>
          ))}
      </div>
      <PaginationButtons
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        currentPage={currentPage}
      />
    </div>
  );
}

function PaginationButtons({ handlePrevious, handleNext, currentPage }) {
  return (
    <div className="buttons_container">
      <Stack direction="row" spacing={25}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={handlePrevious}
          disabled={currentPage === 1}
          color="primary"
          className="button"
        >
          Prev
        </Button>
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={handleNext}
          className="button"
        >
          Next
        </Button>
      </Stack>
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
