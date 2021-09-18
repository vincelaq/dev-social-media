import React, { useContext, useState } from 'react';
import LoadingSpinner from '../../Elements/LoadingSpinner';
import { AuthContext } from '../../../context/auth-context';
import server from '../../../api';

import './style.css';

const EditProfileForm = ({ id, close, fetchPosts }) => {
    const auth = useContext(AuthContext);
    const [formData, setFormData] = useState({ 
        fullName: "", 
        bio: "", 
        skills: "", 
        languages: "", 
        favLanguage: "", 
        password: "" 
    });
    const [isLoading, setIsLoading] = useState(false);

    const { fullName, bio, skills, languages, favLanguage, password } = formData;

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
            dataArray.append("fullName", fullName);
            dataArray.append("bio", bio);
            dataArray.append("skills", skills);
            dataArray.append("languages", languages);
            dataArray.append("favLanguage", bio);
            dataArray.append("password", password);
            
            const options = {
                headers: {
                    'Authorization': 'Bearer '+auth.token,
                    'Content-Type': 'multipart/form-data; boundary=---DEVBOOK---'
                }
            };
            
            const res = await server.put(`users/profile`, dataArray, options);

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
                        placeholder="Full Name" 
                        name="fullName" 
                        value={fullName} 
                        onChange={e => onChange(e)}
                    
                    />
                    <input
                        className="create-post__input"
                        type="text"
                        placeholder="Bio"
                        name="bio"
                        value={bio}
                        onChange={e => onChange(e)}
                    />
                    <input
                        className="create-post__input"
                        type="text"
                        placeholder="Skills"
                        name="skills"
                        value={skills}
                        onChange={e => onChange(e)}
                    />
                    <input
                        className="create-post__input"
                        type="text"
                        placeholder="Language Tags (space in between, no commas)"
                        name="languages"
                        value={languages}
                        onChange={e => onChange(e)}
                    />
                    <input
                        className="create-post__input"
                        type="text"
                        placeholder="Favorite Language"
                        name="favLanguage"
                        value={favLanguage}
                        onChange={e => onChange(e)}
                    />
                    <input
                        className="create-post__input"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                    />
                    <input className="create-post__button" type="submit" value="Save" />
                </div>
            </form>
        </div>
    )
}

export default EditProfileForm;
