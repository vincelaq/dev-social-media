/* ==== Comment Service ==== */
import server from './index';

const getAllComments = () => {
    const options = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return server.get("comments", options)
};

const getOneComment = (cid) => {
    const options = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return server.get(`comments/${cid}`, options)
};

const getAllUserComments = (uid) => {
    const options = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return server.get(`comments/user/${uid}`, options)
};

const createComment = (pid, data, token) => {
    const options = {
        headers: {
            'Authorization': 'Bearer '+token,
            'Content-Type': 'application/json'
        }
    };
    return server.post(`comments/${pid}`, data, options);
};

const createNestedComment = (cid, data, token) => {
    const options = {
        headers: {
            'Authorization': 'Bearer '+token,
            'Content-Type': 'application/json'
        }
    };
    return server.post(`comments/orig/${cid}`, data, options);
};

const updateComment = (cid, data, token) => {
    const options = {
        headers: {
            'Authorization': 'Bearer '+token,
            'Content-Type': 'application/json'
        }
    };
    return server.put(`comments/${cid}`, data, options);
};

const updateCommentLike = (cid, token) => {
    const data = {};
    const options = {
        headers: {
            'Authorization': 'Bearer '+token,
            'Content-Type': 'application/json'
        }
    };
    return server.put(`comments/like/${cid}`, data, options);
};

const updateCommentDislike = (cid, token) => {
    const data = {};
    const options = {
        headers: {
            'Authorization': 'Bearer '+token,
            'Content-Type': 'application/json'
        }
    };
    return server.put(`comments/dislike/${cid}`, data, options);
};

const deleteComment = (cid, token) => {
    const options = {
        headers: {
            'Authorization': 'Bearer '+token,
            'Content-Type': 'application/json'
        }
    };
    return server.delete(`comments/${cid}`, options);
};

export {
    getAllComments,
    getOneComment,
    getAllUserComments,
    createComment,
    createNestedComment,
    updateComment,
    updateCommentLike,
    updateCommentDislike,
    deleteComment,
}