import React from "react";
import "./style.css";

const NamePlate = ({
  username,
  jobTitle,
  image,
  bio,
  numberOfPosts,
  numberOfConnections,
}) => {
  return (
    <div className="NamePlate-container">
      <button class="follow-button">Follow</button>
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
