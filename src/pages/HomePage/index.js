import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "../../components/Post";
import "../../index.css"

const HomePage = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        let res = await axios({
            method: 'get',
            url: 'http://localhost:5000/api/posts',
        })
        if (res.status === 200) {
            setPosts(res.data.data.reverse());
        }
        console.log("POST SERVICE RESPONSE: ", res);
    }

    useEffect(() => {
        fetchPosts();
    }, []);


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