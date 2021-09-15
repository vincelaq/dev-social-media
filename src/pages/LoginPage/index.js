import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../../components/Elements/LoadingSpinner';
import { AuthContext } from '../../context/auth-context';
import server from '../../api';

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
            
            const options = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const data = {
                email: email,
                password: password
            }
            const res = await server.post('auth/login', data, options);

            console.log(res);
            setIsLoading(false);
            auth.login(res.data.user, res.data.token);
        } catch (err) {
            setIsLoading(false);
            handleErrors(err);
        }
    }


    return (
        <div className="form__container">
            {isLoading && <LoadingSpinner asOverlay />}
            <h1 className="form__title">
                Welcome back
            </h1>
            <p className="form__subtitle">
                Sign into your account below.
            </p>
            <form onSubmit={e => onSubmit(e)}>
                <div>
                    <div className="form__input-title">Email</div>
                    <input 
                        className="form__input-field"
                        type="email" 
                        placeholder="enter your email" 
                        name="email" 
                        value={email} 
                        onChange={e => onChange(e)}
                    />
                </div>
                <div>
                    <div className="form__input-title">Password</div>
                    <input
                        className="form__input-field"
                        type="password"
                        placeholder="enter your password"
                        name="password"
                        minLength={6}
                        value={password}
                        onChange={e => onChange(e)}
                    />
                </div>
                <input className="form__btn" type="submit" value="Sign in" />
            </form>
            <p className="form__footer">
                Don't have an account?&nbsp;<Link className="form__footer-link" to="/register">Register</Link>
            </p>
        </div>
    )
};

export default Login
