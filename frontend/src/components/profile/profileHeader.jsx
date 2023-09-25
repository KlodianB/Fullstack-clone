import './profileHeader.css'
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import EditProfile from '../editProfileForm/EditProfile';
import { useState } from 'react';
import { Modal } from '../context/Modal';
import { getModalDisplay, setModalDisplay } from '../../store/ui';

const ProfileHeader = ({userdata}) => {
const user = userdata
const sessionUser = useSelector(state => state.session.user);
const {userId} = useParams();
const modalDisplay = useSelector(getModalDisplay);
const dispatch = useDispatch();



return (
    <div className="header-container">
        <div className="cover-photo-container">
            <img src={user?.coverPhoto} alt="" className="cover-photo" />
        </div>

        <div className="user-info-container">
        <img src={user?.profilePicture} alt="" className="profile-photo"/>
            <div className="users-name">
                {user?.firstName} {user?.lastName}
            </div>
            <div className="editProfile">
            {sessionUser?.id == userId && (
                    <button className="editProfile" onClick={() => {
                        debugger
                        dispatch(setModalDisplay(true))
                    }}> <i class="fa-solid fa-pencil"></i> Edit profile</button>
                )}
            </div>
            {modalDisplay && (
                <Modal onClose={() => dispatch(setModalDisplay(false))}>
                    <EditProfile userdata={user} />
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