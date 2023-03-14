import './DatabaseError.scss';

import { MdError } from 'react-icons/md';

const DatabaseError = ({ msg }) => {
  return (
    <div className="login-form__main-error">
      <MdError />
      <p>{msg}</p>
    </div>
  );
};

export default DatabaseError;
