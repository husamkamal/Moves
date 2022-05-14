import { MainContainer, ThemButton } from "./Global.Styles";
import { ThemeProvider } from "styled-components";
import Nav from "./Components/Nav/Nav";
import HomeScreen from "./Screen/HomeScreen/HomeScreen";
import MovieScreen from "./Screen/MovieScreen/MovieScreen";
import { lightTheme, darkTheme, GlobalStyles } from "./Global.Styles";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router";

function App() {
  const [theme, setTheme] = useState("light");
  const isDarkTheme = theme === "dark";
  const toggleTheme = () => {
    const updatedTheme = isDarkTheme ? "light" : "dark";
    setTheme(updatedTheme);
    localStorage.setItem("theme", updatedTheme);
  };
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme && ["dark", "light"].includes(savedTheme)) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme("dark");
    }
  }, []);
  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <GlobalStyles />
      <MainContainer>
        <Nav />
        <ThemButton onClick={toggleTheme}>
            {isDarkTheme ? (
              <span aria-label="Light mode" role="img">
                🌞
              </span>
            ) : (
              <span aria-label="Dark mode" role="img">
                🌜
              </span>
            )}
          </ThemButton>
        <Routes>
          <Route path="/" element={<HomeScreen />}/>
          <Route path="/moves/:id" element={ <MovieScreen />}/>

        </Routes>
      </MainContainer>
    </ThemeProvider>
  );
}

export default App;
