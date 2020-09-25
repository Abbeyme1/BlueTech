import React, { useState } from "react";
import "./reset.css";
import M from "materialize-css";
import { useHistory } from "react-router";

function Reset() {
  const [email, setEmail] = useState("");
  const history = useHistory();
  const postData = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      setEmail("");
      M.toast({
        html: "Invalid email",
        classes: "#c62828 red darken-1",
      });
      return;
    }

    fetch("/reset-password", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#c62828 red darken-1" });
        } else {
          M.toast({
            html: data.message,
            classes: "#43a047 green darken-1",
          });
          history.push("/signin");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div class="login-page">
      <div class="form">
        <div class="login-form">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button onClick={postData}>Reset Password</button>
        </div>
      </div>
    </div>
  );
}

export default Reset;
