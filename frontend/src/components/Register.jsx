import React, { useState } from "react";
import api from "../api";

const Register = () => {
  const [username, setUsername] = useState(""); // stores text typed into the username field
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  //define handleregister to make http requests to back end 
  const handleRegister = async (e) => {
    e.preventDefault(); //prevents reload of page
    try {
      const res = await api.post("/auth/register", { username, password });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || "Registration failed");
    }
  };
//above we block post requests to register and pause execution until backend responds
//begin JSX to render UI 
return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Register; // exports the components so it can be used in app.jsx and other components.
