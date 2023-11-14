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
import EditPostForm from './editPostForm';
import CommentList from '../Comments/CommentList';
import { createComment } from '../../store/comments';


const Timeline = ({userdata}) => {
    const dispatch = useDispatch();
    const user = userdata;
    const users = useSelector(getUsers)
    const posts = useSelector(getPosts)
    const sortedPosts = [...posts].reverse();
    const sessionUser = useSelector(state => state.session.user);

    const [showCreatePostModal, setShowCreatePostModal] = useState(false);
    const [comment, setComment] = useState({})
    const [commentAuthor, setCommentAuthor] = useState(sessionUser.id);
    const [commentPost, setCommentPost] = useState("")

    const [editingPostId, setEditingPostId] = useState(null);

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
        setEditingPostId(null)
    }

    const handleClose = () => {
        setShowCreatePostModal(false)
    }


    const submitComment = (e) => {
        e.preventDefault();
        const commentInput = document.getElementById("comment-input")
        dispatch(createComment({
            body: comment,
            userId: commentAuthor,
            postId: commentPost
        }))
        setComment("")
        commentInput.value = "";
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
                                    <div className='user-comment-info'>
                                        <Link to={`/users/${sessionUser?.id}`}>
                                            <img src={sessionUser?.profilePicture} alt="Profile" className='comment-pfp'/>
                                        </Link>
                                        <form  className="add-a-comment" onSubmit={submitComment}>
                                        <input className="add-a-comment"
                                        id="comment-input"
                                        placeholder="Add a comment..."
                                        onChange={(e) =>{
                                            setComment(e.target.value)
                                            setCommentPost(post.id)
                                        }}
                                        >
                                        </input>
                                        </form>
                                    </div>
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