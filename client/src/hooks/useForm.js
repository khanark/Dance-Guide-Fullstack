import { useContext, useEffect, useState } from 'react';

import { UserContext } from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';

export const useForm = (initialFields, request, validateForm) => {
    const [fields, setFields] = useState(initialFields);
    const [errors, setErrors] = useState({});
    const { user, setUser } = useContext(UserContext);
    const [isSubmitClicked, setIsSubmitClicked] = useState(false);

    const navigate = useNavigate();

    const onChangeHandler = e => {
        const { name, value } = e.target;
        setFields(f => (f = { ...fields, [name]: value }));
    };

    const onSubmitHandler = async e => {
        e.preventDefault();
        setErrors(validateForm(fields));
        setIsSubmitClicked(true);
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitClicked) {
            console.log([...Object.values(fields)]);
            request(...Object.values(fields))
                .then(user => {
                    setUser(user);
                    navigate(initialFields.redirect);
                })
                .catch(err => {
                    setErrors({
                        ...errors,
                        fetch: 'Невалидно потребителско име или парола',
                    });
                });
        }
    }, [
        errors,
        fields,
        isSubmitClicked,
        initialFields.redirect,
        navigate,
        request,
    ]);

    return {
        form: { fields, errors },
        handlers: { onChangeHandler, onSubmitHandler },
    };
};
