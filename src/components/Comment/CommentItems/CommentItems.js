import React, { useContext } from "react";
import CommentReply from "../CommentReply";
import CommentEdit from "../CommentEdit";
import ReactTimeAgo from 'react-time-ago';
import { AuthContext } from '../../../context/auth-context';


import "./style.css";

const CommentItems = ({ comment, fetchOnePost }) => {
    const auth = useContext(AuthContext);
    const nestedComments = ( comment.comments || [] ).map(nestedComment => {
        return <CommentItems comment={nestedComment} key={nestedComment.id} />
    });

    return(
       <div className="nested-comment__wrapper">
            <div className="comment-thread__main">
                <div className="user_img"> 
                    <img className="comment__profile-image" alt="user avatar" src={comment.image} /> 
                </div>
                <div className="comment-thread__wrapper">
                    <div className="comment-thread__username-time">
                        <div className="user"> {comment.username} </div>
                        <div className="create"> <ReactTimeAgo date={comment.createdAt} locale="en-US"/> </div>
                    </div>
                    <div className="body"> {comment.body} </div>
                </div>
            </div>
            <div className="comment-button">
                <CommentReply originCommentId={comment._id} fetchOnePost={() => fetchOnePost()} />
                { auth.user._id === comment.author && <CommentEdit originCommentId={comment._id} fetchOnePost={() => fetchOnePost()} /> }
            </div>
            <div>
                {nestedComments.length > 0 && <div>{nestedComments}</div>}
            </div>
       </div> 
    )
};

export default CommentItems;