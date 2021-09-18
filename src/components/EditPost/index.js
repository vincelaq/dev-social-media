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
                <div className="header-wrap">
                    <div></div>
                    <h2 className="header"> Edit a Post </h2>
                    <button className="close" onClick={close}>
                    &times;
                    </button>
                </div>
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