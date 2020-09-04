import React, {useState} from "react";
import { Link } from "react-router-dom";
import logo from "../image/logo.png";
import "../styles/Navbar.css";
import firebase, { auth, provider } from "./firebase/config.js";

const Navbar = () => {

  const [user, setUser] = useState("")



  return (
    <nav className="nav-bar">
      <img className="logo" src={logo} alt="logo-picture"></img>
      <div className="nav-right">
        <ul className="nav-ul">
          <Link to="/about" style={{ textDecoration: "none" }}>
            <ol className="nav-list">About</ol>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <ol className="nav-list">MyRecipe</ol>
          </Link>
        </ul>
        <button onClick={login} className="login-button"></button>
      </div>
    </nav>
  );
};

export default Navbar;
