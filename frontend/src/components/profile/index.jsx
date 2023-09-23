import './profile.css'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useState, useEffect } from 'react';
import { fetchUser } from '../../store/users';
import ProfileHeader from './profileHeader';
import Bio from './bio';
import PhotosContainer from './photosContainer';
import FriendsContainer from './friendsContainer';

const ProfilePage = () => {
    const {userId} = useParams();
    const dispatch = useDispatch();
    const user = useSelector(state => state.users[userId])

    useEffect(() => {
        dispatch(fetchUser(userId))
    }, [dispatch, userId])


    return (
        <div className='page-container'>
            <div className='page-header'>
                <ProfileHeader userdata={user}/>
            </div>
            <div className='page-body'>
                <div className='bio'>
                    <Bio />
                    <PhotosContainer />
                    <FriendsContainer />
                </div>
                <div className='users-post-index'>
                    <p className='test'>posts coming soon</p>
                </div>
            </div>
        </div>
    )

}

export default ProfilePage;
















// const mockUserData = {
//     profilePicture: 'path/to/profile/image.jpg',
//     name: 'John Doe',
//     bio: 'This is a sample bio.',
//     friends: 342,
//     photos: 48,
//     posts: [
//         { id: 1, content: 'This is a sample post!' },
//         { id: 2, content: 'Another day in paradise!' },
//     ],
// };

// const ProfileHeader = ({ profilePicture, name, bio }) => (
//     <div className="profile-header">
//         <img src={profilePicture} alt="Profile" className="profile-image" />
//         <h1>{name}</h1>
//         <p>{bio}</p>
//     </div>
// );

// const ProfileInfo = ({ friends, photos }) => (
//     <div className="profile-info">
//         <span>{friends} Friends</span>
//         <span>{photos} Photos</span>
//     </div>
// );

// const Post = ({ content }) => (
//     <div className="post">
//         <p>{content}</p>
//     </div>
// );

// const ProfilePage = () => (
//     <div className="profile-page">
//         <ProfileHeader {...mockUserData} />
//         <ProfileInfo friends={mockUserData.friends} photos={mockUserData.photos} />
//         <div className="posts">
//             {mockUserData.posts.map(post => (
//                 <Post key={post.id} {...post} />
//             ))}
//         </div>
//     </div>
// );

// export default ProfilePage;
