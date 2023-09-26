import './profile.css'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect } from 'react';
import { fetchUser, fetchUsers } from '../../store/users';
import ProfileHeader from './profileHeader';
import Bio from './bio';
import PhotosContainer from './photosContainer';
import FriendsContainer from './friendsContainer';
import { getPosts } from '../../store/posts';
import Timeline from '../posts/timeline';
import { getUsers } from '../../store/users';

const ProfilePage = () => {
    const {userId} = useParams();
    const dispatch = useDispatch();
    const user = useSelector(state => state.users[userId]);

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchUser(userId))
    }, [dispatch, userId])


    return (
        <div className='page-container'>
            <div className='page-header'>
                <ProfileHeader userdata={user}/>
            </div>
            <div className='page-body'>
                <div className='bio'>
                    <Bio userdata={user}/>
                    <PhotosContainer />
                    <FriendsContainer />
                </div>
                <div className='users-post-index'>
                    <Timeline userdata={user} />
                </div>
            </div>
        </div>
    )

}

export default ProfilePage;
