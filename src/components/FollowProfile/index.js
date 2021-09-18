import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from '../../context/auth-context';
import server from '../../api';
import EditProfile from "../EditProfile";

const FollowProfile = ( {id, fetchUser, fetchPosts } ) => {
    const auth = useContext(AuthContext);
    const user = auth.user;
    const [isFollowing, setIsFollowing] = useState(false);
    const [isUser, setIsUser] = useState(false);

    const determineFollowing = () => {
        if (auth.user.following.includes(id)) {
            setIsFollowing(true)
        } else {
            setIsFollowing(false)
        }
    };

    const determineIfUser = () => {
        if (auth.user._id === id ) {
            setIsUser(true)
        } else {
            setIsUser(false)
        }
    };

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
            console.log("Error during posting")
            console.log(err.message)
        }
    } 

    const changeFollowing = async (e) => {
        e.preventDefault();
        try {
        
            const options = {
                headers: {
                    'Authorization': 'Bearer '+auth.token,
                    'Content-Type': 'application/json'
                }
            };
            
            const data = {}
            
            const res = await server.put(`users/follow/${id}`, data, options);

            console.log(res);

            if(isFollowing) {
                setIsFollowing(false);
            } else {
                setIsFollowing(true);
            }
            
        } catch (err) {
            handleErrors(err);
        }
    }

    useEffect(() => {
        fetchUser();
     },[isFollowing])

    useEffect(() => {
       determineFollowing();
       determineIfUser();
    },[])

    return (
        <div>
            { isUser ?
                <EditProfile user={user} fetchPosts={() => fetchPosts()} />
                    : isFollowing ?
                    <button className="profile__btn active" variant="contained" color="secondary" 
                onClick={changeFollowing}>unFollow</button>
                    : <button className="profile__btn" variant="contained" color="primary"
                    onClick={changeFollowing}>Follow</button>

            }
        </div>
    )
}

export default FollowProfile;