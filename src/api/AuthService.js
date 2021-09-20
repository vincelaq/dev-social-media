/* ==== Auth Service ==== */
import server from './index';

const loginUser = (data) => {
    const options = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return server.post("auth/login", data, options)
};

const signupUser = (data) => {
    const options = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return server.post(`auth/signup`, data, options)
};



export { 
    loginUser, 
    signupUser, 
};