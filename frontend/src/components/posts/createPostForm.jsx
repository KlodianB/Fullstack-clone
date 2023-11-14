import './createPostForm.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../store/posts';

const CreatePostForm = ({userdata, onClose}) => {
    const dispatch = useDispatch();
    const user = userdata
    const sessionUser = useSelector(state => state.session.user)
    const [body, setBody] = useState("");
    const [authorId, setAuthorId] = useState(sessionUser.id);
    const [feedId, setFeedId] = useState(sessionUser.id);
    const [photoFile, setPhotoFile] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('post[body]', body)
        formData.append('post[feedId]', feedId)
        formData.append('post[authorId]', authorId)
        if (photoFile) {
            formData.append('post[photo]', photoFile)
        }
        dispatch(createPost(formData))
        onClose();
    }
    return (
        <div className='create-post-form-container'>
            <div className='create-post-form-header'>
                <div className='header-title'>
                    Create post
                </div>
                <div className='close-button' onClick={onClose}>
                    <i className="fa-solid fa-x"></i>
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
            <input type='file' onChange={(e) => setPhotoFile(e.target.files[0])}></input>
            <div className='create-post-form-footer'>
                <button onClick={handleSubmit}>Post</button>
            </div>
        </div>
    )




};

export default CreatePostForm;