import React from "react";
import "./style.css";

const NamePlate = ({username, jobTitle, image, bio, numberOfPosts, numberOfConnections}) => {
    return(
       <div>
            <div> username {username} </div>
            <div> jobTitle {jobTitle} </div>
            <div> image {image} </div>
            <div> bio {bio} </div>
            <div> numberOfPosts {numberOfPosts} </div>
            <div> numberOfConnections {numberOfConnections} </div>
       </div> 
    )
};

export default NamePlate;