import { BrowserRouter, Routes, Route } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import Home from "./components/Home";
import Analytics from "./components/Analytics";

import "./App.css";
import Profile from "./components/Profile";
import Search from "./components/Search";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="search" element={<Search />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<h1>Error, Page Not Found</h1>} />
        </Routes>
        {/* <Routes>
          <Route path="/" element={<Home />}>
          <Route path="analytics" element={<Analytics />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="search" element={<Search />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<h1>Error, Page Not Found</h1>} />
        </Routes> */}
      </BrowserRouter>
    </>
  );
}

export default App;
