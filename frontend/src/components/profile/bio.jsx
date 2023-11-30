import './bio.css'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
import { Modal } from '../context/Modal';
import EditDetailsForm from '../editDetailsForm';
import { useDispatch } from 'react-redux';
import { getModalDisplay, setModalDisplay } from "../../store/ui";

const Bio = ({userdata}) => {
    const user = userdata;
    const dispatch = useDispatch();
    const sessionUser = useSelector(state=> state.session.user);
    const {userId} = useParams();
    const modalDisplay = useSelector(getModalDisplay);


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
                <div className="intro-item">
                    <span className="icon"><i className="fa-solid fa-venus-mars fa-lg"></i></span>&nbsp;Gender: <span className='userInfo'>{user?.gender}</span>
                </div>
                {user?.workplace ? <div className="intro-item">
                    <span className="icon"><i className="fa-solid fa-briefcase fa-lg"></i></span> &nbsp;Works at <span className='userInfo'>{user?.workplace}</span>
                </div> : null}
                {user?.education ? <div className="intro-item">
                    <span className="icon"><i className="fa-solid fa-graduation-cap fa-lg"></i></span> &nbsp;Studied at <span className='userInfo'>{user?.education}</span>
                </div> : null}
                {user?.residence ? <div className="intro-item">
                    <span className="icon"><i className="fa-solid fa-house-chimney fa-lg"></i></span> &nbsp;Lives in <span className='userInfo'>{user?.residence}</span>
                </div> : null}
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