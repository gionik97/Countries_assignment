import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CountryPage from "./pages/CountryPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<CountryPage />} />
      </Routes>
    </div>
  );
}

export default App;
