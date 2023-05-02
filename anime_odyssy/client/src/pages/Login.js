import React, { useState } from "react";
import "../styles/Login.css";
import logo from "../images/logo.png";
<<<<<<< HEAD
const config = require("../config.json");
=======
>>>>>>> yiling

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
<<<<<<< HEAD
  // const [loading, setLoading] = useState(false);
=======
>>>>>>> yiling

  function handleUsernameInputChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordInputChange(event) {
    setPassword(event.target.value);
  }

<<<<<<< HEAD
  function handleNext(event) {
    event.preventDefault();
    if (username) {
      // Perform registration
      console.log(`Registering user ${username}`);
      fetch(
        `http://${config.server_host}:${config.server_port}/login?username=${username}`
      ).then((res) => {
        console.log(res);
        if (res.status === 200) {
          // render password container
          setPasswordContainer(true);
        } else {
          alert("Username does not exist.");
        }
      });
    } else {
      alert("Please enter a username.");
=======
  function handleSubmit(event) {
    event.preventDefault();
    if (username === "bijinwei") {
      // render password container
      setPasswordContainer(true);
    } else {
      alert("Username does not exist.");
>>>>>>> yiling
    }
  }

  const [passwordContainer, setPasswordContainer] = useState(false);

  function handleBackClick() {
    setPasswordContainer(false);
  }

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

<<<<<<< HEAD
  // function sleep(ms) {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // }

  async function handleSignIn(event) {
    event.preventDefault();
    // setLoading(true);
    // await sleep(500);
    // Perform authentication check
    if (username) {
      // Perform registration
      console.log(`Registering user ${username}`);
      fetch(
        `http://${config.server_host}:${config.server_port}/login?username=${username}&password=${password}`
      ).then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert("Successful login!");
          // fetch for favorite anime list for the user and store in the session storage
          fetch(
            `http://${config.server_host}:${config.server_port}/get_user_favorite/${username}`
          )
            .then((res) => res.json())
            .then((resJson) => {
              sessionStorage.setItem("favorite_list", JSON.stringify(resJson));
              console.log(resJson);
            });
          sessionStorage.setItem("username", `${username}`);
          window.location.href = "/home";
        } else {
          alert("Incorrect password.");
        }
      });
    } else {
      alert("Incorrect password.");
=======
  function handleSignIn(event) {
    event.preventDefault();
    // Perform authentication check
    if (password === "password123") {
      // Redirect to next page
      window.location.href = "#";
    } else {
      alert("Incorrect password");
>>>>>>> yiling
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
<<<<<<< HEAD
          <form onSubmit={handleNext}>
=======
          <form onSubmit={handleSubmit}>
>>>>>>> yiling
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
<<<<<<< HEAD
            <input type="button" value="Next &rarr;" onClick={handleNext} />
=======
            <input type="button" value="Next &rarr;" onClick={handleSubmit} />
>>>>>>> yiling
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
<<<<<<< HEAD
            {/* {loading ? <img src={logo} alt="loading" className="rotate" /> : ""} */}
=======
>>>>>>> yiling
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
