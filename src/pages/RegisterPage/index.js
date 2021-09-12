import axios from 'axios';
import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../components/Elements/LoadingSpinner';

import './style.css';


const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
        password2: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    
    const { fullName, username, email, password, password2 } = formData;

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    
    const onSubmit = async (e) => {
        e.preventDefault();

        if (password !== password2) {
            alert('Passwords do not match');
        } else {
            setIsLoading(true);
            try {
                const res = await axios({
                    method: 'post',
                    url: 'http://localhost:5000/api/auth/signup',
                    data: {
                        fullName: formData.fullName,
                        username: username,
                        email: email,
                        password: password,
                    }
                })
                if (res.statusText !== 'OK') {
                    throw new Error(res.data.message)
                }
                setIsLoading(false);
                console.log(res); 

            } catch (err) {
                setIsLoading(false);
                alert(err.response.data.message);
                setFormData({
                    fullName: '',
                    username: '',
                    email: '',
                    password: '',
                    password2: ''
                })
            }
        }
    }



    return (
        <Fragment>
            {isLoading && <LoadingSpinner asOverlay />}
            <h1>
                Sign Up
            </h1>
            <p>
                Register for an Account
            </p>
            <form onSubmit={e => onSubmit(e)}>
                <div>
                    <input 
                        type="text" 
                        placeholder="Name" 
                        name="fullName" 
                        value={fullName} 
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        name="username" 
                        value={username} 
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div>
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        name="email" 
                        value={email} 
                        onChange={e => onChange(e)}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength={6}
                        value={password}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        minLength={6}
                        value={password2}
                        onChange={e => onChange(e)}
                    />
                </div>
                <input type="submit" value="Register" />
            </form>
            <p>
                Do you have an account? <Link to="/">Sign In</Link>
            </p>
        </Fragment>
    )
};

export default Register;