/* ==== Post Service ==== */
import server from './index';

const getAllPosts = () => {
    const options = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return server.get("posts", options)
};

const getOnePosts = (pid) => {
    const options = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return server.get(`posts/${pid}`, options)
};

const getAllPostsFromOneUser = (uid) => {
    const options = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return server.get(`posts/user/${uid}`, options)
};

const createAPost = (data, token) => {
    const options = {
        headers: {
            'Authorization': 'Bearer '+token,
            'Content-Type': 'application/json'
        }
    };
    return server.post("posts", data, options)
};

const updateAPost = (pid, data, token) => {
    const options = {
        headers: {
            'Authorization': 'Bearer '+token,
            'Content-Type': 'application/json'
        }
    };
    return server.put(`posts/${pid}`, data, options)
};

const updateAPostLike = (pid, token) => {
    const data = {};
    const options = {
        headers: {
            'Authorization': 'Bearer '+token,
            'Content-Type': 'application/json'
        }
    };
    return server.put(`posts/like/${pid}`, data, options)
};
 
const updateAPostDislike = (pid, token) => {
    const data = {};
    const options = {
        headers: {
            'Authorization': 'Bearer '+token,
            'Content-Type': 'application/json'
        }
    };
    return server.put(`posts/dislike/${pid}`, data, options)
};

const deleteAPost = (pid, token) => {
    const options = {
        headers: {
            'Authorization': 'Bearer '+token,
            'Content-Type': 'application/json'
        }
    };
    return server.put(`posts/${pid}`, options)
};

export { 
    getAllPosts, 
    getOnePosts, 
    getAllPostsFromOneUser,
    createAPost,
    updateAPost,
    updateAPostLike,
    updateAPostDislike,
    deleteAPost,
};