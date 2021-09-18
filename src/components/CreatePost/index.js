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
                <div className="header-wrap">
                <div></div>
                    <h2 className="header"> Create a Post </h2>
                    <button className="close" onClick={close}>&times;</button>
                </div>
                    
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