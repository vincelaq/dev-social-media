import React, {useState, useContext} from 'react';
import Popup from 'reactjs-popup';
import { AuthContext } from '../../context/auth-context';


import './style.css';
import PostForm from './PostForm';

const CreatePost = () => {
    const auth = useContext(AuthContext);
  


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
                    <PostForm close={close} />
                </div>
            </div>
            )}
        </Popup>
    )
};

export default CreatePost;