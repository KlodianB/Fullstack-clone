import { useSelector } from "react-redux";
import { getComments } from "../../store/comments";


const CommentList = ({post}) => {
    const comments = useSelector(state => Object.values(state.comments));
    const commentslist = Object.values(comments)
    return (
        <div className="comment-list">
            <ul>
             {commentslist.map((comment) => {
                {if (comment.postId === post.id) {
                    return (
                        <li> {comment.body} </li>
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