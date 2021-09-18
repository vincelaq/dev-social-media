import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditPost from "../EditPost";
import { AuthContext } from "../../context/auth-context";
import server from '../../api';
// import Likes from "../Likes";
import "./styles.css";


const Post = ({ post, image, allPosts, id, author, title, user, body, comments, time, likes, likeArray, dislikeArray, fetchPosts }) => {
    const auth = useContext(AuthContext);
    const [likeCount, setLikeCount] = useState(likes);
    const [isInLikes, setIsInLikes] = useState(false);
    const [isInDislikes, setIsInDislikes] = useState(false);

    const voteArrayCheck = () => {
        if (likeArray.includes(auth.user._id)) {
            setIsInLikes(true);
        } else {
            setIsInLikes(false);
        }
        if (dislikeArray.includes(auth.user._id)) {
            setIsInDislikes(true);
        } else {
            setIsInDislikes(false);
        }
    };    

    // API UPDATE LIKES
    const updateLike = async () => {
        try {
            const data = {};
            const options = {
                headers: {
                    'Authorization': 'Bearer ' + auth.token,
                }
            }
            const res = await server.put(`posts/like/${id}`, data, options);
            console.log("Post Component Like Response: ", res);
            fetchPosts();
            voteArrayCheck();
        } catch (err) {
            handleErrors(err);
        }
    };

    // API UPDATE DISLIKES
    const updateDislike = async () => {
        try {
            const data = {};
            const options = {
                headers: {
                    'Authorization': 'Bearer ' + auth.token,
                }
            }
            const res =await server.put(`posts/dislike/${id}`, data, options);
            console.log("Post Component Disike Response: ", res);
            fetchPosts();
            voteArrayCheck();
        } catch (err) {
            handleErrors(err);
        }
    };

    // COLOR LIKE / DISLIKE BUTTON DEPENDING ON WHICH IS CLICKED
    const likesDislikes = (e) => {
  
        e.preventDefault()

        // ADD OR SUBTRACT LIKES
        if (e.target.id === 'like'){
            if (isInLikes) {
                setIsInLikes(false)
                updateLike();
                setLikeCount(likeCount-1);
            } else {
                setIsInLikes(true)
                updateLike();
                setLikeCount(likeCount+1);
            }
        } else if (e.target.id === 'dislike'){
            if (isInDislikes) {
                setIsInDislikes(false)
                updateDislike();
                setLikeCount(likeCount+1);
            } else {
                setIsInDislikes(true)
                updateDislike();
                setLikeCount(likeCount-1);
            }
        }

        // COLOR LIKE / DISLIKE BUTTON DEPENDING ON WHICH IS CLICKED
        let elements = document.getElementsByTagName('path');
        for(let x=0; x<elements.length; x++){
            if(elements[x].classList.contains('active-svg'))
            elements[x].classList.remove('active-svg');
        }
        
        let paths = e.target.getElementsByTagName('path');
        
        console.log(paths);
        for(let i=0; i<paths.length; i++){
             paths[i].classList.toggle('active-svg');
        }
    }


    
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


    const handleDelete = async () => {
        if (auth.user._id === post.author) {

            try {
                const options = {
                    headers: {
                        'Authorization': 'Bearer ' + auth.token,
                        'Content-Type': 'application/json'
                    }
                }
                let res = await server.delete(`posts/${id}`, options);
                console.log("Post Component Delete Response: ", res);
                alert('Your post has been delete')
                fetchPosts();
            } catch (err) {
                handleErrors(err);
            }
        } else {
            alert('You are not authorized to delete this post!')
        }
    };

    let numberOfComments;
    if(comments && Object.keys(comments).length > 0 ) {
        numberOfComments = Object.keys(comments).length
    } else {
        numberOfComments = 0;
    }

    useEffect(() => {
    },[])
    

    return (
        <div className="post --flex-row">
            <div className="post__sidebar">

            {/* ADD LIKE FUNCTIONALITY */}
            <a onClick={ (e) => likesDislikes(e)} id="like">
                <svg width="18" height="9" viewBox="0 0 18 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.06498 0.834961V3.74496H0.22998V5.57496H3.06498V8.48496H5.04498V5.57496H7.87998V3.74496H5.04498V0.834961H3.06498Z" className="like" fill="#E4E4E4"/>
                    <path d="M13.1724 0.834961V3.74496H10.3374V5.57496H13.1724V8.48496H15.1524V5.57496H17.9874V3.74496H15.1524V0.834961H13.1724Z" className="like" fill="#E4E4E4"/>
                </svg>
            </a>
                <p>{likeCount}</p>
            {/* ADD DISLIKE FUNCTIONALITY */}
            <a onClick={ (e) => likesDislikes(e)} id="dislike">
                <svg width="19" height="3" viewBox="0 0 19 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.815 0.308613L10.655 0.308613L10.655 2.07861L18.815 2.07861L18.815 0.308613Z" className="dislike" fill="#E4E4E4"/>
                    <path d="M8.28278 0.308612L0.122774 0.308612L0.122774 2.07861L8.28278 2.07861L8.28278 0.308612Z" className="dislike" fill="#E4E4E4"/>
                </svg>
            </a>
                
            </div>
            <div className="post__content-wrap">
                <div className="post__header">
                    <div className="post__profile-img-wrap">
                        <img className="post__profile-img" src={`${image}`} />
                        <img className="post__profile-fav-lang" />
                    </div>
                    <div>
                     <Link to={{ pathname: `/profile/${author}`, user, posts: allPosts }}> 
                        <p className="post__username">{user}</p>
                     </Link>   
                        <p className="post__time-posted">Time Posted: {time}</p>
                    </div>
                </div>
               
                    <h2>{title}</h2>
                
                <p className="post__body">{body}</p>
                <a className="post__comment-btn">
                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.33333 14C3.20092 14.0008 3.07127 13.9621 2.96092 13.8889C2.85058 13.8157 2.76453 13.7113 2.71375 13.589C2.66298 13.4667 2.64977 13.332 2.67581 13.2022C2.70186 13.0724 2.76598 12.9532 2.86 12.86L5.13333 10.5867C5.31967 10.4001 5.54105 10.2522 5.78475 10.1515C6.02845 10.0509 6.28965 9.99935 6.55333 10H14C14.1768 10 14.3464 9.92976 14.4714 9.80474C14.5964 9.67971 14.6667 9.51014 14.6667 9.33333V2C14.6667 1.82319 14.5964 1.65362 14.4714 1.5286C14.3464 1.40357 14.1768 1.33333 14 1.33333H2C1.82319 1.33333 1.65362 1.40357 1.5286 1.5286C1.40357 1.65362 1.33333 1.82319 1.33333 2V9.33333C1.33333 9.51014 1.40357 9.67971 1.5286 9.80474C1.65362 9.92976 1.82319 10 2 10H2.66667C2.84348 10 3.01305 10.0702 3.13807 10.1953C3.2631 10.3203 3.33333 10.4899 3.33333 10.6667C3.33333 10.8435 3.2631 11.013 3.13807 11.1381C3.01305 11.2631 2.84348 11.3333 2.66667 11.3333H2C1.46957 11.3333 0.960859 11.1226 0.585786 10.7475C0.210714 10.3725 0 9.86377 0 9.33333L0 2C0 1.46957 0.210714 0.960859 0.585786 0.585786C0.960859 0.210714 1.46957 0 2 0L14 0C14.5304 0 15.0391 0.210714 15.4142 0.585786C15.7893 0.960859 16 1.46957 16 2V9.33333C16 9.86377 15.7893 10.3725 15.4142 10.7475C15.0391 11.1226 14.5304 11.3333 14 11.3333H6.55333C6.4656 11.3328 6.37862 11.3496 6.2974 11.3828C6.21617 11.416 6.14229 11.4649 6.08 11.5267L3.80667 13.8067C3.74437 13.8685 3.6705 13.9173 3.58927 13.9505C3.50805 13.9837 3.42107 14.0005 3.33333 14Z" fill="var(--softWhite)" />
                    </svg>
                    <Link to={{ pathname: `/post/${id}`, post, comments }}>
                        <span>{comments.length} Comments</span>
                    </Link>
                </a>
            </div>

            {/* If post belongs to you display edit and delete links*/}
            <div className="post__elipses-wrap">
                <div className="elipses__mask">
                    <figure id="elipses" onClick={(e) => {
                        e.target.classList.toggle('active');
                        e.target.nextSibling.classList.toggle('active');
                    }}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </figure>
                    <div className="elipses__drop-down">
                        <div><EditPost id={id} fetchPosts={() => fetchPosts()} /></div>
                        <div><a onClick={() => handleDelete()}>Delete</a></div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Post;