import React from "react";
import { Route, Switch, Link, Redirect } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";

import './style.css';

const Landing = () => {


    return (
        <div className="container">
            <div className="horiz-nav">
                <div className="nav__logo">
                LOGO
                </div>
                <div className="nav__auth">
                    <Link to="/">
                        Login
                    </Link>
                    <Link to="/register">
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