import React, { useEffect, useState } from "react";
import classes from "./courses.module.css";
import M from "materialize-css";

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
      .then((result) => {
        if (result.error) {
          M.toast({
            html: `${result.error}`,
            classes: "#c62828 red darken-1",
          });
        } else {
          M.toast({
            html: `${result.message}`,
            classes: "#43a047 green darken-1",
          });
        }

        console.log(result);
      });
  };
  return (
    <div className={classes.courses}>
      {courses &&
        Object.keys(courses).map((item) => {
          return (
            <h5>
              {courses[item].name} -<span>{courses[item].points}</span>
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
