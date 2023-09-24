import './profileHeader.css'
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import EditProfile from '../editProfileForm/EditProfile';
import { useState } from 'react';
import { Modal } from '../context/Modal';

const ProfileHeader = ({userdata}) => {
const user = userdata
const sessionUser = useSelector(state => state.session.user);
const {userId} = useParams();

const [isEditing, setIsEditing] = useState(false);

const handleEdit = (updatedData) => {
    // Handle the edited data here (update Redux store or make API call)
    setIsEditing(false);
};

return (
    <div className="header-container">
        <div className="cover-photo-container">
            <div className="cover-photo">
            </div>
        </div>

        <div className="user-info-container">
            <div className="profile-photo">
            </div>
            <div className="users-name">
                {user?.firstName} {user?.lastName}
            </div>
            <div className="editProfile">
            {sessionUser?.id == userId && (
                    <button className="editProfile" onClick={() => setIsEditing(true)}> <i class="fa-solid fa-pencil"></i> Edit profile</button>
                )}
            </div>
            {isEditing && (
                <Modal onClose={() => setIsEditing(false)}>
                    <EditProfile handleEdit={handleEdit} />
                </Modal>
            )}
        </div>

        <div className="tabs">
            <span className='tab-options'>Posts &nbsp; About &nbsp; Friends &nbsp; Photos</span>
        </div>
    </div>
)

};

export default ProfileHeader