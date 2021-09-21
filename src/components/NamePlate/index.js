import React, { useContext, Fragment } from "react";
import { AuthContext } from "../../context/auth-context";
import FollowProfile from "../FollowProfile";
import EditImage from "../EditImage";
import EditBanner from "../EditBanner";

import "./style.css";

const NamePlate = ({
  user,
  numberOfPosts,
  numberOfConnections,
  id,
  fetchPosts,
  fetchUser,
}) => {
  const auth = useContext(AuthContext);  
  return (     
      <div className="np__container">
        <div className="np__banner" style={{backgroundImage: `url(${user.banner}`}}>
            <FollowProfile user={user} id={id} username={user.username} fetchUser={() => fetchUser()} fetchPosts={() => fetchPosts()} />
              <div className="np__profile-img"> 
                <div className="image__mask">
                  {auth.user._id === id ? 
                    <Fragment>
                      <img className="np__avatar" alt="Your avatar, click to change" src={user.image} onClick={(e) => {
                              e.target.classList.toggle('active');
                              e.target.nextSibling.classList.toggle('active');
                      }}/>
                      <div className="image__drop-down">
                        <div>
                          <EditImage id={id} image={user.image} fetchUser={() => fetchUser()} />
                        </div>
                        <div>
                          <EditBanner id={id} banner={user.banner} fetchUser={() => fetchUser()} />
                        </div>
                      </div>
                    </Fragment>
                    :
                    <img className="np__avatar" alt="Your avatar, click to change" src={user.image} />}
                </div>
              </div>
        </div>
        <div className="np__content">
          <div className="--flex-row --flex-space-between --flex-align-center">
              <div>
                <div className="username"> {user.username} </div>
                { user.jobTitle ?
                  <div className="jobTitle"> {user.jobTitle} </div>
                  :
                  <div className="jobTitle"> No job title yet </div>
                }
              </div>
              <div className="np__stats">
                <p className="numberOfPosts"> {numberOfPosts} <span>Posts</span> </p>
                <p className="numberOfConnections">
                {" "}
                {numberOfConnections} <span>Connections</span>
                </p>
              </div>
              
          </div>
          { user.bio ? 
            <div className="bio"> " {user.bio} " </div>
            :
            <div className="bio"> No bio yet </div> }
        </div>
      </div>
  );
};

export default NamePlate;
