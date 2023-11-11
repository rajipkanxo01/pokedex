import React, { useState } from "react";
import { useQuery } from "react-query";
import Color from "color-thief-react";
import "../css/PokemonSidebar.css";
import ash_loading from "../images/ash-loading.gif";

import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Stack from "@mui/material/Stack";

// Main Pokemon Sidebar Component
export function Sidebar({ handleClick }) {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 25;
  const offset = (currentPage - 1) * limit;

  // Fetch Pokemon data using react-query
  const {
    data: pokemonData,
    isLoading,
    isError,
  } = useQuery(["pokemons", limit, offset], () => fetchPokemons(limit, offset));

  // Event handler for navigating to the previous page
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Event handler for navigating to the next page
  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Event handler for clicking on a Pokemon card
  const handlePokeCardClick = (event) => {
    const pokeId = event.currentTarget.getAttribute("data-pokemon");
    handleClick(pokeId);
  };

  return (
    <div className="container">
      <div className="pokemon-list">
        {/* Loading and error handling */}
        {isLoading && <Loading />}
        {isError && <p>Error loading data</p>}

        {/* Render Pokemon cards */}
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
                  <img
                    src={
                      pokemon.sprites.versions["generation-v"]["black-white"]
                        .animated.front_shiny
                    }
                    alt=""
                  />
                  <p className="poke-name">{pokemon.name}</p>
                </div>
              )}
            </Color>
          ))}
      </div>
      {/* Pagination buttons component */}
      <PaginationButtons
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        currentPage={currentPage}
      />
    </div>
  );
}

// Pagination Buttons Component
function PaginationButtons({ handlePrevious, handleNext, currentPage }) {
  return (
    <div className="buttons_container">
      <Stack direction="row" spacing={30}>
        {/* Previous page button */}
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
        {/* Next page button */}
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

// Loading Component
function Loading() {
  return (
    <div className="loading-container">
      <img src={ash_loading} alt="" className="ash-loading" />
      <p className="loading-text">
        Loading <span>...</span>
      </p>
    </div>
  );
}

// Function to fetch Pokemon data
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
