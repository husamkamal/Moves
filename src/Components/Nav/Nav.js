import {
  NavContainer,
  LogoImg,
  LogoLink,
  NavInnerContainer,
} from "./Nav.Styles";
import logo from "../../Assets/reactMovie_logo.png";
import {
  darkTheme,
  GlobalStyles,
  lightTheme,
  ThemButton,
} from "../../Global.Styles";
import { ThemeProvider } from "styled-components";
import { useEffect, useState } from "react";

function Nav() {
  const [theme, setTheme] = useState("light");
  const isDarkTheme = theme === "dark";
  const toggleTheme = () => {
    const updatedTheme = isDarkTheme ? "light" : "dark";
    setTheme(updatedTheme);
    localStorage.setItem("theme", updatedTheme);
    console.log(updatedTheme)
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
      <NavContainer as={"header"}>
        <NavInnerContainer>
          <LogoLink to={"/"}>
            <LogoImg src={logo} alt={"Logo"} />
          </LogoLink>
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
        </NavInnerContainer>
      </NavContainer>
    </ThemeProvider>
  );
}

export default Nav;
