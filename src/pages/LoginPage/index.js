import React, { Fragment, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../../components/Elements/LoadingSpinner';
import { AuthContext } from '../../context/auth-context';

import './style.css';


const Login = () => {
    const auth = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);

    const { email, password } = formData;

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
            setIsLoading(true);
            const res = await axios({
                method: 'post',
                url: 'http://localhost:5000/api/auth/login',
                data: {
                    email: email,
                    password: password,
                }
            });
            console.log(res);
            setIsLoading(false);
            auth.login(res.data.user, res.data.token);
        } catch (err) {
            setIsLoading(false);
            handleErrors(err);
        }
    }


    return (
        <div className="login-container">
            {isLoading && <LoadingSpinner asOverlay />}
            <h1 className="login__title">
                Welcome back
            </h1>
            <p className="login__subtitle">
                Sign into your account below.
            </p>
            <form onSubmit={e => onSubmit(e)}>
                <div>
                    <div className="login__email">Email</div>
                    <input 
                        className="login__input-field"
                        type="email" 
                        placeholder="enter your email" 
                        name="email" 
                        value={email} 
                        onChange={e => onChange(e)}
                    />
                </div>
                <div>
                    <div className="login__password">Password</div>
                    <input
                        className="login__input-field"
                        type="password"
                        placeholder="enter your password"
                        name="password"
                        minLength={6}
                        value={password}
                        onChange={e => onChange(e)}
                    />
                </div>
                <input className="login__button" type="submit" value="Sign in" />
            </form>
            <p className="login__register-footer">
                Don't have an account? <Link className="login__register-link" to="/register">Register</Link>
            </p>
        </div>
    )
};

export default Login
