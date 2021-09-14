import React, {useState, useEffect, useContext } from "react";
import axios from "axios";
import NamePlate from "../../components/NamePlate";
import Post from "../../components/Post";
import { AuthContext } from '../../context/auth-context';
import FollowingPage from '../components/FollowingPage';
import './style.css';


const ProfilePage = () => {
    const auth = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const user = auth.user;

    //Added 
     const [values, setValues] = useState({
       user: { following: [], followers: [] },
       redirectToSignin: false,
       following: false,
     });
//Added

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
//Added
    const checkFollow = (user) => {
      const match = user.followers.some((follower) => {
        return follower._id == jwt.user._id;
      });
      return match;
    };
    const clickFollowButton = (callApi) => {
      callApi(
        {
          userId: jwt.user._id,
        },
        {
          t: jwt.token,
        },
        values.user._id
      ).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, user: data, following: !values.following });
        }
      });
    };
//Added
    
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