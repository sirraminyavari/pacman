import React from "react";
import { Themes } from "./styles/themes";
import MainLayout from "./layout/main-layout";
import { GlobalStyle } from "./styles/global-styles";
import { PacmanProvider } from "./context/pacman/pacman-provider";

function App() {
  return (
    <div className="theme-default">
      <PacmanProvider>
        <MainLayout />
      </PacmanProvider>
      <GlobalStyle />
      <Themes />
    </div>
  );
}

export default App;
