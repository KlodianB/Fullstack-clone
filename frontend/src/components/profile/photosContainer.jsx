import './photosContainer.css'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';

const PhotosContainer = ({userdata}) => {
    const user = userdata;
    const sessionUser = useSelector(state=> state.session.user);
    const {userId} = useParams();

    return (
        <div className="photos-container">
            <div className="photos-header">Photos</div>
                <div className="photos-grid">
                    {/* {photos.map((photo, index) => (
                        <img key={index} src={photo.src} alt={photo.alt} className="photo-item" />
                    ))} */}
                </div>
            <div className="view-all">See All Photos</div>
        </div>

    )
};

export default PhotosContainer;