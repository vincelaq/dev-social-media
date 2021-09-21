import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import NamePlate from "../../components/NamePlate";
import Post from "../../components/Post";
import * as UserService from "../../api/UserService";
import * as PostService from "../../api/PostService";
import LoadingSpinner from '../../components/Elements/LoadingSpinner';

import './style.css';


const ProfilePage = (props) => {
    const auth = useContext(AuthContext); 
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState(props.location.posts);
    const [user, setUser] = useState(props.location.user);
    const { uid } = useParams();

    const fetchUser = async () => {
        try {
        
            let res = await UserService.getUserProfile(uid, auth.token);
            console.log("fetchuser", res.data)
            if (res.status === 200) {
                setUser(res.data.data);
            }
            console.log("Post Incoming", res);
            
        } catch (err) {
            alert(err)
        }
    }


    const fetchPosts = async () => {
        try {
            let res = await PostService.getAllPostsFromOneUser(uid);
            console.log("fetchpost", res.data)
            if (res.status === 200) {
                setPosts(res.data.data);
            }
            console.log("Post Incoming", res);
    
        } catch (err) {
            alert(err)
        }
    }


    useEffect(() => {
        fetchUser();
        fetchPosts();
        setIsLoading(false);
    }, []);

    let numberOfPosts;
    if(user.posts && Object.keys(user.posts).length > 0 ) {
        numberOfPosts = Object.keys(user.posts).length
    } else {
        numberOfPosts = 0;
    }

    let numberOfFollowing;
    if(user.following && user.following.length > 0 ) {
        numberOfFollowing = user.following.length
    } else {
        numberOfFollowing = 0;
    }

    return (
        <div className="container">
            {isLoading && <LoadingSpinner asOverlay />}
            <section>
                <div className="np">
                    <NamePlate
                        banner={user.banner}
                        username={user.username}
                        jobTitle={user.jobTitle}
                        image={user.image}
                        bio={user.bio}
                        numberOfPosts={numberOfPosts}
                        numberOfConnections={numberOfFollowing}
                        following={user.following}
                        id={uid}
                        fetchPosts={() => fetchPosts()}
                        fetchUser={() => fetchUser()}
                    />
                </div>
                {posts.length < 1 && <h3>No posts yet</h3>}
                {posts.map((post) => {
                    return (
                        <Post
                            post={post}
                            user={post.username}
                            author={post.author}
                            body={post.body}
                            image={post.image}
                            title={post.title}
                            comments={post.comments}
                            time={post.createdAt}
                            key={post._id}
                            likes={post.likes}
                            dislikes={post.dislikes}
                            id={post._id}
                            getPostsAgain={ () => fetchPosts ()}
                            />
                        );
                })}
            </section>
        </div>     
    );
}

export default ProfilePage;