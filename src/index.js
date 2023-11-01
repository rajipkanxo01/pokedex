import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";

import "../src/css/index.css";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/PokemonSidebar";

const queryClient = new QueryClient();
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
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
