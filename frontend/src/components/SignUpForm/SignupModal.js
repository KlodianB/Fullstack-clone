import SignUpForm from ".";
import { Modal } from "../context/Modal";
import { useSelector, useDispatch } from "react-redux";


const SignupModal = () => {
    const dispatch = useDispatch();
    const onClose = () => {
        dispatch()
    }
    
    return (
        <>
            <Modal onClose={onClose}>
                <SignUpForm />
            </Modal>
        </>
    )
}


export default SignupModal;