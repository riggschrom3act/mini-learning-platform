import React, { useState } from "react";
import api from "../api"; // Axios instance pointing to backend

const AddCourse = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      setMessage("Title is required");
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("title", title);
    if (file) formData.append("file", file);

    try {
      const res = await api.post("/courses/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(`Course uploaded! ID: ${res.data.id}`);
      setTitle("");
      setFile(null);
    } catch (err: any) {
      console.error(err);
      setMessage(err.response?.data?.error || "Failed to upload course");
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
          onChange={handleFileChange}
          accept=".pdf,.mp4,.jpg,.png" // optional file type restriction
        />
        <button type="submit">Add Course</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddCourse;
