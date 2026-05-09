import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginComponent from "./LoginComponent";
import Home from "./Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;