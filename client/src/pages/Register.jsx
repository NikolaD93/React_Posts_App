import React, { useState } from "react";
import "./register.scss";
import { Button } from "../common/Button";
import { TextInput } from "../common/Inputs";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_API } from "../environment/Api";
import successIcon from "../assets/success_icon.svg";

const Register = () => {
  const navigate = useNavigate();

  const [firstName, setFristName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${BACKEND_API}/register`;
    const jsonBody = JSON.stringify({
      firstname: firstName,
      lastname: lastName,
      username: username,
      password: password,
    });

    try {
      const response = await fetch(url, {
        method: "POST",
        body: jsonBody,
      });

      if (response.status === 200) {
        // navigate("/login");
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
          <h2>Success!</h2>
          <h3>You successfully created an account</h3>
          <img className="success_icon" src={successIcon} alt="success" />
          <Link className="link" to="/login">
            Go to Login
          </Link>
        </section>
      ) : (
        <section className="register__wrapper">
          <h2>Register</h2>
          <h3>Fill out requested fields</h3>
          <form onSubmit={handleSubmit} className="register__form">
            <TextInput
              type="text"
              label="First name"
              id="firstName"
              placeholder="ex. John"
              onChange={(e) => setFristName(e.target.value)}
              value={firstName}
            />
            <TextInput
              type="text"
              label="Last name"
              id="lastName"
              placeholder="ex. Doe"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
            <TextInput
              type="text"
              label="Username"
              id="username"
              placeholder="ex. JohnDoe123"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <TextInput
              type="password"
              label="Password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <Button>Submit</Button>
            <Link className="link" to="/login">
              Already have an account?
            </Link>
          </form>
        </section>
      )}
    </>
  );
};

export default Register;
