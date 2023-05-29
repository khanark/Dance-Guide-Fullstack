import { AdvancedImage } from '@cloudinary/react';
import { Link } from 'react-router-dom';
import { useCloudinaryImage } from '../../../hooks/useCloudinaryImage';

const Feedback = ({ feedback }) => {
  const image = useCloudinaryImage(feedback?.owner?.avatar);

  return (
    <li className="feedback">
      <div className="feedback-header">
        <Link to={`/user/profile/${feedback?.owner?._id}`}>
          <div className="feedback-owner-avatar">
            <AdvancedImage cldImg={image} className="owner-avatar" />
          </div>
        </Link>
        <span className="owner-name">
          {feedback?.owner?.firstName} {feedback?.owner?.lastName}
        </span>
      </div>
      <div className="feedback-body">
        <h5 className="feedback-text">{feedback?.text}</h5>
      </div>
    </li>
  );
};

export default Feedback;
