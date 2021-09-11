import React from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import ProfilePage from "../../pages/ProfilePage";
import "./styles.css";

const Nav = () => {
    return (
        <div>
            <nav className="verti-nav">
                <NavLink to="/" className="nav__logo">devBook</NavLink>
                <div className="nav__link-wrap">
                    <NavLink to="/" className="nav__link">
                        <img href="#" className="nav__link-icon" />
                        <p>Home</p>
                    </NavLink>
                    <NavLink to="/" className="nav__link">
                        <img href="#" className="nav__link-icon" />
                        <p>Following</p>
                    </NavLink>
                    <NavLink to="/profile" className="nav__link">
                        <img href="#" className="nav__link-icon" />
                        <p>Profile</p>
                    </NavLink>
                </div>
                <NavLink to="/" className="nav__link">
                    <img href="#" className="nav__link-icon" />
                    <p>Log out</p>
                </NavLink>
            </nav>
            <Switch>
                <Route
                    exact
                    path="/"
                    render={(props) => <HomePage {...props} />}
                />
                <Route
                    path="/profile"
                    render={(props) => <ProfilePage {...props} />}
                />
                <Route
                    path="/profile/:uid"
                    render={(props) => <ProfilePage {...props} />}
                />
                <Route
                    path="/login"
                    render={(props) => <LoginPage {...props} />}
                />
                <Route
                    path="/signup"
                    render={(props) => <RegisterPage {...props} />}
                />
            </Switch>
            <nav className="hori-nav">
                <div className="nav__search-bar">
                    <img href="#" className="search-icon" />
                    <input type="search" />
                </div>
                <div>
                    <button>Create a Post</button>
                    <img href="#" className="nav__profile-img" />
                </div>

            </nav>
        </div>
    )
}

export default Nav;