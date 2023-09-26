import './bio.css'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Modal } from '../context/Modal';
import EditDetailsForm from '../editDetailsForm';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../store/users';
import { getModalDisplay, setModalDisplay } from "../../store/ui";

const Bio = ({userdata}) => {
    const user = userdata;
    const dispatch = useDispatch();
    const sessionUser = useSelector(state=> state.session.user);
    const {userId} = useParams();
    const [bio, setBio] = useState(user?.bio || "");
    const [workplace, setWorkplace] = useState(user?.workplace || "");
    const [education, setEducation] = useState(user?.education || "");
    const [residence, setResidence] = useState(user?.residence || "");
    const [errors, setErrors] = useState([]);
    const modalDisplay = useSelector(getModalDisplay);

    const [isModalOpen, setIsModalOpen] = useState(false);


    const birthdayFormat = (birthday) => {
    let date = new Date(birthday);
    
    let options = { year: 'numeric', month: 'long', day : 'numeric'};
    
    return date.toLocaleDateString('en-US', options);
    }

    return (
        <div className="intro-container">
            <div className="intro-header">Intro</div>
                <div className="intro-item">
                    <span className="userBio"></span> {user?.bio}
                </div>
                <div className="intro-item">
                {user ? <><span className="icon"><i className="fa-solid fa-cake-candles fa-lg"></i></span> &nbsp; Birthday:  <span className='userInfo'>{birthdayFormat(user.birthday)}</span></> : null}
                </div>
                {user?.residence ? <div className="intro-item">
                    <span className="icon"><i className="fa-solid fa-house-chimney fa-lg"></i></span> &nbsp;Lives in <span className='userInfo'>{user?.residence}</span>
                </div> : null}
                <div className="intro-item">
                    <span className="icon"><i className="fa-solid fa-venus-mars fa-lg"></i></span>&nbsp;Gender: <span className='userInfo'>{user?.gender}</span>
                </div>
                <div className="intro-item">
                    <span className="icon"><i className="fa-solid fa-briefcase fa-lg"></i></span> &nbsp;Works at <span className='userInfo'>{user?.workplace}</span>
                </div>
                {sessionUser.id == userId ? 
                <div className="intro-item" id="intro-edit">
                    <button onClick={() => dispatch(setModalDisplay(true))}>Edit details</button>
                </div>
                : null}
                {modalDisplay && (
                <Modal onClose={() => dispatch(setModalDisplay(!modalDisplay))}>
                    <EditDetailsForm userdata={user} />
                </Modal>
            )}
            </div>
        );
};

export default Bio;