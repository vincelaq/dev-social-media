import React, { useState } from 'react';
import { useLocation } from 'react-router';
import Post from '../../components/Post';
import Comment from '../../components/Comment';

const PostPage = () => {
    const location = useLocation();
    const post = location.state;
    const comments = post.comments;

    const [formData, setFormData] = useState({ comment: '' });

    const { comment } = formData;

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    return (
        <div className="container">
            <section>
            <Post 
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
            <form>
            <input
                type="textarea"
                placeholder="Add comment"
                name="comment"
                minLength={6}
                value={comment}
                onChange={e => onChange(e)}
            />
            </form>
            {comments.map((comment) => {
                return (
                    <Comment
                        user={comment.username}
                        body={comment.body}
                        image={comment.image}
                        comments={comment.comments}
                        createdAt={comment.createdAt}
                        key={comment._id}
                        likes={comment.voteTotal}
                        id={comment._id}
                        // getPostsAgain={() => fetchPosts()}
                    />
                );
            })}
            </section>
        </div>
    )
}

export default PostPage;