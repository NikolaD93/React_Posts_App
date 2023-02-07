import React, { useState, useEffect } from "react";
import "./register.scss";
import { Button } from "../common/Button";
import { TextInput } from "../common/Inputs";
import { Link } from "react-router-dom";
import { BACKEND_API } from "../environment/Api";
import successIcon from "../assets/success_icon.svg";
import { FaTimes, FaCheckCircle, FaInfoCircle } from "react-icons/fa";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = ({ username, setUsername, password, setPassword }) => {
  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [validUserName, setValidUserName] = useState(false);
  const [userNameFocus, setUserNameFocus] = useState(false);

  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [success, setSuccess] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const result = USER_REGEX.test(firstName);
    setValidFirstName(result);
  }, [firstName]);

  useEffect(() => {
    const result = USER_REGEX.test(lastName);
    setValidLastName(result);
  }, [lastName]);

  useEffect(() => {
    const result = USER_REGEX.test(username);
    setValidUserName(result);
  }, [username]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);
  }, [password]);

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
          <form onSubmit={handleSubmit} className="register__form" autoComplete="off">
            <div className="input__wrapper">
              <FaCheckCircle className={validFirstName ? "valid" : "hide"} />
              <FaTimes
                className={validFirstName || !firstName ? "hide" : "invalid"}
              />
              <TextInput
                type="text"
                id="firstName"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
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
                5 to 25 characters.
                <br />
                Must begin with a letter! No spaces allowed.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
            </div>
            <div className="input__wrapper">
              <FaCheckCircle className={validLastName ? "valid" : "hide"} />
              <FaTimes
                className={validLastName || !lastName ? "hide" : "invalid"}
              />

              <TextInput
                type="text"
                id="lastName"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                onFocus={() => setLastNameFocus(true)}
                onBlur={() => setLastNameFocus(false)}
              />
              <p
                className={
                  !validLastName && lastNameFocus && lastName
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FaInfoCircle className="info_circle" />
                5 to 25 characters.
                <br />
                Must begin with a letter! No spaces allowed.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
            </div>
            <div className="input__wrapper">
              <FaCheckCircle className={validUserName ? "valid" : "hide"} />
              <FaTimes
                className={validUserName || !username ? "hide" : "invalid"}
              />
              <TextInput
                type="text"
                id="username"
                placeholder="User Name"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                onFocus={() => setUserNameFocus(true)}
                onBlur={() => setUserNameFocus(false)}
              />
              <p
                className={
                  !validUserName && userNameFocus && username
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FaInfoCircle className="info_circle" />
                5 to 25 characters.
                <br />
                Must begin with a letter! No spaces allowed.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
            </div>
            <div className="input__wrapper">
              <FaCheckCircle className={validPassword ? "valid" : "hide"} />
              <FaTimes
                className={validPassword || !password ? "hide" : "invalid"}
              />
              <TextInput
                type="password"
                id="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
              />
              <p
                className={
                  !validPassword && passwordFocus && password
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FaInfoCircle className="info_circle" />
                8 to 24 characters.
                <br />
                Must include a letter, a number and a special character.
                <br />
                Allowed special characters:{" "}
                <span aria-label="exclamation mark">!</span>{" "}
                <span aria-label="at symbol">@</span>{" "}
                <span aria-label="hashtag">#</span>{" "}
                <span aria-label="dollar sign">$</span>{" "}
                <span aria-label="percent">%</span>
              </p>
            </div>
            <Button
              disabled={
                !validFirstName ||
                !validLastName ||
                !validUserName ||
                !validPassword
                  ? true
                  : false
              }
            >
              Register
            </Button>
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
