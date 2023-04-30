import React, { useState } from "react";
import "../styles/Login.css";
import logo from "../images/logo.png";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleUsernameInputChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordInputChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (username === "bijinwei") {
      // render password container
      setPasswordContainer(true);
    } else {
      alert("Username does not exist.");
    }
  }

  const [passwordContainer, setPasswordContainer] = useState(false);

  function handleBackClick() {
    setPasswordContainer(false);
  }

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleSignIn(event) {
    event.preventDefault();
    // Perform authentication check
    if (password === "password123") {
      // Redirect to next page
      window.location.href = "#";
    } else {
      alert("Incorrect password");
    }
  }

  if (!passwordContainer) {
    return (
      <body className="login">
        <div className="container">
          <div className="logo">
            <img src={logo} alt="Anime Odyssy" />
            <h2>Anime Odyssy</h2>
          </div>
          <h1>Sign in</h1>
          <form onSubmit={handleSubmit}>
            <div className="username-label">Enter your username</div>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              required
              value={username}
              onChange={handleUsernameInputChange}
            />
            <br />
            <input type="button" value="Next &rarr;" onClick={handleSubmit} />
          </form>
          <p>
            Not having an account?
            <a href="register">Create account</a> to explore the best Anime
            world!
          </p>
        </div>
      </body>
    );
  } else {
    return (
      <body className="login">
        <div className="container">
          <div className="logo">
            <img src={logo} alt="Anime Odyssy" />
            <h2>Anime Odyssy</h2>
          </div>
          <h1>
            Welcome back,{" "}
            <span id="username">{decodeURIComponent(username)}</span>!
          </h1>
          <form onSubmit={handleSignIn}>
            <div className="password-label">Enter your password</div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              required
              value={password}
              onChange={handlePasswordInputChange}
            />
            <br />
            <div className="checkbox">
              <input
                type="checkbox"
                id="show-password"
                onChange={handleShowPassword}
              />
              <label htmlFor="show-password">Show password</label>
            </div>
            <input
              type="button"
              value="&larr; Back"
              onClick={handleBackClick}
            />
            <input type="button" value="Sign in" onClick={handleSignIn} />
          </form>
        </div>
      </body>
    );
  }
}

export default Login;
