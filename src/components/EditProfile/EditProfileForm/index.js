import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import LoadingSpinner from '../../Elements/LoadingSpinner';
import { AuthContext } from '../../../context/auth-context';
import * as UserService from '../../../api/UserService';

import './style.css';

const EditProfileForm = ({ id, close, user, fetchPosts, fetchUser }) => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const [formData, setFormData] = useState({ 
        fullName: "",
        jobTitle: "", 
        bio: "", 
        skills: "", 
        languages: "", 
        favLanguage: "", 
        password: "" 
    });
    const [isLoading, setIsLoading] = useState(false);

    const { fullName, jobTitle, bio, skills, languages, favLanguage, password } = formData;

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
            
            const data = {
                "fullName": fullName,
                "jobTitle": jobTitle,
                "bio": bio,
                "skills": skills,
                "languages": languages,
                "favLanguage": favLanguage,
                "password": password,
            }
            
            const res = await UserService.updateMyProfile(data, auth.token);

            console.log(res);
            fetchUser();
            setIsLoading(false);
            close();
            history.push(`/profile/${id}`)
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
                        placeholder="Job Title"
                        name="jobTitle"
                        value={jobTitle}
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
