import React, { useContext } from "react";
import CommentItems from "./CommentItems/CommentItems";
import CommentReply from "./CommentReply";
import CommentEdit from "./CommentEdit";
import ReactTimeAgo from 'react-time-ago';
import { AuthContext } from '../../context/auth-context';


import "./style.css";

const Comment = ({comment, id, fetchOnePost}) => {
  const comments = comment.comments;
  const auth = useContext(AuthContext);
    return (
      <div className="comment-thread">
        <div className="comment-thread__main">
          <div className="user_img"> 
            <img className="comment__profile-image" alt="user avatar" src={comment.image} /> 
          </div>
          <div className="comment-thread__wrapper">
            <div className="comment-thread__username-time">
              <div className="user"> {comment.username} </div>
              <div className="create"><ReactTimeAgo date={comment.createdAt} locale="en-US"/></div>
            </div>
            <div className="body"> {comment.body} </div>
          </div>
        </div>

        <div className="comment-button">
          <CommentReply origComment={comment} originAuthor={comment.author} originCommentId={id} fetchOnePost={() => fetchOnePost()}/>
          {auth.user._id === comment.author && <CommentEdit comment={comment} fetchOnePost={() => fetchOnePost()}/> }
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