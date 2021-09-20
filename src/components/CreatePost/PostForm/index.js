import React, { useContext, useState } from 'react';
import LoadingSpinner from '../../Elements/LoadingSpinner';
import { AuthContext } from '../../../context/auth-context';
import server from '../../../api';

import './style.css';

const PostForm = ({ close, fetchPosts }) => {
    const auth = useContext(AuthContext);
    const [formData, setFormData] = useState({ title: '', body: '', languages: '' });
    const [isLoading, setIsLoading] = useState(false);

    const { title, body, languages } = formData;

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
            console.log("Error during posting")
            console.log(err.message)
        }
    } 


    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            
            const data = new FormData();
            data.append("title", title);
            data.append("body", body);
            data.append("languages", languages);
            
            const options = {
                headers: {
                    'Authorization': 'Bearer '+auth.token,
                    'Content-Type': 'multipart/form-data; boundary=---DEVBOOK---'
                }
            };
            
            const res = await server.post('posts', data, options);

            console.log(res);
            fetchPosts();
            setIsLoading(false);
            close()
        } catch (err) {
            setIsLoading(false);
            handleErrors(err);
        }
    }

    return (
        <div className="create-post__wrapper">
            {isLoading && <LoadingSpinner asOverlay />}
            <form className="create-post__form" enctype="multipart/form-data" onSubmit={e => onSubmit(e)}>
                <div className="create-post__input-wrapper">
                    <input
                        className="create-post__input" 
                        type="text" 
                        placeholder="Title" 
                        name="title" 
                        value={title} 
                        onChange={e => onChange(e)}
                        required
                    />
                    <textarea
                        className="create-post__input"
                        placeholder="What's on your mind?"
                        name="body"
                        required
                        value={body}
                        rows="4"
                        cols="1"
                        onChange={e => onChange(e)}
                    />
                    <input
                        className="create-post__input"
                        type="text"
                        placeholder="Language Tags (space in between, no commas)"
                        name="languages"
                        required
                        value={languages}
                        onChange={e => onChange(e)}
                    />
                    <input className="create-post__button" type="submit" value="Post" />
                </div>
            </form>
        </div>
    )
}

export default PostForm;
