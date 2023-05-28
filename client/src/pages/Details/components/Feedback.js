import { AdvancedImage } from '@cloudinary/react';

const Feedback = ({ feedback }) => {
  return (
    <li className="feedback">
      <div className="feedback-header">
        <div className="feedback-owner-avatar-">
          <AdvancedImage cldImg={feedback?.owner?.avatar} />
        </div>
        <p>
          {feedback?.owner?.firstName} {feedback?.owner?.lastName}
        </p>
      </div>
      <div className="feedback-body">
        <p className="feedback-text">{feedback?.text}</p>
      </div>
    </li>
  );
};

export default Feedback;
