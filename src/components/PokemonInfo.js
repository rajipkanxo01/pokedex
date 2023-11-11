/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Color from "color-thief-react";
import "../css/PokemonInfo.css";
import pokemonPhone from "../images/pokephone.png";
import theme_song from "../audios/pokemon_theme_song.mp3";

// PokemonInfo Component
export function PokemonInfo({ pokeId }) {
  const {
    data: pokemon,
    isLoading,
    isError,
  } = useQuery(["pokemon", pokeId], () =>
    pokeId > 0 ? fetchPokemon(pokeId) : null
  );

  // Function to render comma-separated list of types
  const renderTypes = () => {
    return pokemon.types.map((typeData, index) => (
      <p key={index}>
        {typeData.type.name}
        {index < pokemon.types.length - 1 ? ", " : ""}
      </p>
    ));
  };

  return (
    <div className="pokemoninfo-container">
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error...</p>}
      {!isLoading && pokemon && (
        <Color
          src={pokemon.sprites.front_default}
          format="hex"
          key={pokemon.id}
          crossOrigin="anonymous"
        >
          {({ data: colourData }) => (
            <>
              <div
                style={{ background: `${colourData}` }}
                className="image-border"
              >
                <img
                  className="pokemon-image"
                  src={pokemon.sprites.other["official-artwork"].front_default}
                  alt=""
                />
              </div>

              <div className="pokemon-name">
                <p>{pokemon.name}</p>
              </div>

              <BasicStats pokemon={pokemon} />
              <MovesContainer pokemon={pokemon} />

              <p className="pokemon-id">#{pokemon.id}</p>
              <p className="pokemon-type">{renderTypes()}</p>

              <PlayPauseButton pokeId={pokemon.id} />
              <BoxAnimation />
              <DPad />

              <img className="pokephone-image" src={pokemonPhone} alt="" />
            </>
          )}
        </Color>
      )}
    </div>
  );
}

// BasicStats Component
const BasicStats = ({ pokemon }) => {
  const renderAbilities = () => {
    return pokemon.abilities.map((ability, index) => (
      <span key={index}>
        {ability.ability.name}
        {index < pokemon.abilities.length - 1 ? ", " : ""}
      </span>
    ));
  };

  return (
    <div className="basic-stats">
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Basic XP: {pokemon.base_experience}</p>
      <p>Abilities: {renderAbilities()}</p>
    </div>
  );
};

// MovesContainer Component
const MovesContainer = ({ pokemon }) => {
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
};

// BoxAnimation Component
const BoxAnimation = () => {
  const [isBox1, setIsBox1] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsBox1((prevIsBox1) => !prevIsBox1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="box-animation">
      <div className={isBox1 ? "box1" : "box2"}></div>
      <div className={isBox1 ? "box2" : "box1"}></div>
    </div>
  );
};

// PlayPauseButton Component
const PlayPauseButton = ({ pokeId }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audio = new Audio(theme_song);

  useEffect(() => {
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isPlaying, audio]);

  function togglePlayPause() {
    setIsPlaying(!isPlaying);
  }

  return (
    <div className="play-pause-container" onClick={togglePlayPause}>
      {isPlaying ? (
        <span className="pause-icon">&#10074;&#10074;</span>
      ) : (
        <span className="play-icon">&#9654;</span>
      )}
    </div>
  );
};

//D-Pad Component
const DPad = () => {
  return (
    <div class="buttons">
      <div class="d-pad">
        <div class="button up"></div>
        {/* <div class="button left"></div> */}
        {/* <div class="button right"></div> */}
        <div class="button down"></div>
      </div>
    </div>
  );
};

// Function to fetch Pokemon data from the PokeAPI
const fetchPokemon = async (pokeId) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokeId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
};
