import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";

import AuthService from "./services/auth.service";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import ModeratorBoard from "./components/BoardModerator";

import AdminBoard from "./components/BoardAdmin";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logout = () => {
    AuthService.logout();
  };

  return (
    <BrowserRouter>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <NavLink to={"/"} className="navbar-brand">
            JWT
          </NavLink>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink to={"/home"} className="nav-link">
                Home
              </NavLink>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <NavLink to={"/mod"} className="nav-link">
                  Moderator Board
                </NavLink>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <NavLink to={"/admin"} className="nav-link">
                  Admin Board
                </NavLink>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <NavLink to={"/user"} className="nav-link">
                  User
                </NavLink>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink to={"/profile"} className="nav-link">
                  {currentUser.username}
                </NavLink>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logout}>
                  Log out
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink to={"/login"} className="nav-link">
                  Login
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to={"/register"} className="nav-link">
                  Sign up
                </NavLink>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={ModeratorBoard} />
            <Route path="/admin" component={AdminBoard} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
