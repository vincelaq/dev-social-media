import React from "react";
import CommentItems from "./CommentItems/CommentItems";
import CommentReply from "./CommentReply";
import CommentEdit from "./CommentEdit";


import "./style.css";

const Comment = ({id, author, username, createdAt, image, body, comments, originPostId, fetchOnePost}) => {
    console.log("author from Comment: ", author); 
    return (
      <div className="comment-thread">
        <div >
          <div className="user_img"> 
            <img className="nav__avatar" src={image} /> 
          </div>
          <div classNmae="user"> {username} </div>
          <div className="create"> {createdAt} </div>
          
          <div className="comment__body"> {body} </div>
    </div>

        <div className="comment-button">
          <CommentReply originAuthor={author} originCommentId={id} fetchOnePost={() => fetchOnePost()}/>
          <CommentEdit originAuthor={author} originCommentId={id} fetchOnePost={() => fetchOnePost()}/>
        </div>
        <div>
          {comments.map((comment) => (
            <CommentItems 
              originAuthor={author}
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