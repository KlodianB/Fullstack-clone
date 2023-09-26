import './createPostForm.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../store/posts';

const CreatePostForm = ({userdata, onClose}) => {
    const dispatch = useDispatch();
    const user = userdata
    const sessionUser = useSelector(state => state.session.user)
    const [body, setBody] = useState("");
    const [authorId, setAuthorId] = useState(sessionUser?.id);
    const [feedId, setFeedId] = useState(user?.id);
    //const [photo, setPhoto] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        setFeedId(user?.id)
        setAuthorId(sessionUser?.id)
        dispatch(createPost({body, authorId, feedId}))
        onClose();
    }

    return (
        <div className='create-post-form-container'>
            <div className='create-post-form-header'>
                <div className='header-title'>
                    Create post
                </div>
                <div className='close-button' onClick={onClose}>
                    <i class="fa-solid fa-x"></i>
                </div>
            </div>
            <div className='create-post-form-body'>
                <div className='create-post-form-user-info'>
                    <img src={sessionUser?.profilePicture} alt="Profile" className='pfp'/>
                    {sessionUser?.firstName} {sessionUser?.lastName}
                </div>
                <textarea 
                    className='create-post-form-input'
                    placeholder="What's on your mind?"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
            </div>
            <div className='create-post-form-footer'>
                <button onClick={handleSubmit}>Post</button>
            </div>
        </div>
    )




};

export default CreatePostForm;