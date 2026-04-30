import { createContext, useState } from 'react';
import { useNavigate } from 'react-router';

export const AuthContext = createContext(
    {
        isLogged: false,
        manageLogin: () => { },
        manageLogout: () => { },
        showLoginModal: false,
        openLoginModal: () => { },
        closeLoginModal: () => { }
    }
);

export const LOCALSTORAGE_TOKEN_KEY = 'auth_token_slack';

function AuthContextProvider({ children }) {
    const navigate = useNavigate();
    const [isLogged, setIsLogged] = useState(
        Boolean(
            localStorage.getItem(LOCALSTORAGE_TOKEN_KEY)
        )
    );
    const [showLoginModal, setShowLoginModal] = useState(false);

    function manageLogin(auth_token) {
        localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, auth_token)
        setIsLogged(true)
        setShowLoginModal(false)
        navigate('/home')
    };

    function manageLogout() {
        localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY)
        setIsLogged(false)
        navigate('/')
    };

    function openLoginModal() {
        setShowLoginModal(true);
    };

    function closeLoginModal() {
        setShowLoginModal(false);
    };

    const providerValues = {
        isLogged,
        manageLogin,
        manageLogout,
        showLoginModal,
        openLoginModal,
        closeLoginModal
    };

    return (
        <AuthContext.Provider value={providerValues}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContextProvider;