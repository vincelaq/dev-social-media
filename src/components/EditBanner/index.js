import React from 'react';
import Popup from 'reactjs-popup';
import EditBannerForm from './EditImageForm';

import './style.css';


const EditBanner = ({ id, banner, fetchUser }) => {
    return (
        <Popup
            trigger={<img className="np__avatar" alt="Your banner, click to change" src={banner}/>}
            modal
            nested
        >
            {close => (
            <div className="modal">
                <div className="header-wrap">
                    <h2 className="header"> Change Banner </h2>
                    <button className="close" onClick={close}>
                    &times;
                    </button>
                </div>
                <div className="content">
                {' '}
                    <EditBannerForm close={close} id={id} fetchUser={()=>fetchUser()} />
                </div>
            </div>
            )}
        </Popup>
    )
};

export default EditBanner;