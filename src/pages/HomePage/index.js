import React, { useContext } from "react";
import Post from "../../components/Post";
import { AuthContext } from '../../context/auth-context';

import "../../index.css"

const HomePage = ({posts, fetchPosts}) => {
    const auth = useContext(AuthContext);
    const user = auth.user;
    
    return (
        <div>
            <section>
                <div className="container">
                    <h1><span className="--text-green">Hello, {user.username}</span><br/>
                    Welcome Back!</h1>
                    {posts.map((post) => {
                        return (
                            <Post
                                allPosts={posts}
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
                                likeArray={post.likes}
                                dislikeArray={post.dislikes}
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