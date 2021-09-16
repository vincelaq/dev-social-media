import React, { useContext } from 'react';
import server from '../../../api'



const FollowingItem = ({user, auth, fetchFollowing}) => {
  let url;
  let avatar;
  if (process.env.NODE_ENV === "development") {
    url = "http://localhost:5000/api/";
  } else {
    url = "https://limitless-lowlands-64983.herokuapp.com/";
  }
  if (user.image && user.image.includes("gravatar")) {
    avatar = user.image;
  } else {
    avatar = `${url}${user.image}`;
  }
    
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
        console.log("Error during login");
        console.log(err.message);
      }
    };
    
    
    const changeFollowing = async () => {
    
    try {

        console.log(auth)

        const options = {
            headers: {
                'Authorization': 'Bearer '+auth.token,
                'Content-Type': 'application/json'
            }
        };


        const res = await server.put(`users/follow/${user.id}`, options);
        fetchFollowing()
        console.log(res);

    } catch (err) {
        handleErrors(err);
    }
}
    
    return (
       
            <div>
                userImage: <img src= {avatar} />
                username: {user.username}
                <button onClick={changeFollowing}> Unfollow </button>
            </div>
       
    )
};

export default FollowingItem;
