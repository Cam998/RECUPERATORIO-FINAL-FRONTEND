import React, { useEffect, useContext } from 'react';
import useRequest from '../../Hooks/useRequest';
import useForm from '../../Hooks/useForm';
import { register } from '../../Services/authService';
import { AlertContext } from '../../Context/AlertContext';
import '../login-register-modal.css';

const RegisterModal = ({ onSwitchToLogin, setIsOpen }) => {
    const {
        sendRequest,
        response,
        error
    } = useRequest();
    const { showAlert } = useContext(AlertContext);
    const REGISTER_FORM_FIELDS = {
        EMAIL: 'email',
        PASSWORD: 'password',
        NAME: 'name'
    };
    const initialFormState = {
        [REGISTER_FORM_FIELDS.NAME]: '',
        [REGISTER_FORM_FIELDS.EMAIL]: '',
        [REGISTER_FORM_FIELDS.PASSWORD]: ''
    };

    function onRegister(formState) {
        sendRequest(
            {
                requestCb: () => {
                    return register(
                        {
                            email: formState[REGISTER_FORM_FIELDS.EMAIL],
                            password: formState[REGISTER_FORM_FIELDS.PASSWORD],
                            name: formState[REGISTER_FORM_FIELDS.NAME]
                        }
                    )
                }
            }
        )
    };

    const {
        handleChangeInput,
        onSubmit,
        formState
    } = useForm({ initialFormState, submitFn: onRegister });

    useEffect(
        () => {
            if (response && response.ok) {
                showAlert("Te has registrado con éxito. Te enviamos un mail con instrucciones")
                setIsOpen();
            }
        },
        [response, setIsOpen, showAlert]
    );

    return (
        <>
            <div className='modal-container'>
                <h1>Registrarse</h1>
                <form className='form' onSubmit={onSubmit}>
                    <div className='form-control'>
                        <label htmlFor=''>Nombre de usuario</label>
                        <input type='text' id='nombre' className='input' name={REGISTER_FORM_FIELDS.NAME} onChange={handleChangeInput} value={formState[REGISTER_FORM_FIELDS.NAME]} required />
                    </div>
                    <div className='form-control'>
                        <label htmlFor=''>Email</label>
                        <input type='email' id='email' className='input' name={REGISTER_FORM_FIELDS.EMAIL} onChange={handleChangeInput} value={formState[REGISTER_FORM_FIELDS.EMAIL]} required />
                    </div>
                    <div className='form-control'>
                        <label htmlFor=''>Contraseña</label>
                        <input type='password' id='contraseña' className='input' name={REGISTER_FORM_FIELDS.PASSWORD} onChange={handleChangeInput} value={formState[REGISTER_FORM_FIELDS.PASSWORD]} required />
                    </div>
                    <button type='submit'>Registrarse</button>
                </form>
                {error && <p className='error'>Error al registrarse: {error.message || 'Inténtalo de nuevo'}</p>}
                <span>¿Ya tienes una cuenta? <p className='form-link' onClick={onSwitchToLogin}>Iniciar sesión</p></span>
            </div>
        </>
    )
};

export default RegisterModal;
