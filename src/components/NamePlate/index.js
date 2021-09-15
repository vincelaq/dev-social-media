import React from "react";
import "./style.css";

const NamePlate = ({username, jobTitle, image, bio, numberOfPosts, numberOfConnections}) => {
    return(
       <div className="NamePlate-container">
            <div className="image"> {image} </div>
            <div className="username"> {username} </div>
            <div className="jobTitle"> {jobTitle} </div>
            <div className="bio"> {bio} </div>
            <div className="numberOfPosts"> Posts: {numberOfPosts} </div>
            <div className="numberOfConnections"> Connections: {numberOfConnections} </div>
       </div> 
    )
};

export default NamePlate;