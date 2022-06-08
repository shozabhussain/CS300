import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import {Routes, Route, Link } from "react-router-dom";

import LogIn from "./components/login";
import SignUp from "./components/signup";
import HomePage from "./components/homepage";
import Game from "./components/game";
import LeaderBoard from "./components/leaderboard";
import History from "./components/history";

function App() {
  return (
    <div>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <a href="/" className="navbar-brand">
        Worrdle
      </a>
    </nav>

      <div className="container mt-3">
        <Routes>
        <Route
            path="/" element={<LogIn/>}
          />

          <Route
            path="/signup" element={<SignUp/>}
          />

          <Route
            path="/homepage" element={<HomePage/>}
          />

          <Route
            path="/game" element={<Game/>}
          />

          <Route
            path="/history" element={<History/>}
          />

          <Route
            path="/leaderboard" element={<LeaderBoard/>}
          />

        </Routes>
      </div>
    </div>
  );

}

export default App;
