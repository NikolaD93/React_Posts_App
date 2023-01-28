import React, { useState, useEffect } from "react";
import "./register.scss";
import { Button } from "../common/Button";
import { TextInput } from "../common/Inputs";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_API } from "../environment/Api";
import successIcon from "../assets/success_icon.svg";
import { FaTimes, FaCheckSquare, FaInfoCircle } from "react-icons/fa";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const navigate = useNavigate();

  const [firstName, setFristName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);
  console.log(firstNameFocus);

  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const result = USER_REGEX.test(firstName);
    console.log(result);
    console.log(firstName);
    setValidFirstName(result);
  }, [firstName]);

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
          <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
            {errMsg}
          </p>
          <h2>Register</h2>
          <h3>Fill out requested fields</h3>
          <form onSubmit={handleSubmit} className="register__form">
            <FaCheckSquare className={validFirstName ? "valid" : "hide"} />
            <FaTimes
              className={validFirstName || !firstName ? "hide" : "invalid"}
            />
            <TextInput
              type="text"
              id="firstName"
              placeholder="First Name"
              onChange={(e) => setFristName(e.target.value)}
              value={firstName}
              onFocus={() => setFirstNameFocus(true)}
              onBlur={() => setFirstNameFocus(false)}
            />
            <p
              className={
                !validFirstName && firstNameFocus && firstName
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FaInfoCircle className="info_circle" />
              4 to 24 characters.
              <br />
              Must begin with a letter! No spaces allowed.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>
            <TextInput
              type="text"
              id="lastName"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
            <TextInput
              type="text"
              id="username"
              placeholder="User Name"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <TextInput
              type="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <Button disabled={!validFirstName ? true : false}>Register</Button>
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
