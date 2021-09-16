import React from "react";
import FollowProfile from "./FollowProfile";
import "./style.css";

const NamePlate = ({
  username,
  jobTitle,
  image,
  bio,
  numberOfPosts,
  numberOfConnections,
  following,
  id,
}) => {
    
  return (
    <div className="NamePlate-container">
      <FollowProfile id={id}/>
      <div className="image"> {image} </div>
      <div className="username"> {username} </div>
      <div className="jobTitle"> {jobTitle} </div>
      <div className="postAndConnections-container">
        <div className="numberOfPosts"> {numberOfPosts} Posts: </div>
        <div className="numberOfConnections">
          {" "}
          {numberOfConnections} Connections:{" "}
        </div>
      </div>
      <div className="bio"> {bio} </div>
    </div>
  );
};

export default NamePlate;
