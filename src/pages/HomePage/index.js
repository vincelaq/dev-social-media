import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "../../components/Post";
import "../../index.css"

const HomePage = () => {
    const [posts, setPosts] = useState([]);

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
    } 


    const fetchPosts = async () => {
        try {
            let res = await axios({
            method: 'get',
            url: 'http://localhost:5000/api/posts',
            })
            setPosts(res.data.data);
            console.log("POST SERVICE RESPONSE: ", res);
        } catch (err) {
            handleErrors(err);
        }

    };


    useEffect(() => {
        fetchPosts();
    },[]);


    return (
        <div>
            HomePage
            {posts.map((post) => {
                    return (
                        <Post
                            user={post.username}
                            author={post.author}
                            body={post.body}
                            title={post.title}
                            comments={post.comments}
                            time={post.createdAt}
                            key={post._id}
                            likes={post.voteTotal}
                            id={post._id}
                            getPostsAgain={() => fetchPosts()}
                        />
                    );
                })}
        </div>
    );
}

export default HomePage;