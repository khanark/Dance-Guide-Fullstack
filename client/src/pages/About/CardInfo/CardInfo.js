import './CardInfo.scss';

const CardInfo = ({ title, text }) => {
    return (
        <div className="card-info">
            <h2 className="card-info__header">{title}</h2>
            <p className="card-info__text">{text}</p>
        </div>
    );
};

export default CardInfo;
