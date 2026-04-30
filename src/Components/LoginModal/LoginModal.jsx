import React, { useState } from 'react';
import useForm from '../../Hooks/useForm';
import { login } from '../../Services/authService';
import useRequest from '../../Hooks/useRequest';
import { AuthContext } from '../../Context/AuthContext';
import { useContext, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../login-register-modal.css';

const LoginModal = ({ setIsOpen, onSwitchToRegister, onSwitchToReset }) => {
    const [showPassword, setShowPassword] = useState(false);
    const {
        sendRequest,
        error,
        response,
        loading
    } = useRequest();
    const LOGIN_FORM_FIELDS = {
        EMAIL: 'email',
        PASSWORD: 'password'
    };
    const initialFormState = {
        [LOGIN_FORM_FIELDS.EMAIL]: '',
        [LOGIN_FORM_FIELDS.PASSWORD]: ''
    };
    const { manageLogin } = useContext(AuthContext);

    function onLogin(formState) {
        sendRequest({
            requestCb: async () => {
                return await login({
                    email: formState[LOGIN_FORM_FIELDS.EMAIL],
                    password: formState[LOGIN_FORM_FIELDS.PASSWORD]
                })
            }
        })
    };
    const {
        handleChangeInput,
        formState,
        onSubmit
    } = useForm({
        initialFormState,
        submitFn: onLogin
    });
    console.log(
        {
            response,
            error,
            loading
        }
    );

    useEffect(
        () => {
            if (response && response.ok) {
                setIsOpen();
                manageLogin(response.data.auth_token)
            }
        },
        [response, manageLogin, setIsOpen]
    );
    console.log(formState);
    return (
        <>
            <div className='modal-container'>
                <h1>Iniciar sesión</h1>
                <form className='form' onSubmit={onSubmit}>
                    <div className='form-control'>
                        <label htmlFor=''>Email</label>
                        <input type='email' id='email' className='input' name={LOGIN_FORM_FIELDS.EMAIL} onChange={handleChangeInput} value={formState[LOGIN_FORM_FIELDS.EMAIL]} required />
                    </div>
                    <div className='form-control'>
                        <label htmlFor=''>Contraseña</label>
                        <div className='password-wrapper'>
                            <input type={showPassword ? 'text' : 'password'} id='password' className='input' name={LOGIN_FORM_FIELDS.PASSWORD} onChange={handleChangeInput} value={formState[LOGIN_FORM_FIELDS.PASSWORD]} required />
                            <span className='login-eye-icon' onClick={() => setShowPassword(!showPassword)} onMouseDown={(e) => e.preventDefault()}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>
                    <button type='submit'>Iniciar sesión</button>
                </form>
                {error && <p className='error'>Error al iniciar sesión: {error.message || 'Credenciales incorrectas'}</p>}
                <span>¿No tienes una cuenta? <p className='form-link' onClick={onSwitchToRegister}>Registrarse</p></span>
                <br />
                <span>¿Olvidaste tu contraseña? <p className='form-link' onClick={onSwitchToReset}>Restablecer</p></span>
            </div>
        </>
    )
};

export default LoginModal;