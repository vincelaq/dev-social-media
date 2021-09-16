import axios from 'axios';
import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import LoadingSpinner from '../../components/Elements/LoadingSpinner';
import { AuthContext } from '../../context/auth-context';
import server from '../../api';

import '../LoginPage/style.css';


const Register = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
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

                const options = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                const data = {
                    fullName: fullName,
                    username: username,
                    email: email,
                    password: password,
                }
                
                const res = await server.post('auth/signup', data, options);
                if (res.statusText !== 'OK') {
                    throw new Error(res.data.message)
                }
                setIsLoading(false);
                auth.login(res.data.user, res.data.token);
                history.push('/');
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
        <div className="form__container">
            {isLoading && <LoadingSpinner asOverlay />}
            <h1 className="form__title">
                Sign Up
            </h1>
            <p className="form__subtitle">
                Register for an Account
            </p>
            <form onSubmit={e => onSubmit(e)}>
                <div className="form__grid-2-col">
                    <div>
                        <p className="form__input-title">Full Name</p>
                        <input 
                            className="form__input-field"
                            type="text" 
                            placeholder="Enter your full name" 
                            name="fullName" 
                            value={fullName} 
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div>
                        <p className="form__input-title">Username</p>
                        <input 
                            className="form__input-field"
                            type="text" 
                            placeholder="Enter your username" 
                            name="username" 
                            value={username} 
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div>
                        <p className="form__input-title">Email</p>
                        <input 
                            className="form__input-field"
                            type="email" 
                            placeholder="Enter your email" 
                            name="email" 
                            value={email} 
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div>
                        <p className="form__input-title">Password</p>
                        <input
                            className="form__input-field"
                            type="password"
                            placeholder="Enter your password"
                            name="password"
                            minLength={6}
                            value={password}
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div>
                        <p className="form__input-title">Confirm Password</p>
                        <input
                            className="form__input-field"
                            type="password"
                            placeholder="Confirm your password"
                            name="password2"
                            minLength={6}
                            value={password2}
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <input className="form__btn" type="submit" value="Create account" />
                </div>
            </form>
            <p className="form__footer">
                Do you have an account?&nbsp;<Link className="form__footer-link" to="/">Log In</Link>
            </p>
        </div>
    )
};

export default Register;