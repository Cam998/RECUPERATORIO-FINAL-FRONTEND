import React, { useContext, useState } from 'react';
import './navbar.css';
import Modal from '../Modal/Modal';
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';
import ResetPasswordRequest from '../ResetPasswordRequest/ResetPasswordRequest';
import { NavLink } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';

function NavBar() {
    const [modalView, setModalView] = useState('login');
    const { isLogged, manageLogout, showLoginModal, openLoginModal, closeLoginModal } = useContext(AuthContext);

    const handleCloseModal = () => {
        closeLoginModal();
        setModalView('login');
    };

    const checkLogin = () => {
        if (isLogged) {
            manageLogout();
        }
        else {
            openLoginModal();
        }
    };
    return (
        <>
            <header>
                <h2>Blog de recetas</h2>
                <ul>
                    <li><NavLink to='/'>Página principal</NavLink></li>
                    <li onClick={() => !isLogged && openLoginModal()}><NavLink to={isLogged ? '/miReceta' : '/'}>Mis recetas</NavLink></li>
                    <li onClick={() => !isLogged && openLoginModal()}><NavLink to={isLogged ? '/favReceta' : '/'}>Favoritas</NavLink></li>
                    <li onClick={checkLogin}><p className='nav-login'>{(!isLogged) ? "Iniciar sesión" : "Cerrar sesión"}</p></li>
                </ul>
            </header>
            {showLoginModal && (
                <Modal onClose={handleCloseModal}>
                    {modalView === 'login' && (
                        <LoginModal setIsOpen={handleCloseModal} onSwitchToRegister={() => setModalView('register')} onSwitchToReset={() => setModalView('reset')} />
                    )}
                    {modalView === 'register' && (
                        <RegisterModal onSwitchToLogin={() => setModalView('login')} setIsOpen={handleCloseModal} />
                    )}
                    {modalView === 'reset' && (
                        <ResetPasswordRequest onSwitchToLogin={() => setModalView('login')} onSwitchToRegister={() => setModalView('register')} />
                    )}
                </Modal>
            )}
        </>
    )
};

export default NavBar;