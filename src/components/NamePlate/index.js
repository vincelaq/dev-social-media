import React from "react";
import FollowProfile from "../FollowProfile";
import EditImage from "../EditImage";
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
  fetchPosts,
  fetchUser
}) => {
    
  return (
    <div className="NamePlate-container">
      <FollowProfile id={id} username={username} fetchUser={()=>fetchUser()} fetchPosts={() => fetchPosts()} />
      <div className="image"> <EditImage id={id} image={image} fetchUser={() => fetchUser()} /> </div>
      <div className="username"> {username} </div>
      <div className="jobTitle"> {jobTitle} </div>
      <div className="postAndConnections-container">
        <div className="numberOfPosts"> {numberOfPosts}  Posts </div>
        <div className="numberOfConnections">
          {" "}
          {numberOfConnections}  Connections{" "}
        </div>
      </div>
      <div className="bio"> {bio} </div>
    </div>
  );
};

export default NamePlate;
