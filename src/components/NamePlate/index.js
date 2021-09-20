import React from "react";
import FollowProfile from "../FollowProfile";
import EditImage from "../EditImage";
import EditBanner from "../EditBanner";

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
                <div className="image__mask">
                  <img className="np__avatar" alt="Your avatar, click to change" src={image} onClick={(e) => {
                          e.target.classList.toggle('active');
                          e.target.nextSibling.classList.toggle('active');
                  }}/>
                  <div className="image__drop-down">
                    <div>
                      <EditImage id={id} image={image} fetchUser={() => fetchUser()} />
                    </div>
                    <div>
                      <EditBanner id={id} banner={banner} fetchUser={() => fetchUser()} />
                    </div>
                  </div>  
                </div>
              </div>
        </div>
        <div className="np__content">
          <div className="--flex-row --flex-space-between --flex-align-center">
              <div>
                <div className="username"> {username} </div>
                <div className="jobTitle"> {jobTitle} </div>
              </div>
              <div className="np__stats">
                <p className="numberOfPosts"> {numberOfPosts} <span>Posts</span> </p>
                <p className="numberOfConnections">
                {" "}
                {numberOfConnections} <span>Connections</span>
                </p>
              </div>
              
          </div>
          <div className="bio"> " {bio} " </div>
        </div>
      </div>
  );
};

export default NamePlate;
