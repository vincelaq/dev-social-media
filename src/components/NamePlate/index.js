import React from 'react';
import "./style.css";


const NamePlate = ({ username, jobTitle, image, bio, numberOfPosts, numberOfConnection}) => {
    return (
      <div>
        <div>username {username}</div>
        <div> jobTitle {jobTitle}</div>
        <div> image{image}</div>
        <div> {bio }</div>
        <div> numberOfPosts{ numberOfPosts }</div>
        <div> numberOfConnection {numberOfConnection} </div>
      </div>
    );
}

export default NamePlate;