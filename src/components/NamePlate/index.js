import React from "react";
import "./style.css";

const NamePlate = ({username, jobTitle, image, bio, numberOfPosts, numberOfConnections}) => {
    return(
       <div>
            <div className="username"> {username} </div>
            <div className="jobTitle"> {jobTitle} </div>
            <div className="image"> {image} </div>
            <div className="bio"> {bio} </div>
            <div className="numberOfPosts"> {numberOfPosts} </div>
            <div className="numberOfConnections"> {numberOfConnections} </div>
       </div> 
    )
};

export default NamePlate;