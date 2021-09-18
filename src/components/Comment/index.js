import React from "react";
import CommentItems from "./CommentItems/CommentItems";
import CommentReply from "./CommentReply";


import "./style.css";

const Comment = ({id, username, createdAt, image, body, comments, originPostId, fetchOnePost}) => {
    return (
      <div className="comment-thread">
        <div >
          <div classNmae="user"> username {username} </div>
          <div className="create"> createdAt {createdAt} </div>
          <div className="user_img"> 
            <img className="nav__avatar" src={image} /> 
          </div>
          <div className="body"> body {body} </div>
    </div>

        <div className="comment-button">
          <CommentReply originCommentId={id} fetchOnePost={() => fetchOnePost()}/>
          <button type="button">Edit</button>
        </div>
        <div>
          {comments.map((comment) => (
            <CommentItems 
              comment={comment} 
              key={comment._id} 
              originCommentId={id} 
              fetchOnePost={() => fetchOnePost()}
            />
          ))}
        </div>
      </div>
    );
};

export default Comment;