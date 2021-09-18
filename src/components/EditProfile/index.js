import React from 'react';
import Popup from 'reactjs-popup';
import EditProfileForm from './EditProfileForm';

import './style.css';


const EditProfile = ({ user, fetchPosts }) => {
    return (
        <Popup
            trigger={<button className="profile__btn"> Edit Profile </button>}
            modal
            nested
        >
            {close => (
            <div className="modal">
            <div className="header-wrap">
                <h2 className="header"> Edit Profile </h2>
                <button className="close" onClick={close}>
                &times;
                </button>
                </div>
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