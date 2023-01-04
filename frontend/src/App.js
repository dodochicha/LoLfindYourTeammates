import { BrowserRouter, Routes, Route } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import Home from "./components/Home";

import "./App.css";
import Profile from "./components/Profile";
import Search from "./components/Search";
import Search2 from "./components/Search2";
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
            <Route path="/search" element={<Search />} />
            <Route path="/search2" element={<Search2 />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/player" element={<Player />} />
            <Route path="*" element={<h1>Error, Page Not Found</h1>} />
          </Routes>
        </BrowserRouter>
      </HookProvider>
    </>
  );
}

export default App;
