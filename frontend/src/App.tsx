import React from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import AddCourse from "./components/AddCourse";
import CourseList from "./components/CourseList";

const App = () => {
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>Mini Learning Platform</h1>

      {/* Register Component */}
      <div style={{ marginBottom: "40px" }}>
        <Register />
      </div>

      {/* Login Component */}
      <div style={{ marginBottom: "40px" }}>
        <Login />
      </div>

      {/* Add Course Component */}
      <div style={{ marginBottom: "40px" }}>
        <AddCourse />
      </div>

      {/* Course List Component */}
      <div style={{ marginBottom: "40px" }}>
        <CourseList />
      </div>
    </div>
  );
};

export default App;
