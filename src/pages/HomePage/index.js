import React, { useState, useEffect } from "react";
import Post from "../../components/Post";
import PostForm from "../../components/PostForm";
import "../../index.css"

const HomePage = () => {
    const[posts, setPosts] = useState([]);

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
                <Posts/>
            </section>


        </div>
    );
}