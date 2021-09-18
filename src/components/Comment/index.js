import React from "react";
import CommentItems from "./CommentItems/CommentItems";


import "./style.css";

const Comment = ({username, createdAt, image, body, comments}) => {
    return (
      <div className="comment-thread">
        <div >
          <div classNmae="user"> username {username} </div>
          <div className="create"> createdAt {createdAt} </div>
          <div className="user_img"> <img className="nav__avatar" src={image} /> </div>
          <div className="body"> body {body} </div>
    </div>

        {/* <div className="user">
          <img src="avatar/path" alt="User avatar" />
          <span> username {username} </span>
        </div>
        <div className="comment"> bady { body }</div>
        <textarea
          className="comment-field"
          placeholder="What are your thoughts?"
          name="comment"
          id="comment"
        /> */}

        <div className="comment-button">
          <button type="button">Reply</button>
          <button type="button">Edit</button>
        </div>
        <div>
          {comments.map((comment) => (
            <CommentItems comment={comment} key={comment._id} />
          ))}
        </div>
      </div>
    );
};

export default Comment;