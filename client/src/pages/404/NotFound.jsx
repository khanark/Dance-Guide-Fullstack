import './NotFound.scss';

import { GiFishEscape } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="not-found">
            <div className="error">
                <div className="transparent">
                    <div className="error-msg">
                        <p>
                            <span>Oops</span>, Page Not Found!
                        </p>
                    </div>
                </div>
                <div className="call-to-action">
                    <Link className="redirect" to="/">
                        Click here
                    </Link>
                    <p className="escape">to escape</p>
                    <GiFishEscape />
                </div>
            </div>
        </div>
    );
};

export default NotFound;
