import React, { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import Post from "../../components/Post";
import server from "../../api";
import { AuthContext } from '../../context/auth-context';

import "../../index.css"

const HomePage = ({posts, fetchPosts}) => {
    const auth = useContext(AuthContext);
    const user = auth.user;
    useEffect(() => {
    }, [posts]);


    return (
        <div>
            <section>
                <div className="container">
                    <h1><span className="--text-green">Hello, {user.username}</span><br/>
                    Welcome Back!</h1>
                    {posts.map((post) => {
                        return (
                                <Post
                                    post={post}
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
                                    fetchPosts={() => fetchPosts()}
                                />
                        );
                    })}
                </div>
            </section>
        </div>
    );
}

export default HomePage;