import React, { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import Post from "../../components/Post";
import server from "../../api";
import { AuthContext } from '../../context/auth-context';

import "../../index.css"

const HomePage = () => {
    const auth = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const user = auth.user;

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
            const options = {
                headers: {
                    'Authorization': 'Bearer '+auth.token,
                    'Content-Type': 'application/json'
                }
            }
            let res = await server.get('posts', options);
            setPosts(res.data.data);
            console.log("POST SERVICE RESPONSE: ", res);
        } catch (err) {
            handleErrors(err);
        }
    };



    useEffect(() => {
        fetchPosts();
    }, []);


    return (
        <div>
            <section>
                <div className="container">
                    <h1><span className="--text-green">Hello, {user.username}</span><br/>
                    Welcome Back!</h1>
                    {posts.map((post) => {
                        return (
                            <Link to={{
                                pathname: '/post',
                                state: post,
                            }}>
                                <Post
                                    user={post.username}
                                    author={post.author}
                                    body={post.body}
                                    image={post.image}
                                    favLanguage={post.favLanguage}
                                    title={post.title}
                                    comments={post.comments}
                                    time={post.createdAt}
                                    key={post._id}
                                    likes={post.voteTotal}
                                    id={post._id}
                                    getPostsAgain={() => fetchPosts()}
                                />
                            </Link>

                        );
                    })}
                </div>
            </section>
        </div>
    );
}

export default HomePage;