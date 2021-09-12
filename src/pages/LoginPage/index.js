import React, { Fragment, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../../components/Elements/LoadingSpinner';

import './style.css';


const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',

    });
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await axios({
                method: 'post',
                url: 'http://localhost:5000/api/auth/login',
                data: {
                    email: email,
                    password: password,
                }
            });
            if (response.statusText !== 'OK') {
                throw new Error(response.data.message)
            }

            setIsLoading(false);
            console.log(response); 
            history.push('/home')
        } catch (err) {
            setIsLoading(false);
            console.log(err);
            alert(err.response.data.message);
        }
    }


    return (
        <Fragment>
            {isLoading && <LoadingSpinner asOverlay />}
            <h1>
                Log In
            </h1>
            <p>
                Log into Your Account
            </p>
            <form onSubmit={e => onSubmit(e)}>
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
                <input type="submit" value="Login" />
            </form>
            <p>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </Fragment>
    )
};

export default Login