import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal } from '../context/Modal';
import CreatePostForm from '../posts/createPostForm';
import EditPostForm from '../posts/editPostForm';
import { fetchAllPosts, deletePost } from '../../store/posts';
import { fetchUsers, getUsers } from '../../store/users';
import { formatDate } from '../../util/dateUtils';
import CommentList from '../Comments/CommentList';

const Newsfeed = () => {
    const dispatch = useDispatch();

    const users = useSelector(getUsers); 
    const posts = useSelector(state => Object.values(state.posts));
    const sortedPosts = [...posts].reverse(); 
    const sessionUser = useSelector(state => state.session.user);

    const [showCreatePostModal, setShowCreatePostModal] = useState(false);
    const [editingPostId, setEditingPostId] = useState(null);
    const [showDropdownPostId, setShowDropdownPostId] = useState(null);
    const [isCommenting, setIsCommenting] = useState(null);
    const [comment, setComment] = useState({});

    useEffect(() => {
        dispatch(fetchAllPosts());
        dispatch(fetchUsers())
    }, [dispatch]);

    const handleDropdownClick = (postId) => {
        if (showDropdownPostId === postId) setShowDropdownPostId(null);
        else setShowDropdownPostId(postId);
    };

    const handleDelete = () => {
        dispatch(deletePost(showDropdownPostId));
        setShowDropdownPostId(null);
    };

    const handleCloseEditForm = () => {
        setShowDropdownPostId(null);
        setEditingPostId(null);
    };

    const handleClose = () => {
        setShowCreatePostModal(false);
    };

    const submitComment = () => {
        setIsCommenting(null);
    };

    return (
        <div className='timeline'>
            <div className='create-post-container'>
                <div className='profile-picture-container'>
                    <Link to={`/users/${sessionUser?.id}`}>
                        <img src={sessionUser?.profilePicture} alt="Profile" className='pfp' />
                    </Link>
                </div>
                <div className='fake-input-field'>
                    <button onClick={() => setShowCreatePostModal(true)}>What's on your mind?</button>
                </div>
            </div>
            {showCreatePostModal && (
                <Modal onClose={handleClose}>
                    <CreatePostForm onClose={handleClose} />
                </Modal>
            )}
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
                                        {author?.id !== feedUser?.id && (<>
                                        <div className='author-name'>
                                        <div className='information'><Link to={`/users/${author?.id}`}> {author?.firstName} {author?.lastName} </Link><i className="fa-solid fa-caret-right fa-lg"></i><Link to={`/users/${feedUser?.id}`}>{feedUser?.firstName} {feedUser?.lastName}</Link></div>
                                            <div className="date">{formatDate(post.createdAt)}</div>
                                        </div>
                                        </>)}
                                        {author?.id === feedUser?.id && (
                                            <>
                                                <div className='author-name'>
                                                <Link to={`/users/${author?.id}`}> {author?.firstName} {author?.lastName} </Link>
                                                <div className="date">{formatDate(post.createdAt)}</div>
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
                                            <button onClick={() => setEditingPostId(post.id)}>Edit Post</button>
                                            <button onClick={handleDelete}>Delete Post</button>
                                        </div>
                                    )}
                                </div>
                                : null}
                            </div>
                            {editingPostId === post.id && 

                            <Modal onClose={handleCloseEditForm}>
                                <EditPostForm onClose={handleCloseEditForm} post={post}/>
                            </Modal>
                            }
                            <div className='post-content'>
                                {post.body}
                            </div>
                            {post.photoUrl && 
                                <div className='post-photo'>
                                    <img src={post.photoUrl} className="post-photo"></img>
                                </div>
                            }
                            <div className='post-footer'>
                            <div className='like-container'>
                                <div className="like-number">
                                    {Math.floor(Math.random() * 10)} likes
                                </div>
                                <div className="like-text">
                                    <i className="fa fa-thumbs-up" aria-hidden="true"></i>&nbsp;Like
                                </div>

                            </div>
                                <div className='comments-list'>
                                    <CommentList post={post} />
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
    );
};

export default Newsfeed;
