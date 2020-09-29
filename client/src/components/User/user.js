import React, { useEffect, useState } from "react";
import classes from "./user.module.css";
import { connect } from "react-redux";
import * as actionCreators from "../../store/action/index";
import { NavLink } from "react-router-dom";

const User = ({ user, opUpdate }) => {
  const [date, setDate] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [day, setDay] = useState();
  const [time, setTime] = useState();
  const [attempted, setAttempted] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [todo, setTodo] = useState([]);
  const monthFun = (a) => {
    switch (a) {
      case 0:
        return "Jan";
      case 1:
        return "Feb";
      case 2:
        return "Mar";
      case 3:
        return "Apr";
      case 4:
        return "May";
      case 5:
        return "June";
      case 6:
        return "July";
      case 7:
        return "Aug";
      case 8:
        return "Sep";
      case 9:
        return "Oct";
      case 10:
        return "Nov";
      case 11:
        return "Dec";
    }
  };

  const dayFun = (d) => {
    switch (d.getDay()) {
      case 0:
        setDay("Sun");
        break;
      case 1:
        setDay("Mon");
        break;
      case 2:
        setDay("Tue");
        break;
      case 3:
        setDay("Wed");
        break;
      case 4:
        setDay("Thu");
        break;
      case 5:
        setDay("Fri");
        break;
      case 6:
        setDay("Sat");
        break;
      case 7:
        setDay("Sun");
        break;
    }
  };

  const getTo = (from) => {
    switch (from) {
      case "todo":
        return "attempted";
      case "attempted":
        return "completed";
    }
  };

  const courseSpan = (course, to) => {
    const due = new Date(course.dueDate);
    const now = Date.now();
    if (now > due && to != "completed") {
      console.log("unenroll", course._id);
      fetch("/unenroll", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          courseId: course._id,
        }),
      })
        .then((res) => res.json())
        .then((result) => console.log("REs", result));
      return null;
    }

    const dueDate = due.getDate();
    const dueMonth = due.getMonth();
    const dueHour = due.getHours();
    const dueMinutes = due.getMinutes();
    console.log("due ", due);
    return (
      <div
        style={{ backgroundColor: "wheat", marginBottom: "2px" }}
        class={classes.smallCard}
      >
        <p>
          {course.name} {to == "completed" && -course.points}
        </p>
        <p>
          {to == "completed" ? "SUMBITTED ON" : "DUEDATE"}:{" "}
          {dueDate +
            "-" +
            monthFun(dueMonth) +
            "  At " +
            dueHour +
            ":" +
            dueMinutes}
        </p>
        <button
          style={{ padding: "0 7px", margin: "5px 0" }}
          onClick={() => shift(to, course._id)}
        >
          PRESS
        </button>
        <br />
      </div>
    );
  };

  useEffect(() => {}, [attempted, completed, todo]);

  const shift = (from, id) => {
    console.log("shift ", id);
    const to = getTo(from);
    fetch("/shift", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        to,
        from,
        courseId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: result.name,
            email: result.email,
            lastLogin: result.lastLogin,
            points: result.points,
            _id: result._id,
          })
        );
        opUpdate(result.points);
        setAttempted(JSON.parse(JSON.stringify(result.attempted)));
        setCompleted(JSON.parse(JSON.stringify(result.completed)));
        setTodo(JSON.parse(JSON.stringify(result.todo)));
        window.location.reload(false);
      });
  };

  useEffect(() => {
    fetch("/userDetails", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setCompleted(result.completed);
        setAttempted(result.attempted);
        setTodo(result.todo);
      });
  }, []);

  useEffect(() => {
    if (user) {
      const d = new Date(user.lastLogin);

      setDate(d.getDate());
      setMonth(monthFun(d.getMonth()));
      setYear(d.getFullYear());
      dayFun(d);
      setTime(d.toLocaleTimeString());
    }
  }, [user]);

  // ! ADMINNNNN--------------------------------------

  const [users, getUsers] = useState([]);

  useEffect(() => {
    fetch("/allusers", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        getUsers(result.users);
      });
  }, []);

  return (
    <div className={classes.user}>
      {user && user.lastLogin ? (
        // FOR USER
        <div className={classes.courses}>
          <div className={classes.all}>
            <div className={classes.completed}>
              {completed.length != 0
                ? completed.map((course) => {
                    return courseSpan(course, "completed");
                  })
                : "YOU HAVE CURRENTLY NOTHING IN THIS"}
            </div>
            <div className={classes.attempted}>
              {attempted.length != 0
                ? attempted.map((course) => {
                    return courseSpan(course, "attempted");
                  })
                : "YOU HAVE CURRENTLY NOTHING IN THIS"}
            </div>
            <div className={classes.todo}>
              {todo.length != 0
                ? todo.map((course) => {
                    return courseSpan(course, "todo");
                  })
                : "YOU HAVE CURRENTLY NOTHING IN THIS"}
            </div>
          </div>
        </div>
      ) : (
        // FOR ADMIN

        <div className={classes.admin}>
          <p>USERS</p>
          {users &&
            users.map((user) => {
              console.log("User", user);
              return (
                <NavLink to={`/showUser/${user._id}`}>
                  <div className={classes.userCard}>{user.name}</div>{" "}
                </NavLink>
              );
            })}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    opUpdate: (points) => dispatch(actionCreators.update({ points: points })),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(User);

{
  /* <div className={classes.text}>
            <div className={classes.pointsCard}>
              <span>
                {user.points}

                <img
                  className={classes.coin}
                  src="data:image/png;base64,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"
                />
              </span>
              <span>POINTS</span>
            </div>
            <div className={classes.nameCard}>
              <span>{user.name}</span>
              <span>NAME</span>
            </div>
            <div className={classes.lastLoginCard}>
              <div>
                <span>{day},</span>
                <span>{date}-</span>
                <span>{month}-</span>
                <span>{year}</span>
              </div>
              <span>{time}</span>
              <span>TIME</span>
            </div>
          </div> */
}

// FOR USER DETAILS

{
  /* <div className={classes.card}>
        {user && (
          <table>
            <tr className={classes.info}>
              <td className={classes.pointstd}>
                <span>
                  {user.points}

                  <img
                    className={classes.coin}
                    src="data:image/png;base64,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"
                  />
                </span>
              </td>
              <td>
                <span>{user.name}</span>
              </td>
              <td>
                <div>
                  <span>{day},</span>
                  <span>{date}-</span>
                  <span>{month}-</span>
                  <span>{year}</span>
                </div>
                <span>{time}</span>
              </td>
            </tr>
            <tr className={classes.heading}>
              <td>POINTS</td>
              <td>NAME</td>
              <td>LAST-LOGIN</td>
            </tr>
          </table>
        )}
      </div> */
}
