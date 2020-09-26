import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import classes from "./signin.module.css";
import M from "materialize-css";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import * as actionCreators from "../../store/action/index";

function Signin({ getUser }) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const postData = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      setEmail("");
      setPassword("");
      M.toast({
        html: "Invalid email",
        classes: "#c62828 red darken-1",
      });
      return;
    }

    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          M.toast({ html: data.error, classes: "#c62828 red darken-1" });
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          M.toast({
            html: "signedIn success!",
            classes: "#43a047 green darken-1",
          });
          getUser(data.user);
          history.push("/user");
        }
      });
  };

  return (
    <div className={classes.loginpage}>
      <div className={classes.form}>
        <div className={classes.loginform}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={postData}>login</button>
          <p className={classes.message}>
            Not registered?
            <Link to="/signup">Create an account</Link>
          </p>
          <div className={classes.or}>
            <div className={classes.line}></div>
            <span>OR</span>
            <div className={classes.line}></div>
          </div>

          <NavLink className={classes.forgotPassword} to="/reset">
            Forgot password?
          </NavLink>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (user) => dispatch(actionCreators.user(user)),
  };
};

export default connect(null, mapDispatchToProps)(Signin);
