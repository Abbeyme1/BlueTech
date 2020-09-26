import React from "react";
import "../../App.css";
import { Button } from "../Buttons/Button";
import "./HeroSection.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const HeroSection = ({ user }) => {
  console.log("hero", user);
  return (
    <div className="hero-container">
      <h1>LET'S LEARN</h1>
      <p>What are you waiting for?</p>
      <div className="hero-btns">
        {user != null && user ? (
          <Link to="/signup">
            <Button
              className="btns"
              buttonStyle="button--outline"
              buttonSize="button--large"
            >
              GET STARTED
            </Button>
          </Link>
        ) : (
          <Link to="/signin">
            <Button
              className="btns"
              buttonStyle="button--outline"
              buttonSize="button--large"
            >
              GET STARTED
            </Button>
          </Link>
        )}

        {/* // DUMMY BUTTON JUST FOR STYLE */}
        <Button
          className="btns"
          buttonStyle="button--primary"
          buttonSize="button--large"
        >
          WATCH TRAILER <i className="far fa-play-circle" />
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state,
  };
};

export default connect(mapStateToProps)(HeroSection);
