import React, { useContext, Fragment } from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import HomePage from "../../pages/HomePage";
import FollowingPage from "../../pages/FollowingPage";
import ProfilePage from "../../pages/ProfilePage";
import "./styles.css";

const Nav = () => {
    const auth = useContext(AuthContext);
    
    return (
        <Fragment>
            
                <nav className="verti-nav">
                    <NavLink to="/" className="nav__logo">devBook</NavLink>
                    <div className="nav__link-wrap">
                        <NavLink to="/" className="nav__link">
                            <img href="#" className="nav__link-icon" />
                            <p>Home</p>
                        </NavLink>
                        <NavLink to="/profile" className="nav__link">
                            <img href="#" className="nav__link-icon" />
                            <p>Profile</p>
                        </NavLink>
                        <NavLink to="/following" className="nav__link">
                            <img href="#" className="nav__link-icon" />
                            <p>Following</p>
                        </NavLink>
                    </div>
                    <NavLink to="/logout" className="nav__link">
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
                        path="/following"
                        render={(props) => <FollowingPage {...props} />}
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
                    <div>Hello, Username AVATAR</div>
                </nav>
        </Fragment>
    )
}

export default Nav;