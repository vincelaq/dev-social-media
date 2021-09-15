import React, {useState, useContext} from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';


import { AuthContext } from '../../context/auth-context';

import './style.css';

const CreatePost = () => {
    const auth = useContext(AuthContext);
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        languages: '',
    });
    
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
            console.log("Error during login")
            console.log(err.message)
        }
    } 

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios({
                method: 'post',
                url: 'http://localhost:5000/api/posts',
                data: {
                    title: title,
                    body: body,
                    languages: languages,
                }
            });
            console.log(res);
            auth.login(res.data.user, res.data.token);
        } catch (err) {
            handleErrors(err);
        }
    }

    return (
        <Popup
            trigger={<button className="button"> + Create a Post </button>}
            modal
            nested
        >
            {close => (
            <div className="modal">
                <button className="close" onClick={close}>
                &times;
                </button>
                <div className="header"> Create a Post </div>
                <div className="content">
                {' '}
                <form encType="multipart/form-data" onSubmit={e => onSubmit(e)}>
                    <div>
                        <input 
                            type="text" 
                            placeholder="Title" 
                            name="title" 
                            value={title} 
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div>
                        <input 
                            type="textarea" 
                            placeholder="Description" 
                            name="body" 
                            value={body} 
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div>
                        <input 
                            type="text" 
                            placeholder="Language Tags" 
                            name="languages" 
                            value={languages} 
                            onChange={e => onChange(e)}
                        />
                    </div>
                </form>
                </div>
                <div className="actions">
                <Popup
                    trigger={<button className="button"> Post </button>}
                    position="top center"
                    nested
                >
                    <span>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
                    magni omnis delectus nemo, maxime molestiae dolorem numquam
                    mollitia, voluptate ea, accusamus excepturi deleniti ratione
                    sapiente! Laudantium, aperiam doloribus. Odit, aut.
                    </span>
                </Popup>
                
                </div>
            </div>
            )}
        </Popup>
    )
};

export default CreatePost;