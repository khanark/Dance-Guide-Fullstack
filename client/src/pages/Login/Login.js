import '../../assets/styles/Form.css';
import './Login.css';

import { IoEye, IoEyeOff } from 'react-icons/io5';
import { useEffect, useState } from 'react';

import FieldsError from '../../components/Forms/Errors/Fields/FieldsError';
import Layout from '../../components/Layout/Layout';
import { Spinner } from '@chakra-ui/react';
import { login } from '../../services/users';
import { loginSchemaValidation } from '../../YupSchemas/validation_schema';
import { setPageTitle } from '../../util/util';
import { useForm } from 'react-hook-form';
import { useNotification } from '../../hooks/useNotification';
import { useUserContext } from '../../contexts/AuthContext';
import { yupResolver } from '@hookform/resolvers/yup';

const Login = () => {
    const [eye, setEye] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setPageTitle('Login');
    }, []);

    const { notificateSuccess, notificateError } = useNotification();

    const { setUser, navigate, email, setEmail } = useUserContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: { email },

        resolver: yupResolver(loginSchemaValidation),
    });

    const onSubmitLogin = async (data) => {
        try {
            setIsLoading(true);
            const userData = await login(data);
            notificateSuccess({
                title: 'Login successful.',
                description: `Nice to see you back ${userData.firstName} ☺ !`,
            });
            setUser({ ...userData, isNewAcc: Boolean(email) });
            setEmail('');
            setTimeout(() => navigate('/catalog'), 1500);
        } catch (error) {
            setIsLoading(false);
            notificateError({
                title: 'Wrong details.',
                description: 'Wrong username or password.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="form-wrapper section">
            <form className="form">
                <h3 className="title-secondary">Welcome back</h3>
                <h5 className="form-desc">Sign in to join our community!</h5>
                <label htmlFor="email" className="form-label">
                    <p className="input-label">Email</p>
                    <input className="form-input" {...register('email')} />
                    <FieldsError msg={errors.email?.message} />
                </label>
                <label htmlFor="password" className="form-label">
                    <p className="input-label">Password</p>
                    <div className="password-wrapper">
                        <input
                            className="form-input"
                            type={eye ? 'text' : 'password'}
                            {...register('password')}
                        />
                        <button
                            className="eye-btn"
                            type="button"
                            onClick={() => setEye(!eye)}
                        >
                            <FieldsError msg={errors.password?.message} />
                            {eye ? (
                                <IoEye className="eye-icon" />
                            ) : (
                                <IoEyeOff className="eye-icon" />
                            )}
                        </button>
                    </div>
                </label>
                <div className="button-wrapper">
                    <button
                        className="btn form-btn"
                        type="button"
                        disabled={isLoading}
                        onClick={handleSubmit(onSubmitLogin)}
                    >
                        {isLoading && <Spinner className="btn-spinner" />}
                        Login
                    </button>
                    {isLoading && (
                        <p className="btn-desc">Opening the door for you...</p>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Login;
