import React from 'react';
import Popup from 'reactjs-popup';
import EditProfileForm from './EditProfileForm';

import './style.css';


const EditProfile = ({ user, fetchPosts }) => {
    return (
        <Popup
            trigger={<button className="button"> ... </button>}
            modal
            nested
        >
            {close => (
            <div className="modal">
                <button className="close" onClick={close}>
                &times;
                </button>
                <div className="header"> Edit Profile </div>
                <div className="content">
                {' '}
                    <EditProfileForm close={close} user={user} fetchPosts={() => fetchPosts()} />
                </div>
            </div>
            )}
        </Popup>
    )
};

export default EditProfile;