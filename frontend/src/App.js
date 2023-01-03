import { BrowserRouter, Routes, Route } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import Home from "./components/Home";
import Analytics from "./components/Analytics";

import "./App.css";
import Profile from "./components/Profile";
import Search from "./components/Search";
import Login from "./components/Login";
import Register from "./components/Register";
import Player from "./components/Player";
import { HookProvider } from "./hooks/useHook.js";

function App() {
  return (
    <>
      <CssBaseline />
      <HookProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/search/:username" element={<Search />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/player" element={<Player />} />
            <Route path="*" element={<h1>Error, Page Not Found</h1>} />
          </Routes>
        </BrowserRouter>
      </HookProvider>
    </>
  );
}

export default App;
