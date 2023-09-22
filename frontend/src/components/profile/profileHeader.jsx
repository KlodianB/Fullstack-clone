import './profileHeader.css'
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";

const ProfileHeader = ({userdata}) => {
const user = userdata
const sessionUser = useSelector(state => state.session.user);
const {userId} = useParams();

return (
    <div className="header-container">
        <p className="blah">{user && user.lastName}</p>
        <div className="cover-photo-container">
            <div className="cover-photo">
            </div>
            {/* <div cover-photo-edit>   Only render if currentUser id = userId from params
            </div> */}
        </div>

        <div className="user-info">
            <div className="profile-photo">
                {/* <div className="profile-photo-edit">   Only render if currentUser id = userId from params
                </div> */}
            </div>
            <div className="users-name">
            </div>
            {/* <div>(edit buttons that render only if the currentUser id = userId from params)</div> */}
        </div>

        <div className="tabs">
        </div>
    </div>
)

};

export default ProfileHeader