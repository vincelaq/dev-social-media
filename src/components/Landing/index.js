import React from "react";
import { Route, Switch, Link, Redirect } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";

import './style.css';

const Landing = () => {


    return (
        <div className="landing-container">
            <div className="nav-wrapper">
                <div className="nav__logo">
                LOGO
                </div>
                <div className="nav__auth-wrapper">
                    <Link className="nav__auth-link" to="/">
                        Login
                    </Link>
                    <Link className="nav__auth-link" to="/register">
                        Signup
                    </Link>
                </div>
            </div>
            <Switch>
                <Route
                    exact
                    path="/"
                    render={(props) => <LoginPage {...props} />}
                />
                <Route
                    path="/register"
                    render={(props) => <RegisterPage {...props} />}
                />
                <Redirect to="/" />
            </Switch>
        </div>
    )
}

export default Landing;