import React from "react";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import Home from "./components/Home/Home";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import SignUp from "./components/Signup/signup";
import Signin from "./components/Signin/signin";
import Reset from "./components/resetPassword/reset";
import newPassword from "./components/resetPassword/change";

import Admin from "./components/Signin/admin";
import User from "./components/Signin/user";

import admin from "./components/Signup/admin";
import user from "./components/Signup/user";

function App() {
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
        <Route path="/reset/:token" component={newPassword} />
      </Switch>
    </>
  );
}

export default App;
