import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { AuthContext } from '../../../context/auth-context';
import * as UserService from '../../../api/UserService';

import './style.css';

const EditBannerForm = ({ id, close, fetchUser }) => {
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
            console.log("Error during banner edit")
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
            formData.append("banner", image.raw);
            const res= await UserService.updateBanner(formData, auth.token);
            fetchUser();
            history.push({pathname: `/profile/${auth.user._id}`, state: auth.user })
            close();
        } catch (err) {
                handleErrors(err);
        }
    };

  return (
    <div>
    <div className="img-upload-wrap">
      <label htmlFor="upload-button">
          {image.preview ? (
            <img className="img-preview" src={image.preview} alt="dummy" width="200" height="200" />
          ) : (
            <>
              <span className="fa-stack fa-2x mt-3 mb-2">
                <i className="fas fa-circle fa-stack-2x" />
                <i className="fas fa-store fa-stack-1x fa-inverse" />
              </span>
              <div className="upload-wrap">
                <div className="icon-wrap">
                  <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 20.9998H3C2.20435 20.9998 1.44129 20.6837 0.87868 20.1211C0.31607 19.5585 0 18.7954 0 17.9998L0 15.4098C0.00223279 14.8802 0.214412 14.3731 0.59 13.9998L2.3 12.2898C2.4913 12.1259 2.73738 12.0403 2.98905 12.0501C3.24073 12.0598 3.47947 12.1641 3.65756 12.3422C3.83566 12.5203 3.93999 12.759 3.94971 13.0107C3.95943 13.2624 3.87383 13.5085 3.71 13.6998L2 15.4098V17.9998C2 18.265 2.10536 18.5193 2.29289 18.7069C2.48043 18.8944 2.73478 18.9998 3 18.9998H21C21.2652 18.9998 21.5196 18.8944 21.7071 18.7069C21.8946 18.5193 22 18.265 22 17.9998V15.4098L20.29 13.6998C20.1262 13.5085 20.0406 13.2624 20.0503 13.0107C20.06 12.759 20.1643 12.5203 20.3424 12.3422C20.5205 12.1641 20.7593 12.0598 21.0109 12.0501C21.2626 12.0403 21.5087 12.1259 21.7 12.2898L23.41 13.9998C23.7856 14.3731 23.9978 14.8802 24 15.4098V17.9998C24 18.7954 23.6839 19.5585 23.1213 20.1211C22.5587 20.6837 21.7956 20.9998 21 20.9998ZM13.34 14.3098V0.999772C13.3392 0.803195 13.2805 0.611218 13.1711 0.447835C13.0618 0.284451 12.9068 0.15691 12.7254 0.0811513C12.544 0.00539263 12.3443 -0.0152227 12.1513 0.021882C11.9582 0.0589867 11.7804 0.152166 11.64 0.289772L6 5.99977C5.88478 6.19255 5.83781 6.41851 5.86666 6.64124C5.89551 6.86397 5.99849 7.0705 6.15903 7.22757C6.31956 7.38464 6.52829 7.48309 6.75159 7.50707C6.9749 7.53106 7.19978 7.47917 7.39 7.35977L11.34 3.40977V14.3098C11.34 14.575 11.4454 14.8293 11.6329 15.0169C11.8204 15.2044 12.0748 15.3098 12.34 15.3098C12.6052 15.3098 12.8596 15.2044 13.0471 15.0169C13.2346 14.8293 13.34 14.575 13.34 14.3098V14.3098ZM18.7 7.30977C18.8863 7.12241 18.9908 6.86896 18.9908 6.60477C18.9908 6.34059 18.8863 6.08713 18.7 5.89977L16.59 3.82977C16.3987 3.66595 16.1526 3.58034 15.9009 3.59006C15.6493 3.59978 15.4105 3.70411 15.2324 3.88221C15.0543 4.0603 14.95 4.29904 14.9403 4.55072C14.9306 4.80239 15.0162 5.04847 15.18 5.23977L17.3 7.35977C17.4874 7.54602 17.7408 7.65056 18.005 7.65056C18.2692 7.65056 18.5226 7.54602 18.71 7.35977L18.7 7.30977ZM18 6.65977C18.1863 6.47241 18.2908 6.21896 18.2908 5.95477C18.2908 5.69059 18.1863 5.43713 18 5.24977L15.88 3.11977C15.6887 2.95595 15.4426 2.87034 15.1909 2.88006C14.9393 2.88978 14.7005 2.99411 14.5224 3.17221C14.3443 3.3503 14.24 3.58904 14.2303 3.84072C14.2206 4.0924 14.3062 4.33847 14.47 4.52977L16.59 6.64977C16.7774 6.83602 17.0308 6.94056 17.295 6.94056C17.5592 6.94056 17.8126 6.83602 18 6.64977V6.65977Z" fill="white"/>
                  </svg>
                </div>

                <h2>Add a Banner</h2>
              </div>
            </>
          )}
        </label>
    </div>
      
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

export default EditBannerForm;
