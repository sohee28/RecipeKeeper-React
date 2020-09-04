import React, { useState } from "react";
import "../styles/Loginpage.css";
import catImg from "../image/ginger-cat-747.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const LoginPage = (props) => {
  const {
    userName,
    setUserName,
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleSignup,
    hasAccount,
    setHasAccount,
    emailError,
    passwordErr,
  } = props;
  return (
    <div className="loginpageclass">
      <div className="loginContainer">
        {hasAccount ? (
          <div className="LoginSection">
            <div className="LoginTitleSection">
              <div className="LoginTitle">
                <h4>WELCOME</h4>
                <h5>Log In to Continue</h5>
              </div>
              <img className="catImage" src={catImg} />
            </div>
            <div className="LoginInputSection">
              <input
                type="email"
                autoFocus
                required
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="errorMsg">{emailError}</p>
              <input
                type="password"
                autoFocus
                required
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="errorMsg">{passwordErr}</p>
            </div>
            <button className="Signinbtn" onClick={handleLogin}>
              Get Started <FontAwesomeIcon icon={faArrowRight} />
            </button>
            <p className="additionInfo">
              Don't Have an account?
              <span
                onClick={() => {
                  setHasAccount(!hasAccount);
                }}
              >
                Sign up
              </span>
            </p>
          </div>
        ) : (
          <div className="LoginSection">
            <div className="LoginInputSection">
              <div className="LoginTitleSection">
                <div className="LoginTitle">
                  <h4>WELCOME</h4>
                  <h5>Sign Up to Continue</h5>
                </div>
                <img className="catImage" src={catImg} />
              </div>
              <input
                type="text"
                autoFocus
                required
                value={userName}
                placeholder="Name"
                onChange={(e) => setUserName(e.target.value)}
              />
              <p className="errorMsg"></p>
              <input
                type="email"
                autoFocus
                required
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="errorMsg">{emailError}</p>
              <input
                type="password"
                autoFocus
                required
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="errorMsg">{passwordErr}</p>
            </div>
            <button className="Signinbtn" onClick={handleSignup}>
              Get Started <FontAwesomeIcon icon={faArrowRight} />
            </button>
            <p className="additionInfo">
              Have an Account?
              <span
                onClick={() => {
                  setHasAccount(!hasAccount);
                }}
              >
                Sign in
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
