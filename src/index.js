import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import "../src/css/index.css";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/PokemonSidebar";
import { PokemonInfo } from "./components/PokemonInfo";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));

function App() {
  const [pokemonId, setPokemonId] = useState(0);

  function handleCardClick(pokeId) {
    setPokemonId(pokeId);
  }

  return (
    <div>
      <BackgroundContainer />
      <Overlay />
      <Navbar />
      <Body pokemonId={pokemonId} handleCardClick={handleCardClick} />
    </div>
  );
}

function BackgroundContainer() {
  return <div className="background-container"></div>;
}

function Overlay() {
  return <div className="overlay"></div>;
}

function Body({ pokemonId, handleCardClick }) {
  return (
    <div className="body">
      <PokemonInfo pokeId={pokemonId} />
      <Sidebar handleClick={handleCardClick} />
    </div>
  );
}

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
