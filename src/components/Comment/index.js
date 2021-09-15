import React from "react";
import CommentItems from "./CommentItems/CommentItems";


import "./style.css";

const Comment = ({username, createdAt, image, body, comments}) => {
    return(
       <div>
            <div className="main-comment">
                <div> username {username} </div>
                <div> createdAt {createdAt} </div>
                <div> image {image} </div>
                <div> body {body} </div>
            </div>
            <div>
                <button>Reply</button>
                <button>Edit</button>
            </div>
            <div>
                {comments.map(comment => (
                    <CommentItems comment={comment} key={comment._id} />
                ))}
            </div>
       </div> 
    )
};

export default Comment;