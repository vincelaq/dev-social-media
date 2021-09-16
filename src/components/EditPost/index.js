import React from 'react';
import Popup from 'reactjs-popup';
import EditForm from './EditForm';

import './style.css';


const EditPost = ({ id, fetchPosts }) => {
    return (
        <Popup
            trigger={<button className="button"> Edit </button>}
            modal
            nested
        >
            {close => (
            <div className="modal">
                <button className="close" onClick={close}>
                &times;
                </button>
                <div className="header"> Edit a Post </div>
                <div className="content">
                {' '}
                    <EditForm close={close} id={id} fetchPosts={() => fetchPosts()} />
                </div>
            </div>
            )}
        </Popup>
    )
};

export default EditPost;