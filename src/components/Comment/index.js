import React from "react";
import "./style.css";

const Comment = ({username, createdAt, image}) => {
    return(
       <div>
            <div> username {username} </div>
            <div> createdAt {createdAt} </div>
            <div> image {image} </div>
            <div> body {body} </div>
       </div> 
    )
};

export default Comment;