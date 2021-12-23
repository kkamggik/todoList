import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Lists from "./components/lists.component";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Lists/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
