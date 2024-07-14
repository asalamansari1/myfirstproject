import React from "react";
import { Route,  Routes } from "react-router-dom";
import Home from "./Component/Home";
import ChapterDetail from "./Component/ChapterDetails";

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chapter/:id" element={<ChapterDetail/>} />
      </Routes>
    
  );
}
export default App;
