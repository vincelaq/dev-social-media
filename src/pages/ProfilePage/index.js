import React, {useState, useEffect } from "react";
import axios from "axios";
import Post from "../../components/Post";
import './style.css';

const ProfilePage = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        let res = await axios ({
            method: "get",
            url: "http://localhost:500-/api/posts/user/:uid",
            // replace uid with a different parameter
        })

        if (res.status === 200) {
            setPosts(res.data.data.reverse());
        }
        console.log("Post Incoming", res);
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div>
            ProfilePage
            {posts.map((post) => {
                return (
                    <Post
                )
            })}
        </div>
       
    )
}

export default ProfilePage;