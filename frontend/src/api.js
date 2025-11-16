import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:5000", // backend URL
});

export default api;
// used to reuse URL in all components - used for ease of backend URL changes later