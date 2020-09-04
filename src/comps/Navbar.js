import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../image/logo.png";
import "../styles/Navbar.css";

const Navbar = ({ handleLogout, user }) => {
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
        <p className="userName">{user.displayName}</p>
        <button className="loginbtn" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
