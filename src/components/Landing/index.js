import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";


const Landing = () => {


    return (
        <div>
            <div>
                LOGO
                <Link to="/">
                    Login
                </Link>
                <Link to="/register">
                    Signup
                </Link>
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
            </Switch>
        </div>
    )
}

export default Landing;