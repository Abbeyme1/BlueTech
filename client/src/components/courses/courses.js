import React, { useEffect, useState } from "react";
import classes from "./courses.module.css";

const courses = () => {
  const [course, setCourses] = useState([]);

  useEffect(() => {
    fetch("/courses", {
      method: "get",
    })
      .then((res) => res.json())
      .then((result) => setCourses(result));
  }, []);

  return <div className={classes.courses}>{}</div>;
};

export default courses;
