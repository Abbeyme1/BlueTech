import React, { useState, useEffect } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import "./Navbar.css";
import { connect } from "react-redux";
import M from "materialize-css";
import * as actionCreator from "../../store/action/index";

const Navbar = ({ user, onlogout }) => {
  const history = useHistory();
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [date, setDate] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [day, setDay] = useState();
  const [time, setTime] = useState();
  const [searchUser, setSearchUser] = useState("");
  const [userList, setUserList] = useState([]);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  const logout = () => {
    localStorage.clear();
    M.toast({
      html: "Logged Out!",
      classes: "#c62828 red darken-1",
    });
    onlogout();
    return history.push("/signin");
  };

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

  const findUsers = (user) => {
    setSearchUser(user);
    fetch("/searchUser", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        query: user,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setUserList(result.user);
      });
  };

  return (
    <>
      <nav className="navbar">
        {user && user.lastLogin ? (
          // FOR USER
          <div className="navbar-container">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              BlueTech
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              <i className={click ? "fas fa-times" : "fas fa-bars"} />
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              {user ? (
                <div className="userDetails">
                  <li className="user">
                    {/* // TO ENROLL IN COURSES */}
                    <NavLink to="/courses" className="user">
                      <span>Courses</span>
                    </NavLink>
                  </li>

                  <li>
                    <div className="lastLogin">
                      <span>
                        <span>{day},</span>
                        <span>{date}-</span>
                        <span>{month}-</span>
                        <span>{year}</span>
                      </span>

                      <span> {time}</span>
                    </div>
                  </li>

                  <li className="user">
                    <NavLink to="/user" className="user">
                      <span>{user.name}</span>
                    </NavLink>
                  </li>

                  <li className="points">
                    <span>{user.points}</span>
                    <span>POINTS</span>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="#"
                      className="nav-links"
                      onClick={logout}
                      style={{ backgroundColor: "red" }}
                    >
                      LOG OUT
                    </Link>
                  </li>
                </div>
              ) : (
                <div>
                  <li className="nav-item">
                    <Link
                      to="/signin"
                      className="nav-links"
                      onClick={closeMobileMenu}
                    >
                      SIGN IN
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/signup"
                      className="nav-links"
                      onClick={closeMobileMenu}
                    >
                      SIGN UP
                    </Link>
                  </li>
                </div>
              )}
            </ul>
          </div>
        ) : (
          // FOR ADMIN

          <div className="navbar-container">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              BlueTech
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              <i className={click ? "fas fa-times" : "fas fa-bars"} />
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              {user ? (
                <div className="userDetails">
                  <li className="search">
                    <input
                      type="text"
                      className="searchBar"
                      placeholder="Search User"
                      value={searchUser}
                      onChange={(e) => findUsers(e.target.value)}
                    />
                    <div className="dropdown">
                      {searchUser && userList && (
                        <ul class="list">
                          {userList.map((user) => {
                            return (
                              <Link
                                to={`/showUser/${user._id}`}
                                className="listNavLink"
                              >
                                <li>
                                  <span className="searchName">
                                    {user.name}
                                  </span>
                                </li>
                              </Link>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  </li>
                  <li className="user">
                    <NavLink to="/user" className="user">
                      <span>{user.name}</span>
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="#"
                      className="nav-links"
                      onClick={logout}
                      style={{ backgroundColor: "red" }}
                    >
                      LOG OUT
                    </Link>
                  </li>
                </div>
              ) : (
                <div>
                  <li className="nav-item">
                    <Link
                      to="/signin"
                      className="nav-links"
                      onClick={closeMobileMenu}
                    >
                      SIGN IN
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/signup"
                      className="nav-links"
                      onClick={closeMobileMenu}
                    >
                      SIGN UP
                    </Link>
                  </li>
                </div>
              )}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onlogout: () => dispatch(actionCreator.clear()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
