import React from "react";


import "./style.css";

const CommentItems = ({ comment }) => {
    const nestedComments = ( comment.comments || [] ).map(nestedComment => {
        return <CommentItems comment={nestedComment} key={nestedComment.id} />
    });

    return(
       <div>
            <div className="comment">
                <div className="comment--user"> username {comment.username} </div>
                <div className="comment--create"> createdAt {comment.createdAt} </div>
                <div className="comment--image"> image {comment.image} </div>
                <div className="comment--body"> body {comment.body} </div>
            </div>
            <button>Reply</button>
            <button>Edit</button>
            <div>
                {nestedComments.length > 0 && <div>{nestedComments}</div>}
            </div>
       </div> 
    )
};

export default CommentItems;