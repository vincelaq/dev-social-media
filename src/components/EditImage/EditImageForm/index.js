import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { AuthContext } from '../../../context/auth-context';
import server from '../../../api';

import './style.css';

const EditImageForm = ({ id, close, fetchUser }) => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const [image, setImage] = useState({ preview: "", raw: "" });

    const handleErrors = (err) => {
        if (err.response) {
            console.log("Problem with response")
            console.log(err.response)
            alert(err.response.data.message)
        } else if (err.request) {
            console.log("Problem with request")
            console.log(err.request)
            alert(err.request.data)
        } else {
            console.log("Error during posting")
            console.log(err.message)
        }
    } 

    const handleChange = e => {
        if (e.target.files.length) {
        setImage({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0]
        });
        }
    };

    const handleUpload = async e => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("image", image.raw);
            const options = {
                headers: {
                    'Authorization': 'Bearer '+auth.token,
                    'Content-Type': 'multipart/form-data'
                }
            };
            const res= await server.post("users/image", formData, options);
            
            console.log(res);
                fetchUser();
                history.push({pathname: `/profile/${auth.user._id}`, state: auth.user })
        } catch (err) {

                handleErrors(err);
        }
        

    };

  return (
    <div>
      <label htmlFor="upload-button">
        {image.preview ? (
          <img src={image.preview} alt="dummy" width="200" height="200" />
        ) : (
          <>
            <span className="fa-stack fa-2x mt-3 mb-2">
              <i className="fas fa-circle fa-stack-2x" />
              <i className="fas fa-store fa-stack-1x fa-inverse" />
            </span>
            <h3 className="text-center">Click Here to select your photo</h3>
          </>
        )}
      </label>
      <input
        type="file"
        id="upload-button"
        style={{ display: "none" }}
        onChange={handleChange}
      />
      <br />
      <button className="create-post__button" onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default EditImageForm;
