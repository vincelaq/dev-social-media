import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from '../../context/auth-context';

const FollowProfile = ( {id} ) => {
    const auth = useContext(AuthContext);
    const user = auth.user;
    const [isFollowing, setIsFollowing] = useState(false)

const determineFollowing = () => {
    if (user.following.includes(id)) {
        setIsFollowing(true)
    } else {
        setIsFollowing(false)
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
        
        const res = await server.put(`users/follow/${id}`, dataArray, options);

        console.log(res);
        setIsFollowing(false)
    } catch (err) {
        handleErrors(err);
    }
}

    console.log(FollowProfile, "follow button pressed");

    useEffect(() => {
        determineFollowing()
    },[])

    return (
        <div>
            { isFollowing
            ? (<button variant="contained" color="secondary" 
                onClick={changeFollowing}>unFollow</button>)
            : (<button variant="contained" color="primary"
                onClick={changeFollowing}>Follow</button>)
            }
        </div>
    )
}

export default FollowProfile;