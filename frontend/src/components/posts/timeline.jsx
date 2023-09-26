import { useDispatch, useSelector } from 'react-redux'
import './timeline.css'
import { getUsers } from '../../store/users';
import { getPosts } from '../../store/posts';

const Timeline = ({userdata}) => {
   const dispatch = useDispatch();
   const user = userdata;
   const users = useSelector(getUsers)
   const posts = useSelector(getPosts)
   const sortedPosts = [...posts].sort((a, b) => b.id - a.id);

    return (
        <div className='timeline'>
            <div className='create-post-container'>
            </div>
            <ul className='timeline-posts'>
                {sortedPosts.map((post) => {
                    const author = users[post.authorId];
                    const feedUser = users[post.feedId];
                    return (
                        <li key={post.id} className='post-container'>
                            <div className='post-header'>
                                <div className='post-info'>
                                {author && feedUser && (
                                        <div className='author-info'>
                                            <div className='author-pfp'>
                                                <img src={author.profilePicture}></img>
                                            </div>
                                            <div className='author-name'>
                                                {author.firstName} {author.lastName}
                                                {author.id !== feedUser.id && (
                                                    <div className='feedUser-name'>
                                                        <i className="fa fa-arrow-right" aria-hidden="true"></i> 
                                                        <div className='feedUser-pfp'>
                                                            <img src={feedUser?.profilePicture} alt="" />
                                                        </div>
                                                        {feedUser.firstName} {feedUser.lastName}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className='edit-post'>

                                </div>
                            </div>
                            <div className='post-content'>
                                {post.body}
                            </div>
                            {/* <div className='post-photo'>
                                only add this div if the post contains a photo
                            </div> */}
                            <div className='post-footer'>
                                <div className='like-container'>

                                </div>
                                <div className='add-comment-textfield'>

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