import React, { useState } from 'react';
import './editProfile.css'

const EditProfile = ({ handleEdit }) => {
    const [profilePicture, setProfilePicture] = useState('');
    const [coverPhoto, setCoverPhoto] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleEdit({ profilePicture, coverPhoto });
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Edit Profile Picture:
                <input type="file" onChange={(e) => setProfilePicture(e.target.files[0])} />
            </label>
            <label>
                Edit Cover Photo:
                <input type="file" onChange={(e) => setCoverPhoto(e.target.files[0])} />
            </label>
            <button type="submit" className='submit-edit'>Submit</button>
        </form>
    )
}

export default EditProfile;
