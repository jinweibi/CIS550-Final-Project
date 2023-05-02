import React, { useState } from "react";
import "../styles/Register.css";
import logo from "../images/logo.png";
const config = require("../config.json");

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [showPassword, setShowPassword] = useState(false);
  // const [registrationSuccessful, setRegistrationSuccessful] = useState(false);

  function handleInputChange(event) {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "age") {
      setAge(value);
    } else if (name === "gender") {
      setGender(value);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (username && password) {
      // Perform registration
      console.log(`Registering user ${username}, age ${age}, gender ${gender}`);
      fetch(
        `http://${config.server_host}:${config.server_port}/register?username=${username}` +
          `&password=${password}&gender=${gender}&age=${age}`
      ).then((res) => {
        console.log(res);
        if (res.status === 201) {
          alert("successfully create an acount!");
          // setRegistrationSuccessful(true);
          window.location.href = "/login";
        } else if (res.status === 401) {
          alert("wrong password or username");
        } else {
          alert("fail to create an acount!");
        }
      });
    } else {
      alert("Please enter a username and password.");
    }
  }

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleGenderInputChange(event) {
    setGender(event.target.value);
  }

  function handleAgeInputChange(event) {
    setAge(event.target.value);
  }

  return (
    <body className="register">
      <div className="register-container">
        <div className="logo">
          <img src={logo} alt="Anime Odyssy" />
          <h2>Anime Odyssy</h2>
        </div>
        <h1>Create an account</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-label">Enter your username*</div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            value={username}
            onChange={handleInputChange}
          />
          <br />
          <div className="input-label">Enter your password*</div>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={handleInputChange}
          />
          <input
            type="checkbox"
            id="show-password"
            onChange={handleShowPassword}
          />
          <label htmlFor="show-password">Show password</label>
          <br />
          <div className="register-input-container">
            <div className="input-group">
              <div className="input-label">Select your gender</div>
              <select
                name="gender"
                id="gender"
                value={gender}
                onChange={handleGenderInputChange}
              >
                <option value="">--Please select--</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="input-group">
              <div className="age-label">Enter your age</div>
              <input
                type="number"
                name="age"
                id="age"
                placeholder="Age"
                required
                value={age}
                onChange={handleAgeInputChange}
              />
            </div>
          </div>
          <input
            type="submit"
            className="register-button"
            value="Register"
            onClick={handleSubmit}
          />
        </form>
        <p>
          Already have an account?
          <a href="login">Sign in</a> to continue your Anime journey!
        </p>
      </div>
    </body>
  );
}

export default Register;
