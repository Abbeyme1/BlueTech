import React from "react";
import classes from "./toggle.module.css";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className={classes.loginpage}>
      <div className={classes.form}>
        <Link to="/signup/user">
          <div className={classes.user}>
            <img src="https://cdn.iconscout.com/icon/free/png-256/account-118-267425.png" />
            <p>User</p>
          </div>
        </Link>
      </div>

      <div className={classes.form}>
        <Link to="/signup/admin">
          <div className={classes.admin}>
            <img src="https://www.seekpng.com/png/detail/301-3017478_click-here-to-explore-tutorials-and-technology-training.png" />
            <p>Admin</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
