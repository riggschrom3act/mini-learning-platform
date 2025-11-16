import axios from "axios";

// Create a centralized Axios instance pointing to the backend
const api = axios.create({
  baseURL: "http://localhost:5000", //  Flask backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
