import React from 'react';
import Popup from 'reactjs-popup';
import EditImageForm from './EditImageForm';

import './style.css';


const EditImage = ({ id, image, fetchUser }) => {
    return (
        <Popup
            trigger={<a className="button"> Edit Image </a>}
            modal
            nested
        >
            {close => (
            <div className="modal">
                <div className="header-wrap">
                    <h2 className="header"> Change Avatar </h2>
                    <button className="close" onClick={close}>
                    &times;
                    </button>
                </div>
                <div className="content">
                {' '}
                    <EditImageForm close={close} id={id} fetchUser={()=>fetchUser()} />
                </div>
            </div>
            )}
        </Popup>
    )
};

export default EditImage;