import React, { useState, useEffect } from "react";
import Post from "../../components/Post";
import Nav from "../../components/Nav"
import Filters from "../../components/Filters"
// import PostForm from "../../components/PostForm";
import "../../index.css"

const HomePage = () => {
    const[posts, setPosts] = useState([]);

    async function fetchPosts() {
        let res = await posts.getAllUserPosts();
        if (res.status === 200) {
            setPosts(res.data.data.reverse());
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div>
            <Nav/>
            <section className="section-main">
                <div className="container">
                    <h1 style="margin-bottom: 80px"><span className="span-green">Hello, USERNAME</span>
                    <br/>
                    Welcome Back!</h1>
                </div>
                <Filters/>
                {posts.map((post) => {
                    // console.log("WHICH DATA AM I USING: ", post);
                    return (
                        <Post
                            author={post.author}
                            body={post.body}
                            title={post.title}
                            key={post._id}
                            id={post._id}
                            comments={post.comments}
                            getPostsAgain={() => fetchPosts()}
                        />
                    )
                })}
            </section>


        </div>
    );
}

export default HomePage;