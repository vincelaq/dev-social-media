import React, { useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router';
import { AuthContext } from '../../../context/auth-context';
import server from '../../../api';

const CommentEdit = ( {originCommentId, fetchOnePost, originAuthor} ) => {
    const history = useHistory();
    const { pid } = useParams();
    const auth = useContext(AuthContext);
    const [formData, setFormData] = useState({ comment: '' });
    const [isEditing, setIsEditing] = useState(false);
    
    const { comment } = formData;

    console.log(auth.user._id, originAuthor);

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
            const data = {
                "body": comment
            }
            const options = {
                headers: {
                    'Authorization': 'Bearer '+auth.token,
                }
            };
            const res = await server.put(`comments/${originCommentId}`, data, options);
            fetchOnePost();
            setFormData({ comment: ''});
            history.push(`/post/${pid}`);
        } catch (err) {
            handleErrors(err);
        }
    }

    const handleEdit = () => {
        if(auth.user._id !== originAuthor) {
            return alert("You are not authorized to edit this comment")
        }
        setIsEditing(true);
    };

    const onKeyPress = (e) => {
        if(e.which === 13) {
          onSubmit();
          setIsEditing(false);
        } else if(e.which === 27) {
            setIsEditing(false);
        }
    }
    return (
        <div>
            {!isEditing && <button onClick={handleEdit}>Edit</button>}
            
            {isEditing &&
                <input
                    type="text"
                    placeholder="Edit comment"
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

export default CommentEdit;
