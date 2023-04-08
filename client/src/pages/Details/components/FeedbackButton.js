import { VscFeedback } from "react-icons/vsc";

const FeedbackButton = ({ setOnFeedbacksClick, feedbacksCount }) => {
  return (
    <button
      className="like__btn"
      onClick={() => setOnFeedbacksClick((state) => !state)}
    >
      <VscFeedback />
      <p style={{ color: "#304261" }}>
        Отзиви <span className="feedbacks-count">{feedbacksCount}</span>
      </p>
    </button>
  );
};

export default FeedbackButton;
