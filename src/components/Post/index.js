import React from "react";
// import Likes from "../Likes";
import "./styles.css";

const Post = ({ id, title, user, body, comments, time, likes, fetchPosts  }) => {
    
    

    return (
        <div>
            <div className="post__sidebar">
                Likes: {likes}
            </div>
            <div className="post-content-wrap">
                <div className="post__header">
                    <div className="post__profile-img-wrap">
                        <img className="post__profile-img"/>
                        <img className="post__profile-fav-lang"/>
                    </div>
                    <div>
                    <p className="post__username">Posted By: {user}</p>
                    <p className="post__time-posted">Time Posted: {time}</p>
                    </div>
                </div>
                    <h2>Title: {title}</h2>
                    <p>Body: {body}</p>
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
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>

        </div>
    )
}

export default Post;