import '../../assets/styles/Form.css';
import './Register.css';

import { useEffect, useState } from 'react';

import FieldsError from '../../components/Forms/Errors/Fields/FieldsError';
import Layout from '../../components/Layout/Layout';
import { Spinner } from '@chakra-ui/react';
import { registerSchemaValidation } from '../../YupSchemas/validation_schema';
import { registerUser } from '../../services/users';
import { setPageTitle } from '../../util/util';
import { useForm } from 'react-hook-form';
import { useNotification } from '../../hooks/useNotification';
import { useUserContext } from '../../contexts/AuthContext';
import { yupResolver } from '@hookform/resolvers/yup';

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setPageTitle('Sign Up');
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchemaValidation),
  });

  const { navigate, setEmail } = useUserContext();
  const { notificateError, notificateSuccess } = useNotification();

  const onSubmitRegister = async data => {
    try {
      setIsLoading(true);
      await registerUser(data);
      notificateSuccess({
        title: 'Successfull registration',
        description: 'Thanks for signing up!',
      });
      setTimeout(() => navigate('/login'), 1500);
      setEmail(data.email.toLowerCase());
    } catch (error) {
      setIsLoading(false);
      notificateError({
        title: 'Register failed.',
        description: `${error.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-wrapper section">
      <form className="form">
        <h3 className="title-secondary">Let's get started</h3>
        <h5 className="form-desc">Experience more, sign up with us!</h5>
        <div className="form-grid--wrapper">
          <label htmlFor="firstName" className="form-label">
            <p className="input-label">First name</p>
            <input className="form-input" {...register('firstName')} />
            <FieldsError msg={errors.firstName?.message} />
          </label>
          <label htmlFor="lastName" className="form-label">
            <p className="input-label">Last name</p>
            <input className="form-input" {...register('lastName')} />
            <FieldsError msg={errors.lastName?.message} />
          </label>
        </div>
        <label htmlFor="email" className="form-label">
          <p className="input-label">Email</p>
          <input className="form-input" {...register('email')} />
          <FieldsError msg={errors.email?.message} />
        </label>
        <label htmlFor="city" className="form-label">
          <p className="input-label">City</p>
          <input className="form-input" placeholder="Plovdiv..." {...register('city')} />
          <FieldsError msg={errors.city?.message} />
        </label>
        <label htmlFor="expertise" className="form-label form-expertise">
          <p className="input-label">Dance expertise</p>
          <input className="form-input" placeholder="Dance Expert..." {...register('expertise')} />
          <FieldsError msg={errors.expertise?.message} />
        </label>

        <label htmlFor="phoneNumber" className="form-label">
          <p className="input-label">Phone number</p>
          <div className="form-number--prepend">
            <p className="phone-prefix">+359</p>
            <input
              className="form-input"
              type="number"
              placeholder="877558277"
              {...register('phoneNumber')}
            />
          </div>
          <FieldsError msg={errors.phoneNumber?.message} />
        </label>

        <label htmlFor="password" className="form-label">
          <p className="input-label">Password</p>
          <input className="form-input" type="password" {...register('password')} />
          <FieldsError msg={errors.password?.message} />
        </label>

        <label htmlFor="repass" className="form-label">
          <p className="input-label">Password repeat</p>
          <input className="form-input" type="password" {...register('repeatedPassword')} />
          <FieldsError msg={errors.repeatedPassword?.message} />
        </label>
        <div className="btn-wrapper">
          <button
            className="btn form-btn"
            type="button"
            disabled={isLoading}
            onClick={handleSubmit(onSubmitRegister)}
          >
            {isLoading && <Spinner className="btn-spinner" />}
            Register
          </button>
          {isLoading && <p className="btn-desc">Creating your account ☻...</p>}
        </div>
      </form>
    </div>
  );
};

export default Register;
