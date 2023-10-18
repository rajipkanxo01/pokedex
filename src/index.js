import React from "react";
import ReactDOM from "react-dom/client";
import "../src/css/index.css";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/PokemonSidebar";

const root = ReactDOM.createRoot(document.getElementById("root"));

function App() {
  return (
    <div>
      <Navbar />
      <div className="sidebar">
        <Sidebar />
      </div>
    </div>
  );
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
