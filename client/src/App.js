import React, { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import Home from "./components/Home/Home";
import { Switch, Route, useHistory } from "react-router-dom";

import SignUp from "./components/Signup/signup";
import Signin from "./components/Signin/signin";
import Reset from "./components/resetPassword/reset";
import newPassword from "./components/resetPassword/change";

import Admin from "./components/Signin/admin";
import User from "./components/Signin/user";

import admin from "./components/Signup/admin";
import user from "./components/Signup/user";

import UserPage from "./components/User/user";
import courses from "./components/courses/courses";

import { connect } from "react-redux";
import * as actionCreators from "./store/action/index";

const App = ({ getUser }) => {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      getUser(user);
      // history.push("/user"); // ! CAN CHANGE LATER
    } else {
      if (!history.location.pathname.startsWith("/reset"))
        history.push("/signin");
    }
  }, []);

  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/signin/admin" component={Admin} />
        <Route path="/signin/user" component={User} />
        <Route path="/signup/admin" component={admin} />
        <Route path="/signup/user" component={user} />
        <Route path="/reset" exact component={Reset} />
        <Route path="/courses" component={courses} />
        <Route path="/user" exact component={UserPage} />
        <Route path="/reset/:token" component={newPassword} />
      </Switch>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (user) => dispatch(actionCreators.user(user)),
  };
};
export default connect(null, mapDispatchToProps)(App);
