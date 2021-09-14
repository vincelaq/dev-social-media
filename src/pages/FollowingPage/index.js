import React from "react";
import propTypes from "prop-types";
import Button from "@material-ui/Button";
import { unfollow, follow } from "./ProfilePage";

import './style.css';


//This component will show either Follow or Unfollow button depending on whether 
// the current user already a follower of the user in the profilw

const  FollowingPage = (props) => {
    const followClick = () => {
        props.onButtonClick(follow)
    }
    const unfollowClick = () => {
        props.onButtonClick(unfollow)
    }
    
    return (
        <div>
                {props.following
                ? (<Button variant="contained" color="secondary" onClick=
                    {unfollowClick}> unfollow </Button>) :
                (<Button variant="contained" color="primary" onClick=
                    {followClick}> follow </Button>)}
        </div>
        )
    }


FollowingPage.propTypes = {
    following: propTypes.bool.isRequired,
    onButtonClick: propTypes.func.isRequired,
}

export default FollowingPage;