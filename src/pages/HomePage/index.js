import React, { useContext } from "react";
import Post from "../../components/Post";
import { AuthContext } from '../../context/auth-context';

import "./style.css"

const HomePage = ({posts, fetchPosts}) => {
    const auth = useContext(AuthContext);
    const user = auth.user;
    
    const handleAllSort = () => {
        const allSort = document.getElementById('all-sort');
        const followingSort = document.getElementById('following-sort');

        if (!allSort.classList.contains("active")) {
            allSort.classList.add('active');
            followingSort.classList.remove('active')
            // insert function for all sort
        }
    }

    const handleFollowingSort = () => {
        const allSort = document.getElementById('all-sort');
        const followingSort = document.getElementById('following-sort');

        if (!followingSort.classList.contains("active")) {
            allSort.classList.remove('active');
            followingSort.classList.add('active')
            // insert function for following sort
        }
    }

    return (
        <div>
            <section>
                <div className="container">
                    <h1 className="welcome-header"><span className="--text-green">Hello, {user.username}</span><br/>
                    Welcome Back!</h1>
                    <div className="dashboard__wrapper">
                        
                        <div className="dashboard__title">Dashboard</div>
                        <div id="all-sort" className="dashboard__button active" onClick={handleAllSort} >
                            <span className="dashboard__sort">All Posts</span>
                        </div>
                        <div id="following-sort" className="dashboard__button" onClick={handleFollowingSort}>
                            <span className="dashboard__sort">Following</span>
                        </div>   
                    </div>
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