import React, { useState } from 'react';
import './editProfile.css'
import { updateUser } from '../../store/users';
import { useDispatch } from 'react-redux';

const EditProfile = ({ userdata, handleEdit }) => {
    const user = userdata;
    const [profilePicture, setProfilePicture] = useState(user?.profilePicture || '');
    const [coverPhoto, setCoverPhoto] = useState(user?.coverPhoto || "");
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        dispatch(updateUser(user.id, { ...user, profilePicture, coverPhoto }))
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json();
                } catch {
                    data = await res.text();
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            });
        handleEdit();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Edit Profile Picture:
                {/* <input type="file" onChange={(e) => setProfilePicture(e.target.files[0])} /> */}
                    <input type="text" onChange={(e) => setProfilePicture(e.target.value)}></input>
            </label>
            <label>
                Edit Cover Photo:
                {/* <input type="file" onChange={(e) => setCoverPhoto(e.target.files[0])} /> */}
                <input type="text" onChange={(e) => setCoverPhoto(e.target.value)}></input>
            </label>
            <button type="submit" className='submit-edit'>Submit</button>
        </form>
    )
}

export default EditProfile;
