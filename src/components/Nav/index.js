import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import loginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import "./styles.css";

const Nav = () => {
    return (
        <div>
            <nav className="verti-nav">
                <Link to="/" className="nav__logo">devBook</Link>
                <div className="nav__link-wrap">
                    <Link to="/" className="nav__link">
                        <img className="nav__link-icon" />
                        <p>Home</p>
                    </Link>
                    <Link to="/" className="nav__link">
                        <img className="nav__link-icon" />
                        <p>Following</p>
                    </Link>
                    <Link to="/" className="nav__link">
                        <img className="nav__link-icon" />
                        <p>Profile</p>
                    </Link>
                </div>
                <Link to="/" className="nav__link">
                    <img className="nav__link-icon" />
                    <p>Log out</p>
                </Link>
            </nav>
            <Switch>
                <Route
                    exact
                    path="/"
                    render={(props) => <HomePage {...props} />}
                />
                <Route
                    path="/me"
                    render={(props) => <ProfilePage {...props} />}
                />
                <Route
                    path="/user/:id"
                    render={(props) => <ProfilePage {...props} />}
                />
                <Route
                    path="/login"
                    render={(props) => <LoginPage {...props} />}
                />
                <Route
                    path="/signup"
                    render={(props) => <SignupPage {...props} />}
                />
            </Switch>
            <nav className="hori-nav">
                <div className="nav__search-bar">
                    <img className="search-icon" />
                    <input type="search" />
                </div>
                <div>
                    <button>Create a Post</button>
                    <img className="nav__profile-img" />
                </div>

            </nav>
        </div>
    )
}

export default Nav;