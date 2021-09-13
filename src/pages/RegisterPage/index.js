import axios from 'axios';
import React, { Fragment, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import LoadingSpinner from '../../components/Elements/LoadingSpinner';
import { AuthContext } from '../../context/auth-context';

import './style.css';


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
        <div className="reg-container">
            {isLoading && <LoadingSpinner asOverlay />}
            <h1 className="reg-title">
                Sign Up
            </h1>
            <p className="reg-subtitle">
                Register for an Account
            </p>
            <form onSubmit={e => onSubmit(e)}>
                <div>
                    <div className="reg-input-label">Full Name</div>
                    <input 
                        className="reg-input-field"
                        type="text" 
                        placeholder="Enter your full name" 
                        name="fullName" 
                        value={fullName} 
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div>
                    <div className="reg-input-label">Username</div>
                    <input 
                        className="reg-input-field"
                        type="text" 
                        placeholder="Enter your username" 
                        name="username" 
                        value={username} 
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div>
                    <div className="reg-input-label">Email</div>
                    <input 
                        className="reg-input-field"
                        type="email" 
                        placeholder="Enter your email" 
                        name="email" 
                        value={email} 
                        onChange={e => onChange(e)}
                    />
                </div>
                <div>
                    <div className="reg-input-label">Password</div>
                    <input
                        className="reg-input-field"
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        minLength={6}
                        value={password}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div>
                    <div className="reg-input-label">Confirm Password</div>
                    <input
                        className="reg-input-field"
                        type="password"
                        placeholder="Confirm your password"
                        name="password2"
                        minLength={6}
                        value={password2}
                        onChange={e => onChange(e)}
                    />
                </div>
                <input className="reg-button" type="submit" value="Create account" />
            </form>
            <p className="login-register">
                Do you have an account? <Link className="login-register-link" to="/">Log In</Link>
            </p>
        </div>
    )
};

export default Register;