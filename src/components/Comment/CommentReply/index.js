import React, { useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { AuthContext } from '../../../context/auth-context';
import * as CommentService from '../../../api/CommentService';

import './style.css';

const CommentReply = ({ originCommentId, fetchOnePost, originAuthor }) => {
    const history = useHistory();
    const { pid } = useParams();
    const auth = useContext(AuthContext);
    const [formData, setFormData] = useState({ comment: '' });
    const [isReplying, setIsReplying] = useState(false);

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

    const handleReply = () => {
        setIsReplying(true);
    };

    const onSubmit = async () => {
        try {
            const data = {
                "body": comment
            }
            const res = await CommentService.createNestedComment(originCommentId, data, auth.token);
            console.log("Nested Comment response => ", res)
            fetchOnePost();
            setFormData({ comment: ''});
            history.push(`/post/${pid}`);
        } catch (err) {
            handleErrors(err);
        }
    }

    const onKeyPress = (e) => {
        if(e.which === 13) {
            onSubmit();
            setIsReplying(false);
        } else if(e.which === 27) {
            setIsReplying(false);
        }
    }


    return (
        <div>
            {!isReplying && <button className="comment__button" onClick={handleReply}>Reply</button>}
            
            {isReplying &&
                <input
                    className="reply"
                    type="text"
                    placeholder="Reply to comment"
                    name="comment"
                    minLength={6}
                    value={comment}
                    onChange={e => onChange(e)}
                    onKeyPress={onKeyPress}
                />
            }
        </div>
    )
}

export default CommentReply;
