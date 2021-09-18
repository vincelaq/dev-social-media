import React from "react";
import FollowProfile from "../FollowProfile";
import EditImage from "../EditImage";
import "./style.css";


// const slug = process.env.PUBLIC_URL + '/profile-bgs/';
// let bg = '';

// const rngBg = () => { 
//   const allBgs = [
//   "fakurian-design-E8Ufcyxz514-unsplash.jpg", 
//   "fakurian-design-nY14Fs8pxT8-unsplash.jpg",
//   "fakurian-design-PGdW_bHDbpI-unsplash.jpg",
//   "li-zhang-Ss0d-DIAtJ0-unsplash.jpg",
//   "li-zhang-xRRQlR8Qu-Y-unsplash.jpg",
//   "richard-horvath-is8jWT-mvng-unsplash.jpg"
//   ]
//   let i = Math.floor(Math.random() * allBgs.length)
//   bg = allBgs[i];

//   return bg;

// }

// rngBg();

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
      <div className="np__container">
        <div className="np__banner" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/profile-bgs/fakurian-design-E8Ufcyxz514-unsplash.jpg)`}}>
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
