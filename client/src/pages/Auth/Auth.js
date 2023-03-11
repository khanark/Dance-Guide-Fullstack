import './Auth.scss';

import ForgottenPassword from './Forgotten/ForgottenPassword';
import Layout from '../../components/Layout/Layout';
import Login from './Login/Login';
import Register from './Register/Register';
import { useParams } from 'react-router-dom';

const Auth = () => {
  const { type } = useParams('login');
  console.log(type);
  return (
    <Layout>
      <article className="auth-page">
        {type == 'forgotten' && <ForgottenPassword />}
        {type == 'login' && <Login />}
        {type == 'register' && <Register />}
      </article>
    </Layout>
  );
};

export default Auth;
