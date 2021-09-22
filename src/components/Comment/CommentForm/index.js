import React, {useState, useContext} from 'react';
import { useHistory, useParams } from 'react-router';
import { AuthContext } from '../../../context/auth-context';
import LoadingSpinner from '../../../components/Elements/LoadingSpinner';
import * as CommentService from '../../../api/CommentService';

import './style.css';

const CommentForm = ({fetchOnePost}) => {
    const history = useHistory();
    const { pid } = useParams();
    const auth = useContext(AuthContext);
    const [formData, setFormData] = useState({ comment: '' });
    const [isLoading, setIsLoading] = useState(false);
    const { comment } = formData;

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

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
            console.log("Error during commenting")
            console.log(err.message)
        }
    } 

    const onSubmit = async () => {
        try {
            setIsLoading(true);
            const data = {
                "body": comment
            }
            const res = await CommentService.createComment(pid, data, auth.token);
            console.log("Create comment response => ", res);
            fetchOnePost();
            setFormData({ comment: ''});
            setIsLoading(false);
            history.push(`/post/${pid}`);
        } catch (err) {
            handleErrors(err);
        }
    }

    const onKeyPress = (e) => {
        if(e.which === 13) {
          onSubmit();
        }
    }
    
    return (
        <div className="comment__wrapper">
            {isLoading && <LoadingSpinner asOverlay />}
            <img className="comment__profile-image" alt="user avatar" src={auth.user.image} />
            <div className="comment__input-wrapper">
                <textarea
                    className="comment__text-input"
                    type="textarea"
                    placeholder="Add comment"
                    name="comment"
                    minLength={6}
                    value={comment}
                    onChange={e => onChange(e)}
                    onKeyPress={onKeyPress}
                    rows="8"
                    cols="1"
                />
                <p className="comment__instructions">Press enter to post</p>
            </div>
        </div>
    )
}

export default CommentForm;
