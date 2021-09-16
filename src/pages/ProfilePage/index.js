import React, {useState, useEffect, useContext } from "react";
import axios from "axios";
import NamePlate from "../../components/NamePlate";
import Post from "../../components/Post";
import { AuthContext } from '../../context/auth-context';
import './style.css';


const ProfilePage = () => {
    const auth = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const user = auth.user;
    
   const fetchPosts = async () => {
        let res = await axios ({
            method: "get",
            url: `http://localhost:5000/api/posts/user/${user._id}`,
            // replace uid with a different parameter
        })

        if (res.status === 200) {
            setPosts(res.data.data.reverse());
        }
        console.log("Post Incoming", res);
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div>
            <NamePlate
                username={user.username}
                jobTitle={user.jobTitle}
                image={user.image}
                bio={user.bio}
                numberOfPosts={user.posts.length}
                numberOfConnections={user.following.length}
                following={user.following}
                id={user._id}
            />
            ProfilePage
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
        </div>     
    );
}

export default ProfilePage;