import LoginForm from "../LoginPage";
import { useSelector } from "react-redux";
import { getModalDisplay, setModalDisplay } from "../../store/ui";
// import SignupModal from "../SignUpForm/SignupModal";
import { Modal } from "../context/Modal";
import SignUpForm from "../SignUpForm";
import { useDispatch } from "react-redux";
import Newsfeed from "../newsfeed/newsfeed";
import './splash.css'
import FriendsContainer from "../profile/friendsContainer";
import PhotosContainer from "../profile/photosContainer"
import { useEffect } from "react";

const Splash = () => {
    const sessionUser = useSelector(state => state.session.user);
    const modalDisplay = useSelector(getModalDisplay);
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0,0);
    }, [dispatch])
    
    const onClose = () => {
        dispatch(setModalDisplay(!modalDisplay))
    }
        if (!sessionUser) {
        return (
            <>
            <LoginForm />
            {modalDisplay &&    
                <Modal onClose={onClose}>
                    <SignUpForm />
                </Modal>
            }
            </>
        )
        } else {
           return (
            <div className="splash-container">
                <div className="filler1">
                    <FriendsContainer />
                    <PhotosContainer />
                </div>
                <Newsfeed />
                <div className="filler2">
                    
                </div>
            </div>
           ) 
        }
}

export default Splash;

