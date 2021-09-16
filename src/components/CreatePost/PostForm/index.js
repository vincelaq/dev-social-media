import React, { useContext, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../../Elements/LoadingSpinner';
import { AuthContext } from '../../../context/auth-context';

import './style.css';

const PostForm = ({ close }) => {
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
            const dataArray = new FormData();
            dataArray.append("title", title);
            dataArray.append("body", body);
            dataArray.append("languages", languages);
            const res = await axios({
                method: 'post',
                url: 'http://localhost:5000/api/posts',
                data: dataArray,
                headers: {
                    'Authorization': 'Bearer '+auth.token,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res);
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
                    <input
                        className="create-post__input"
                        type="text"
                        placeholder="Description"
                        name="body"
                        required
                        value={body}
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