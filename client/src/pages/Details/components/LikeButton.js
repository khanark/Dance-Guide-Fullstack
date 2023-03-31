import { BsFillHandThumbsUpFill, BsHandThumbsUp } from "react-icons/bs";

const LikeButton = ({ handleLikes, isLiked }) => {
  return (
    <button className="like__btn" onClick={handleLikes}>
      {isLiked ? <BsFillHandThumbsUpFill /> : <BsHandThumbsUp />}
      <p style={{ color: isLiked ? "#304261" : "#525252" }}>Харесване</p>
    </button>
  );
};

export default LikeButton;
