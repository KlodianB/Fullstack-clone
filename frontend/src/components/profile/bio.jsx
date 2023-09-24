import './bio.css'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Modal } from '../context/Modal';
import EditDetailsForm from '../editDetailsForm';

const Bio = ({userdata}) => {
    const user = userdata;
    const sessionUser = useSelector(state=> state.session.user);
    const {userId} = useParams();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEditDetails = (updatedDetails) => {
      // Handle updated details here (e.g., make an API call to update the user details)
      setIsModalOpen(false);
    };

    const birthdayFormat = (birthday) => {
    let date = new Date(birthday);
    
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    
    return date.toLocaleDateString('en-US', options);
    }

    return (
        <div className="intro-container">
            <div className="intro-header">Intro</div>
                <div className="intro-item">
                {user ? <><span className="icon">🎂</span> Birthday:  <span className='userInfo'>{birthdayFormat(user.birthday)}</span></> : null}
                </div>
                <div className="intro-item">
                    <span className="icon">🏠</span> Lives in New York
                </div>
                <div className="intro-item">
                    <span className="gender"><i className="fa-solid fa-venus-mars"></i></span> Gender: <span className='userInfo'>{user?.gender}</span>
                </div>
                <div className="intro-item">
                    <span className="userBio">🏠</span> bio goes here {user?.bio}
                </div>
                <div className="intro-item">
                    <span className="icon">🏢</span> Works at XYZ Corp
                </div>
                {sessionUser.id == userId ? 
        <div className="intro-item" id="intro-edit">
          <button onClick={() => setIsModalOpen(true)}>Edit details</button>
        </div>
      : null}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <EditDetailsForm userdata={user} onSave={handleEditDetails} />
        </Modal>
      )}
            </div>
        );
};

export default Bio;