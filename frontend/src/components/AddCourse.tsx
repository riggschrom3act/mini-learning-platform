import React, { useState } from "react";
import api from "../api";

const AddCourse = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      const res = await api.post("/courses/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(`Course created with ID: ${res.data.id}`);
      setTitle("");
      setFile(null);
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
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
        />
        <button type="submit">Add Course</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddCourse;
