import React from 'react';
import Popup from 'reactjs-popup';
import EditForm from './EditImageForm';

import './style.css';


const EditImage = ({ id, image, fetchPosts }) => {
    return (
        <Popup
            trigger={<img className="NamePlate__avatar" src={image}/>}
            modal
            nested
        >
            {close => (
            <div className="modal">
                <button className="close" onClick={close}>
                &times;
                </button>
                <div className="header"> Change Avatar </div>
                <div className="content">
                {' '}
                    <EditForm close={close} id={id} fetchPosts={() => fetchPosts()} />
                </div>
            </div>
            )}
        </Popup>
    )
};

export default EditImage;