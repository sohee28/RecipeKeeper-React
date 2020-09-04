import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./comps/Navbar";
import About from "./comps/About";
import MyRecipe from "./comps/MyRecipe";
import { auth } from "./firebase/config";
import Login from "./comps/LoginPage";

function App() {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [hasAccount, setHasAccount] = useState(false);

  const clearInputs = () => {
    setUserName("");
    setEmail("");
    setPassword("");
  };
  const clearErrors = () => {
    setEmailError("");
    setPasswordErr("");
  };

  const handleLogin = () => {
    clearErrors();
    auth.signInWithEmailAndPassword(email, password).catch((err) => {
      switch (err.code) {
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
          setEmailError(err.message);
          break;
        case "auth/wrong-password":
          setPasswordErr(err.message);
          break;
      }
    });
  };

  const handleSignup = () => {
    clearErrors();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        return res.user.updateProfile({
          displayName: userName,
        });
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordErr(err.message);
            break;
        }
      });
  };

  const handleLogout = () => {
    auth.signOut();
  };

  const authListener = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  return (
    <Router>
      <div className="App">
        {user ? (
          <>
            <Navbar handleLogout={handleLogout} user={user} />
            <switch>
              <Route path="/about" component={About} />
              <Route path="/" exact component={MyRecipe} />
            </switch>
          </>
        ) : (
          <Login
            userName={userName}
            setUserName={setUserName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            handleSignup={handleSignup}
            hasAccount={hasAccount}
            setHasAccount={setHasAccount}
            emailError={emailError}
            passwordErr={passwordErr}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
