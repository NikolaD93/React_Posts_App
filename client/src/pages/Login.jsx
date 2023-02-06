import React, { useState } from "react";
import "./login.scss";
import { Button } from "../common/Button";
import { TextInput } from "../common/Inputs";
import { BACKEND_API } from "../environment/Api";
import { useNavigate, Link } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import successIcon from "../assets/success_icon.svg";

const Login = ({ username, password }) => {
  const navigate = useNavigate();

  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${BACKEND_API}/auth`;
    const jsonBody = JSON.stringify({
      username: inputUsername,
      password: inputPassword,
    });

    try {
      const response = await fetch(url, {
        method: "POST",
        body: jsonBody,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const token = data.access_token;

      localStorage.setItem("token", JSON.stringify(token));

      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {success ? (
        <section className="success__wrapper">
          <h2>Awesome!</h2>
          <h3>You successfully logged in</h3>
          <img className="success_icon" src={successIcon} alt="success" />
          <Link className="link" to="/posts">
            Enter the App!
          </Link>
        </section>
      ) : (
        <div className="login__wrapper">
          <h2>Log in</h2>
          <h3>Enter your credentials</h3>
          <form onSubmit={handleSubmit} className="login__form">
            <TextInput
              type="text"
              id="inputUsername"
              placeholder="User Name"
              onChange={(e) => setInputUsername(e.target.value)}
              value={inputUsername}
            />
            <TextInput
              type="password"
              id="inputPassword"
              placeholder="Password"
              onChange={(e) => setInputPassword(e.target.value)}
              value={inputPassword}
            />
            <p
              className={
                username !== inputUsername || password !== inputPassword
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FaInfoCircle className="info_circle" />
              Please enter a valid username and a password!
            </p>
            <Button
              disabled={
                inputUsername === "" ||
                inputPassword === "" ||
                username !== inputUsername ||
                password !== inputPassword
                  ? true
                  : false
              }
            >
              Log in
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
