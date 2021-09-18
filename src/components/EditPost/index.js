import React from 'react';
import Popup from 'reactjs-popup';
import EditForm from './EditForm';

import './style.css';


const EditPost = ({ id, fetchPosts }) => {
    return (
        <Popup
            trigger={<a className="button"> Edit </a>}
            modal
            nested
        >
            {close => (
            <div className="modal">
                <a className="close" onClick={close}>
                &times;
                </a>
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