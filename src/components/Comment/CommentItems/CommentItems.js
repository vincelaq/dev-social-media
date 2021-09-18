import React from "react";
import CommentReply from "../CommentReply";
import CommentEdit from "../CommentEdit";


import "./style.css";

const CommentItems = ({ comment, fetchOnePost, author }) => {
    const nestedComments = ( comment.comments || [] ).map(nestedComment => {
        return <CommentItems comment={nestedComment} key={nestedComment.id} />
    });

    return(
       <div className="nested-comment__wrapper">
            <div className="comment">
                <div className="comment--user"> username {comment.username} </div>
                <div className="comment--create"> createdAt {comment.createdAt} </div>
                <div className="comment--image"> <img className="nav__avatar" src={comment.image} /> </div>
                <div className="comment--body"> body {comment.body} </div>
            </div>
            <CommentReply originCommentId={comment._id} fetchOnePost={() => fetchOnePost()} />
            <CommentEdit originCommentId={comment._id} fetchOnePost={() => fetchOnePost()} />
            <div>
                {nestedComments.length > 0 && <div>{nestedComments}</div>}
            </div>
       </div> 
    )
};

export default CommentItems;