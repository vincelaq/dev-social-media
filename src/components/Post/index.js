import React from "react";
// import Likes from "../Likes";
import "./styles.css";

const Post = ({ id, title, author, body, comments, getPostsAgain  }) => {
    
    return (
        <div>
            <div className="post__sidebar">
                {/* <Likes/> */}
            </div>
            <div className="post-content-wrap">
                <div className="post__header">
                    <div className="post__profile-img-wrap">
                        <img className="post__profile-img"/>
                        <img className="post__profile-fav-lang"/>
                    </div>
                    <div>
                    <p className="post__username">{author}</p>
                    <p className="post__time-posted">time-posted</p>
                    </div>
                </div>
                    <h2>{title}</h2>
                    <p>{body}</p>
                    <button className="post__comment-btn">
                        <img/>
                        <span>{comments.length}</span>
                    </button>
            </div>

            {/* If post belongs to you display edit and delete links*/}
            <div className="post__elipses-wrap">
                <figure id="elipses">
                    <figure></figure>
                    <figure></figure>
                    <figure></figure>
                </figure>
                <div className="elipses__drop-down">
                    <a href="#">Edit</a>
                    <a href="#">Delete</a>
                </div>
            </div>

        </div>
    )
}

export default Post;