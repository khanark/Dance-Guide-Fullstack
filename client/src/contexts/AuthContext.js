import { createContext, useContext, useMemo, useState } from 'react';

import { useLocalStorage } from '../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const { user, setUser, clearUser } = useLocalStorage();
    const [navigationRef, setNavigationRef] = useState(null); // This is so we can scroll to the top of the navigation bar

    // This state is being used if the user is new
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const context = useMemo(() => {
        return {
            user,
            setUser,
            clearUser,
            setEmail,
            email,
            navigate,
            navigationRef,
            setNavigationRef,
        };
    }, [clearUser, email, navigate, navigationRef, setEmail, setUser, user]);

    return (
        <UserContext.Provider value={context}>{children}</UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    return context;
};

export default UserContextProvider;
