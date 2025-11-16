import React, { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import CourseList from "./components/CourseList";
import AddCourse from "./components/AddCourse";

function App() {
  const [refresh, setRefresh] = useState(0);

  const refreshCourses = () => setRefresh((r) => r + 1);

  return (
    <div>
      <h1>Mini Learning Platform</h1>
      <Register />
      <Login />
      <AddCourse onAdded={refreshCourses} />
      <CourseList key={refresh} />
    </div>
  );
}

export default App;
