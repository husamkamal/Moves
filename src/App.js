import { MainContainer } from "./Global.Styles";
import Nav from "./Components/Nav/Nav";
import HomeScreen from "./Screen/HomeScreen/HomeScreen";
import MovieScreen from "./Screen/MovieScreen/MovieScreen";
import React from "react";
import { Routes, Route } from "react-router";

function App() {
  
  return (
          <MainContainer>
        <Nav />
        
        <Routes>
          <Route path="/" element={<HomeScreen />}/>
          <Route path="/moves/:id" element={ <MovieScreen />}/>

        </Routes>
      </MainContainer>
  );
}

export default App;
