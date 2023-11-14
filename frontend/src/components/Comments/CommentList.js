import { useSelector } from "react-redux";
import { deleteComment, getComments, updateComment } from "../../store/comments";
import { getUsers } from "../../store/users";
import "./comments.css"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { useState } from "react";


const CommentList = ({post}) => {
    const users = useSelector(getUsers)
    const comments = Object.values(useSelector(state => Object.values(state.comments)));
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [showDropdownCommentId, setShowDropdownCommentId] = useState(null);
    const [editingCommentId, setEditingCommentId] = useState(null)
    const [hovering, setHovering] = useState(null);
    const [commentBody, setCommentBody] = useState("")
    const [commentPost, setCommentPost] = useState("")
    const [commentAuthor, setCommentAuthor] = useState(sessionUser.id)

    const handleDelete = () => {
        dispatch(deleteComment(showDropdownCommentId))
        setShowDropdownCommentId(null)
    }
    const handleDropdownClick = (commentId) => {
        if (showDropdownCommentId === commentId) {
          setShowDropdownCommentId(null);
        } else {
          setShowDropdownCommentId(commentId); 
        }
    };
    const handleEditComment = (e) => {
        e.preventDefault();
        dispatch(updateComment({body: commentBody, userId: commentAuthor, postId: post.id}, editingCommentId)); 
        setEditingCommentId(null)
        setCommentBody("")
    }
    return (
        <div className="comment-list">
            <ul className="comment-ul">
             {comments.map((comment) => {
                {if (comment.postId === post.id) {
                    const author = users[comment.userId - 1]
                    const feedUser = post.authorId
                    return (
                        <li key={comment.id}
                            onMouseEnter={() => {
                                setHovering(comment.id)
                            }}
                            onMouseLeave={() =>{
                                setHovering(null)
                            }}
                        >
                            <div className="comment-container">
                                <div className="comment-author-pfp">
                                <Link to={`/users/${author?.id}`}>
                                    <img src={author?.profilePicture} className='comment-pfp'></img>
                                </Link>
                                </div>
                                <div className="comment-info">
                                    <div className="comment-author-name">
                                        <Link to={`/users/${author?.id}`}> {author?.firstName} {author?.lastName} </Link> 
                                    </div>
                                    <div className="comment-body">
                                        {editingCommentId === comment.id ? 
                                        <form  className="add-a-comment" onSubmit={handleEditComment}>
                                        <input className="add-a-comment"
                                        id="comment-input"
                                        value={commentBody}
                                        onChange={(e) =>{
                                            setCommentBody(e.target.value)
                                        }}
                                        >
                                        </input>
                                        </form> : comment.body}
                                    </div>
                                </div>
                                {author?.id === sessionUser?.id || feedUser?.id === sessionUser?.id ? 
                                <div className='edit-comment' onClick={() => handleDropdownClick(comment.id)}>
                                    {hovering === comment.id ?
                                    <i className="fa-solid fa-ellipsis fa-lg"></i> 
                                :
                                <i className="fa-solid fa-ellipsis fa-lg" style={{opacity: 0}}></i> 
                                }
                                    {showDropdownCommentId === comment.id && (
                                        <div className='comment-dropdown'>
                                            <button onClick={() => {
                                                setEditingCommentId(comment.id)
                                                setCommentBody(comment.body)
                                                }}>Edit Comment</button>
                                            <button onClick={handleDelete}>Delete Comment</button>
                                        </div>
                                    )}
                                </div>
                                : null}
                            </div>
                        </li>
                    )
                } else {
                    return null;
                }
             }
             })}
            </ul>
        </div>
    )
}

export default CommentList;