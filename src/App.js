import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Register from "./components/Register";
function App() {
  return (
    <div className="App">
      <Container maxWidth="sm">
        <Register />
      </Container>
    </div>
  );
}

export default App;
