import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import server from '../../../api';
import { AuthContext } from "../../../context/auth-context";

import './style.css';

const FollowingItem = ({user, fetchFollowing}) => {
    const auth = useContext(AuthContext);

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
          console.log(auth)

          const options = {
            headers: {
                'Authorization': 'Bearer ' + auth.token,
                'Content-Type': 'application/json'
            }
          }
          const data = {

          }

          const res = await server.put(`users/follow/${user._id}`, data, options);
          fetchFollowing()
          console.log(res);

      } catch (err) {
          handleErrors(err);
      }
    }

        

    
    return (
       
            <div className="following-item__wrapper">
                <Link to={{pathname: '/profile', user}}>
                  <img className="nav__avatar" src={user.image} />
                </Link>
                <div className="following-item__content following-item__username">{user.username} </div>
                <div className="following-item__content">{user.email} </div>
                <button onClick={changeFollowing}> Unfollow </button>
            </div>
       
    )
};

export default FollowingItem;
