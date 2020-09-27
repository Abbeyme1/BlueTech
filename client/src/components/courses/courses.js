import React, { useEffect, useState } from "react";
import classes from "./courses.module.css";

const Courses = () => {
  const [courses, setCourses] = useState({});

  useEffect(() => {
    fetch("/courses", {
      method: "get",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result.courses);
        console.log(typeof result.courses);
        setCourses(result.courses);
      });
  }, []);

  const getCourse = (id) => {
    fetch("/getCourse", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        courseId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => console.log(result));
  };
  return (
    <div className={classes.courses}>
      {courses &&
        Object.keys(courses).map((item) => {
          return (
            <h5>
              {courses[item].name}
              <button onClick={() => getCourse(courses[item]._id)}>
                CHOOSE
              </button>
            </h5>
          );
        })}
    </div>
  );
};

export default Courses;
