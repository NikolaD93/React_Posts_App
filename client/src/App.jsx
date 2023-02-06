import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Posts from "./pages/Posts";
import { useState } from "react";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="page-container">
      <Routes>
        <Route
          path="/"
          element={
            <Register
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
            />
          }
        />
        <Route
          path="/login"
          element={<Login username={username} password={password}/>}
        />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </div>
  );
};

export default App;
