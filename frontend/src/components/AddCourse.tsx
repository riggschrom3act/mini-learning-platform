import React, { useState } from "react";
import api from "../api"; // Axios instance pointing to backend

const AddCourse = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/courses/", { title });
      setMessage(`Course created with ID: ${res.data.id}`);
      setTitle(""); // Clear input after success
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Failed to add course");
    }
  };

  return (
    <div>
      <h2>Add Course</h2>
      <form onSubmit={handleAddCourse}>
        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button type="submit">Add Course</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddCourse; // Default export
