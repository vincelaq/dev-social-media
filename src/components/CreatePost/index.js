import React from 'react';
import Popup from 'reactjs-popup';
import PostForm from './PostForm';

import './style.css';


const CreatePost = ({ fetchPosts }) => {
    return (
        <Popup
            trigger={<button className="button"> + Create a Post </button>}
            modal
            nested
        >
            {close => (
            <div className="modal">
                <button className="close" onClick={close}>
                &times;
                </button>
                <div className="header"> Create a Post </div>
                <div className="content">
                {' '}
                    <PostForm close={close} fetchPosts={() => fetchPosts()} />
                </div>
            </div>
            )}
        </Popup>
    )
};

export default CreatePost;