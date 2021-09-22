import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from '../../context/auth-context';
import * as UserService from '../../api/UserService';
import EditProfile from "../EditProfile";

const FollowProfile = ( {id, user, fetchUser, fetchPosts } ) => {
    const auth = useContext(AuthContext);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isUser, setIsUser] = useState(false);

    const determineFollowing = () => {
        if (user.followers.includes(auth.user._id)) {
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
            const res = await UserService.updateFollow(id, auth.token);

            console.log("Change Following response: ", res);

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
                <EditProfile user={user} fetchPosts={() => fetchPosts()} fetchUser={() => fetchUser()} />
                    : isFollowing ?
                    <button className="profile__btn active" variant="contained" color="secondary" 
                onClick={changeFollowing}>Unfollow</button>
                    : <button className="profile__btn" variant="contained" color="primary"
                    onClick={changeFollowing}>Follow</button>

            }
        </div>
    )
}

export default FollowProfile;