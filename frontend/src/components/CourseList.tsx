import React, { useEffect, useState } from "react";
import api from "../api"; // Axios instance pointing to backend

interface Course {
  id: number;
  title: string;
  user_id: number | null;
  filename?: string; // Optional, if your backend returns the file name
}

const CourseList = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/courses/");
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    fetchCourses();
  }, []);

  const getDownloadLink = (courseId: number, filename?: string) => {
    if (!filename) return "#";
    return `http://localhost:5000/courses/files/${courseId}/${filename}`;
  };

  return (
    <div>
      <h2>Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            {course.title}{" "}
            {course.filename && (
              <a href={getDownloadLink(course.id, course.filename)} target="_blank" rel="noopener noreferrer">
                [Download]
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
