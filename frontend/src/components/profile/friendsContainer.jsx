import './friendsContainer.css'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';

const FriendsContainer = ({userdata}) => {
    const user = userdata;
    const sessionUser = useSelector(state=> state.session.user);
    const {userId} = useParams();

    return (
        <div className="friends-container">
            <div className="friends-header">Friends</div>
            <div className="friends-grid">
                {/* {friends.map((friend, index) => (
                    <div key={index} className="friend-item">
                        <img src={friend.src} alt={friend.firstName} className="friend-photo" />
                        <div className="friend-name">{friend.firstName}</div>
                    </div>
                ))} */}
            </div>
            <div className="view-all">See All Friends</div>
        </div>

        );
};

export default FriendsContainer;

