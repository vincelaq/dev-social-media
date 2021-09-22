/* ==== User Service ==== */
import server from './index';

const getAllUsers = () => {
    const options = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return server.get("users", options)
};

const getMyProfile = (token) => {
    const options = {
        headers: {
            'Authorization': 'Bearer '+token,
            'Content-Type': 'application/json'
        }
    };
    return server.get("users/profile", options)
};

const getUserProfile = (uid, token) => {
    const options = {
        headers: {
            'Authorization': 'Bearer '+token,
            'Content-Type': 'application/json'
        }
    };
    return server.get(`users/profile/${uid}`, options)
};

const getMyFollowing = (token) => {
    const options = {
        headers: {
            'Authorization': 'Bearer '+token,
            'Content-Type': 'application/json'
        }
    };
    return server.get(`users/following`, options)
};

const searchUser = (query) => {
    const options = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return server.get(`users/search/${query}`, options)
}

const updateImage = (data, token) => {
    const options = {
        headers: {
            'Authorization': 'Bearer '+token,
            'Content-Type': 'multipart/form-data'
        }
    };
    return server.post(`users/image`, data, options)
};

const updateBanner = (data, token) => {
    const options = {
        headers: {
            'Authorization': 'Bearer '+token,
            'Content-Type': 'multipart/form-data'
        }
    };
    return server.post(`users/banner`, data, options)
};

const updateMyProfile = (data, token) => {
    const options = {
        headers: {
            'Authorization': 'Bearer '+token,
            'Content-Type': 'application/json'
        }
    };
    return server.put(`users/profile`, data, options);
};

const updateFollow = (uid, token) => {
    const data = {};
    const options = {
        headers: {
            'Authorization': 'Bearer '+token,
            'Content-Type': 'application/json'
        }
    };
    return server.put(`users/follow/${uid}`, data, options);
};

const deleteUser = (token) => {
    const options = {
        headers: {
            'Authorization': 'Bearer '+token,
            'Content-Type': 'application/json'
        }
    };
    return server.delete(`users`, options);
};

export { 
    getAllUsers,
    getMyProfile,
    getUserProfile,
    getMyFollowing,
    searchUser,
    updateImage,
    updateBanner,
    updateMyProfile,
    updateFollow,
    deleteUser 
};