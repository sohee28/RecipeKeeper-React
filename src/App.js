import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./comps/Navbar";
import About from "./comps/About";
import MyRecipe from "./comps/MyRecipe";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <switch>
          <Route path="/about" component={About} />
          <Route path="/" exact component={MyRecipe} />
        </switch>
      </div>
    </Router>
  );
}

export default App;
