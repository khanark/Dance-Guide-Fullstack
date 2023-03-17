import './RegisterEdit.scss';

import DatabaseError from '../Errors/Database/DatabaseError';
import FieldsError from '../Errors/Fields/FieldsError';
import { Link } from 'react-router-dom';
import { register } from '../../../services/users';
import { useForm } from '../../../hooks/useForm';

const RegisterEdit = props => {
    const formType = props.formType;
    const {
        form: { fields, errors },
        handlers: { onChangeHandler, onSubmitHandler },
    } = useForm(
        {
            email: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            password: '',
            redirect: '/catalog',
        },
        register,
        fields => {
            const formErrors = {};
            const emailRegex = /^[\w-.]+@([\w-]+.)+[\w-]{2,}$/;
            const phoneRegex =
                /^(?:\+359|0)(?:87|88|89)(?:\d{7}|\d{3}\s\d{2}\s\d{2}|\d{3}-\d{2}-\d{2})$/;

            if (!fields.email) {
                formErrors.email = 'Моля въведете имейл адрес';
            } else if (!emailRegex.test(fields.email)) {
                formErrors.email = 'Невалиден формат на имейл адрес';
            }
            if (!fields.firstName) {
                formErrors.firstName = 'Моля въведете вашето име';
            } else if (fields.firstName.length < 3) {
                formErrors.firstName =
                    'Името трябва да съдържа най - малко 3 символа';
            }
            if (!fields.lastName) {
                formErrors.lastName = 'Моля въведете вашата фамилия';
            } else if (fields.lastName.length < 3) {
                formErrors.lastName =
                    'Фамилията трябва да съдържа най - малко 3 символа';
            }
            if (!fields.phoneNumber) {
                formErrors.phoneNumber = 'Моля въведете вашият телефонен номер';
            } else if (!phoneRegex.test(fields.phoneNumber)) {
                formErrors.phoneNumber = 'Невалиден формат на т. номер';
            }
            if (!fields.password) {
                formErrors.password = 'Моля въведете парола';
            }
            return formErrors;
        }
    );

    return (
        <div className="register-form">
            {errors.fetch && <DatabaseError msg={errors.fetch} />}
            <form action="">
                <label htmlFor="email">
                    Имейл *
                    <input
                        type="text"
                        name="email"
                        id="email"
                        value={fields.email}
                        onChange={onChangeHandler}
                    />
                    <FieldsError msg={errors.email} />
                </label>
                <label htmlFor="firstName">
                    Име *
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={fields.firstName}
                        onChange={onChangeHandler}
                    />
                    <FieldsError msg={errors.firstName} />
                </label>
                <label htmlFor="lastName">
                    Фамилия *
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={fields.lastName}
                        onChange={onChangeHandler}
                    />
                    <FieldsError msg={errors.lastName} />
                </label>
                <label htmlFor="phoneNumber">
                    Телефонен Номер *
                    <input
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        value={fields.phoneNumber}
                        onChange={onChangeHandler}
                    />
                    <FieldsError msg={errors.phoneNumber} />
                </label>
                {formType === 'register' ? (
                    <label htmlFor="password">
                        Парола *
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={fields.password}
                            onChange={onChangeHandler}
                        />
                        <FieldsError msg={errors.password} />
                    </label>
                ) : (
                    <Link
                        to="/authentication/forgotten"
                        className="forgotten-password"
                    >
                        Смяна на паролата?
                    </Link>
                )}
            </form>
            {formType === 'register' && (
                <p className="no-registration">
                    Вече си част от нас?
                    <span>
                        <Link to="/authentication/login">Вход!</Link>
                    </span>
                </p>
            )}
            <button type="submit" onClick={onSubmitHandler}>
                {props.action}
            </button>
        </div>
    );
};

export default RegisterEdit;
