import React from "react";


import "./style.css";

const Comment = ({username, createdAt, image, body, comments}) => {
    return(
       <div>
            <div>
                <div> username {username} </div>
                <div> createdAt {createdAt} </div>
                <div> image {image} </div>
                <div> body {body} </div>
            </div>
       </div> 
    )
};

export default Comment;