import './editPostForm.css'; 
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost } from '../../store/posts';

const EditPostForm = ({ post, onClose }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [photoFile, setPhotoFile] = useState();
    
    const [body, setBody] = useState(post.body);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("post[body]", body);
        if (photoFile) formData.append("post[photo]", photoFile);
        dispatch(updatePost(formData, post.id)); 
        onClose();
    }

    return (
        <div className='edit-post-form-container'>
            <div className='edit-post-form-header'>
                <div className='header-title'>
                    Edit Post
                </div>
                <div className='close-button' onClick={onClose}>
                    <i className="fa-solid fa-x"></i>
                </div>
            </div>
            <div className='edit-post-form-body'>
                <div className='edit-post-form-user-info'>
                    <img src={sessionUser?.profilePicture} alt="Profile" className='pfp' />
                    {sessionUser?.firstName} {sessionUser?.lastName}
                </div>
                <textarea
                    className='edit-post-form-input'
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
            </div>
            <input type='file' onChange={(e) => setPhotoFile(e.target.files[0])}></input>
            <div className='edit-post-form-footer'>
                <button onClick={handleSubmit}>Save</button>
            </div>
        </div>
    );
};

export default EditPostForm;
