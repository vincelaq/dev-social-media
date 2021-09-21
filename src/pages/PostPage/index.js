import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Post from '../../components/Post';
import Comment from '../../components/Comment';
import CommentForm from '../../components/Comment/CommentForm';
import server from '../../api';

const PostPage = (props) => {
    const { pid } = useParams();
    const [post, setPost] = useState(props.location.post);
    const [comments, setComments] = useState(props.location.comments)

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
    
    const fetchOnePost = async () => {
        try {
            const res = await server.get(`posts/${pid}`);

            console.log("fetch one post: ", res.data.data);
            setPost(res.data.data);
            if (res.data.data.comments) {
                setComments(res.data.data.comments)
            }
        } catch (err) {
            handleErrors(err);
        }
    }

    useEffect(() => {
        fetchOnePost();
    }, []);


    return (
        <div className="container">
            <section>
            <Post 
                post={post}
                user={post.username}
                author={post.author}
                body={post.body}
                title={post.title}
                image={post.image}
                favLanguage={post.favLanguage}
                comments={post.comments}
                time={post.createdAt}
                likes={post.voteTotal}
                id={post.id}
            
            />
           <CommentForm postId={post.id} fetchOnePost={()=>fetchOnePost()} />
            
           <h2>Comments</h2>
            {comments.length < 1 && <h3>No comments yet</h3>}
            {comments.map((comment) => {
                return (
                    <Comment
                        comment={comment}
                        author={comment.author}
                        username={comment.username}
                        body={comment.body}
                        image={comment.image}
                        comments={comment.comments}
                        createdAt={comment.createdAt}
                        key={comment._id}
                        likes={comment.voteTotal}
                        id={comment._id}
                        originPostId={post.id}
                        fetchOnePost={() => fetchOnePost()}
                    />
                );
            })}
            </section>
        </div>
    )
}

export default PostPage;