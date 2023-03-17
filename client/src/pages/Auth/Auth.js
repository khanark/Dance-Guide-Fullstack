import ForgottenPassword from './Forgotten/ForgottenPassword';
import Layout from '../../components/Layout/Layout';
import LoginForm from '../../components/Forms/Login/LoginForm';
import PageContainer from '../../components/Layout/PageContainer/PageContainer';
import RegisterEdit from '../../components/Forms/RegisterEdit/RegisterEdit';
import { useParams } from 'react-router-dom';

const Auth = () => {
    const { type } = useParams();

    return (
        <Layout>
            <PageContainer styles={{ flexDirection: 'column', gap: '20px' }}>
                {type === 'forgotten' && <ForgottenPassword />}
                {type === 'login' && <LoginForm />}
                {type === 'register' && (
                    <RegisterEdit formType="register" action="Регистрирай се" />
                )}
            </PageContainer>
        </Layout>
    );
};

export default Auth;
