import { useDispatch, useSelector } from 'react-redux'
import './timeline.css'
import { getUsers } from '../../store/users';
import { getPosts, updatePost } from '../../store/posts';
import { formatDate } from '../../util/dateUtils';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react';
import CreatePostForm from './createPostForm';
import { Modal } from '../context/Modal';
import { deletePost } from '../../store/posts';


const Timeline = ({userdata}) => {
    const dispatch = useDispatch();
    const user = userdata;
    const users = useSelector(getUsers)
    const posts = useSelector(getPosts)
    const sortedPosts = [...posts].reverse();
    const sessionUser = useSelector(state => state.session.user);
    const [showCreatePostModal, setShowCreatePostModal] = useState(false);

    const [isCommenting, setIsCommenting] = useState(null)
    const [comment, setComment] = useState({})

    const [showDropdownPostId, setShowDropdownPostId] = useState(null);
    const handleDropdownClick = (postId) => {
        if (showDropdownPostId === postId) {
          setShowDropdownPostId(null);
        } else {
          setShowDropdownPostId(postId); 
        }
      };

    const handleDelete = () => {
        dispatch(deletePost(showDropdownPostId))
        setShowDropdownPostId(null)
    }

    const handleCloseEditForm = () => {
        setShowDropdownPostId(null)
    }

    const handleClose = () => {
        setShowCreatePostModal(false)
    }

    const submitComment = () => {
        setIsCommenting(null);
    }
    
    return (
        <div className='timeline'>
            <div className='create-post-container'>
                <div className='profile-picture-container'>
                    <Link to={`/users/${sessionUser?.id}`}>
                        <img src={sessionUser?.profilePicture} alt="Profile" className='pfp'/>
                    </Link>
                </div>
                <div className='fake-input-field'>
                <button onClick={() => setShowCreatePostModal(true)}>
                    {sessionUser.id === user?.id ? "What's on your mind?" : `Write something to ${user?.firstName}...`}
                </button>
                </div>
            </div>
            {showCreatePostModal && 
                <Modal onClose={handleClose}>
                    <CreatePostForm userdata={user} onClose={handleClose}/>
                </Modal>
            }
            <ul className='timeline-posts'>
                {sortedPosts.map((post) => {
                    const author = users[post.authorId - 1];
                    const feedUser = users[post.feedId - 1];
                    return (
                        <li key={post.id} className='post-container'>
                            <div className='post-header'>
                                <div className='post-info'>
                                {author && feedUser && (
                                        <div className='author-info'>
                                            <div className='author-pfp'>
                                                <Link to={`/users/${author?.id}`}>
                                                    <img src={author.profilePicture} className='pfp'></img>
                                                </Link>
                                            </div>
                                        <div className='author-name'>
                                            <Link to={`/users/${author?.id}`}>
                                                {author?.firstName} {author?.lastName}
                                            </Link>
                                            <div className="date">{formatDate(post.createdAt)}</div>
                                        </div>
                                        {author?.id !== feedUser?.id && (
                                            <>
                                                <div className='arrow-icon'><i className="fa fa-arrow-right" aria-hidden="true"></i></div>
                                                    <div className='feedUser-name'>
                                                        <Link to={`/users/${feedUser?.id}`}>
                                                            {feedUser.firstName} {feedUser.lastName}
                                                        </Link>
                                                    </div>
                                            </>
                                        )}
                                    </div>
                                    )}
                                </div>
                                {author?.id === sessionUser?.id || feedUser?.id === sessionUser?.id ? 
                                <div className='edit-post' onClick={() => handleDropdownClick(post.id)}>
                                    <i className="fa-solid fa-ellipsis fa-lg"></i>
                                    {showDropdownPostId === post.id && (
                                        <div className='dropdown'>
                                            <button>Edit Post</button>
                                            <button onClick={handleDelete}>Delete Post</button>
                                        </div>
                                    )}
                                </div>
                                : null}
                            </div>
                            <div className='post-content'>
                                {post.body}
                            </div>
                            {/* <div className='post-photo'>
                                only add this div if the post contains a photo
                            </div> */}
                            <div className='post-footer'>
                                <div className='like-container'>
                                    <i className="fa fa-thumbs-up" aria-hidden="true"></i>&nbsp;Like
                                </div>
                                <div className='add-comment-textfield'>
                                {isCommenting === post.id ? (
                                <>
                                <img src={sessionUser?.profilePicture} alt="Profile" className='pfp'/>
                                    <textarea
                                        key={post.id}
                                        onChange={(e) => setComment(e.target.value)}
                                        rows="3"
                                        cols="3"
                                    />
                                    <button onClick={submitComment} className='submit-comment-arrow'>
                                        <i className="fa fa-arrow-right" aria-hidden="true"></i>
                                    </button>
                                </>
                                ) : (
                                    <div className='user-comment-info'>
                                        <Link to={`/users/${sessionUser?.id}`}>
                                            <img src={sessionUser?.profilePicture} alt="Profile" className='pfp'/>
                                        </Link>
                                        <div className="add-a-comment" onClick={() => setIsCommenting(post.id)}>
                                            Write a comment...
                                        </div>
                                    </div>
                                )}
                                </div>
                            </div>
                        </li>
                    )
                })
                }
            </ul>
        </div>
    )
}

export default Timeline;