import React, { useContext } from "react";
import { Link } from "react-router-dom";
import EditPost from "../EditPost";
import { AuthContext } from "../../context/auth-context";
import server from '../../api';
// import Likes from "../Likes";
import "./styles.css";

const Post = ({ post, id, title, user, body, comments, time, likes, fetchPosts  }) => {
    const auth = useContext(AuthContext);
    
    const handleErrors = (err) => {
        if (err.response) {
            console.log("Problem with response")
            console.log(err.response)
            alert(err.response.data.message)
        } else if (err.request) {
            console.log("Problem with request")
            console.log(err.request)
            alert(err.request.data)
        } else {
            console.log("Error during homepage render")
            console.log(err.message)
        }
    };

    const handleDelete = async() => {
        if (auth.user._id === post.author) {
            try {
                const options = {
                    headers: {
                        'Authorization': 'Bearer '+auth.token,
                        'Content-Type': 'application/json'
                    }
                }
                let res = await server.delete(`posts/${id}`, options);
                console.log("POST DELETE RESPONSE: ", res);
                alert('Your post has been delete')
                fetchPosts();
            } catch (err) {
                handleErrors(err);
            }
        } else {
            alert('You are not authorized to delete this post!')
        }
    };

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
                <Link to={{ pathname: '/post', state: post }}>
                    <h2>Title: {title}</h2>
                </Link>
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
                    <EditPost id={id} fetchPosts={() => fetchPosts()} />
                    <button onClick={() => handleDelete()}>Delete</button>
                </div>
            </div>

        </div>
    )
}

export default Post;