import React from "react";
import CommentItems from "./CommentItems/CommentItems";
import CommentReply from "./CommentReply";
import CommentEdit from "./CommentEdit";
import ReactTimeAgo from 'react-time-ago';


import "./style.css";

const Comment = ({comment, id, author, username, createdAt, image, body, comments, originPostId, fetchOnePost}) => {
    console.log("author from Comment: ", author); 
    return (
      <div className="comment-thread">
        <div className="comment-thread__main">
          <div className="user_img"> 
            <img className="comment__profile-image" src={image} /> 
          </div>
          <div className="comment-thread__wrapper">
            <div className="comment-thread__username-time">
              <div classNmae="user"> {username} </div>
              <div className="create"><ReactTimeAgo date={createdAt} locale="en-US"/></div>
            </div>
            <div className="body"> {body} </div>
          </div>
        </div>

        <div className="comment-button">
          <CommentReply origComment={comment} originAuthor={author} originCommentId={id} fetchOnePost={() => fetchOnePost()}/>
          <CommentEdit origComment={comment} originAuthor={author} originCommentId={id} fetchOnePost={() => fetchOnePost()}/>
        </div>
        <div>
          {comments.map((comment) => (
            <CommentItems 
              originAuthor={comment.author}
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