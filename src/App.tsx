
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import Index from "./pages/Index";
import NicknameGame from "./pages/NicknameGame";
import NotFound from "./pages/NotFound";
import PastFighters from "./pages/PastFighters";
import { GameProvider } from "./context/GameContext";
import MaleFightersGame from "./pages/MaleFightersGame";
import FemaleFightersGame from "./pages/FemaleFightersGame";
import "./App.css";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <GameProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MaleFightersGame />} />
            <Route path="/female-fighters" element={<FemaleFightersGame />} />
            <Route path="/nickname-game" element={<NicknameGame />} />
            <Route path="/past-fighters" element={<PastFighters />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </GameProvider>
    </ThemeProvider>
  );
}

export default App;
