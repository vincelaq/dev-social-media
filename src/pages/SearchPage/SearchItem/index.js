import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as UserService from '../../../api/UserService';
import * as PostService from '../../../api/PostService';
import { AuthContext } from "../../../context/auth-context";

import './style.css';

const SearchItem = ({user, fetchFollowing}) => {
    const auth = useContext(AuthContext);
    const [posts, setPosts] = useState([]);

    const handleErrors = (err) => {
      if (err.response) {
        console.log("Problem with response");
        console.log(err.response);
        alert(err.response.data.message);
      } else if (err.request) {
        console.log("Problem with request");
        console.log(err.request);
        alert(err.request.data);
      } else {
        console.log("Error during following item display");
        console.log(err.message);
      }
    };
    
    
    const changeFollowing = async () => {
      try {
          const res = await UserService.updateFollow(user._id, auth.token);
          fetchFollowing()
          console.log(res);

      } catch (err) {
          handleErrors(err);
      }
    }
    
    const fetchPosts = async () => {
      try {
          let res = await PostService.getAllPostsFromOneUser(user._id);
          console.log("fetchpost", res.data)
          if (res.status === 200) {
              setPosts(res.data.data);
          }
          console.log("Post Incoming", res);
  
      } catch (err) {
          alert(err)
      }
    }    

    useEffect(() => {
      fetchPosts();
      fetchFollowing();
  }, []);
    
    return (
       
            <div className="following-item__wrapper">
                <Link to={{pathname: `/profile/${user._id}`, user, posts }}>
                  <img className="nav__avatar" src={user.image} />
                </Link>
                <div className="following-item__content following-item__username">{user.username} </div>
                <div className="following-item__content">{user.email} </div>
                { user.followers.includes(auth.user._id) ?
                  <button onClick={changeFollowing}> Unfollow </button>
                  : <button onClick={changeFollowing}> Follow </button> }
            </div>
       
    )
};

export default SearchItem;
