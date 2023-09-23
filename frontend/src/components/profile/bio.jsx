import './bio.css'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';

const Bio = ({userdata}) => {
    const user = userdata;
    const sessionUser = useSelector(state=> state.session.user);
    const {userId} = useParams();

    return (
        <div className="intro-container">
            <div className="intro-header">Intro</div>
                <div className="intro-item">
                    <span className="icon">🎂</span> Birthday: January 1, 1990
                </div>
                 <div className="intro-item">
                    <span className="icon">🏠</span> Lives in New York
                </div>
                <div className="intro-item">
                    <span className="icon">🏢</span> Works at XYZ Corp
                </div>
            </div>
        );
};

export default Bio;