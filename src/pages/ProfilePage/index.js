import React, {useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NamePlate from "../../components/NamePlate";
import Post from "../../components/Post";
import server from "../../api";

import './style.css';


const ProfilePage = (props) => {
    
    const [posts, setPosts] = useState(props.location.user.posts);
    const [user, setUser] = useState(props.location.user);
    const { uid } = useParams();

    const fetchUser = async () => {
        try {
        
            let res = await server.get(`users/profile/${uid}`);
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
            let res = await server.get(`posts/user/${uid}`);
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
            <section>
                <NamePlate
                    username={user.username}
                    jobTitle={user.jobTitle}
                    image={user.image}
                    bio={user.bio}
                    numberOfPosts={numberOfPosts}
                    numberOfConnections={numberOfFollowing}
                    following={user.following}
                    id={user._id}
                    fetchPosts={() => fetchPosts()}
                    fetchUser={() => fetchUser()}
                />
    
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
                            getPostsAgain={ () => fetchPosts ()}
                            />
                        );
                })}
            </section>
        </div>     
    );
}

export default ProfilePage;