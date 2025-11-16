import React, { useState } from "react";
import api from "../api"; // Use centralized Axios instance

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Feedback message

  // Handle form submission
  const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();

  // Log what we are sending
  console.log("Sending registration request:", { username, password });

  try {
    const res = await api.post("/auth/register", { username, password });

    // Log the response from backend
    console.log("Response from backend:", res.data);

    setMessage(res.data.message); // Show success message
  } catch (err: any) {
    // Log the error in full
    console.error("Error from backend:", err);

    setMessage(err.response?.data?.error || "Registration failed"); // Show error
  }
};
 

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
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
