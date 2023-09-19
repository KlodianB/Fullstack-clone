import LoginForm from "../LoginPage";
import { useSelector } from "react-redux";
import { getModalDisplay, setModalDisplay } from "../../store/ui";
import SignupModal from "../SignUpForm/SignupModal";
import { Modal } from "../context/Modal";
import SignUpForm from "../SignUpForm";
import { useDispatch } from "react-redux";

const Splash = () => {
    const sessionUser = useSelector(state => state.session.user);
    const modalDisplay = useSelector(getModalDisplay)
    const dispatch = useDispatch();
    
    const onClose = () => {
        dispatch(setModalDisplay())
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

        }

}

export default Splash;