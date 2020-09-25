import React from "react";
import "../../App.css";
import { Button } from "../Buttons/Button";
import "./HeroSection.css";

function HeroSection() {
  return (
    <div className="hero-container">
      <h1>LET'S LEARN</h1>
      <p>What are you waiting for?</p>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="button--outline"
          buttonSize="button--large"
        >
          GET STARTED
        </Button>

        {/* // DUMMY BUTTON JUST FOR STYLE */}
        <Button
          className="btns"
          buttonStyle="button--primary"
          buttonSize="button--large"
          onClick={console.log("hey")}
        >
          WATCH TRAILER <i className="far fa-play-circle" />
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
