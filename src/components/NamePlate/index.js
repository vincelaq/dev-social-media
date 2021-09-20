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
  fetchUser,
  banner
}) => {
    
  return (     
      <div className="np__container">
        <div className="np__banner" style={{backgroundImage: `url(${banner}`}}>
            <FollowProfile id={id} username={username} fetchUser={()=>fetchUser()} fetchPosts={() => fetchPosts()} />
              <div className="np__profile-img"> 
                <EditImage id={id} image={image} fetchUser={() => fetchUser()} /> 
              </div>
        </div>
        <div className="np__content">
          <div className="--flex-row --flex-space-between --flex-align-center">
              <div>
                <div className="username"> {username} </div>
                <div className="jobTitle"> {jobTitle} asdasd</div>
              </div>
              <div className="np__stats">
                <p className="numberOfPosts"> {numberOfPosts} <span>Posts</span> </p>
                <p className="numberOfConnections">
                {" "}
                {numberOfConnections} <span>Connections</span>
                </p>
              </div>
              
          </div>
          <div className="bio"> {bio} </div>
        </div>
      </div>
  );
};

export default NamePlate;
