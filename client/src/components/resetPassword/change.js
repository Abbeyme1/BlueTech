import React, { useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import "./reset.css";
import M from "materialize-css";

function Reset() {
  const { token } = useParams();
  const history = useHistory();
  const [password, setPassword] = useState("");

  const postData = () => {
    fetch("/new-password", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        token,
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
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={postData}>Submit Password</button>
        </div>
      </div>
    </div>
  );
}

export default Reset;
