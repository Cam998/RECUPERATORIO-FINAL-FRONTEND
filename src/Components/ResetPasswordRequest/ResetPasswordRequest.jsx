import React from 'react';
import useForm from '../../Hooks/useForm';
import useRequest from '../../Hooks/useRequest';
import { resetPasswordRequest } from '../../Services/authService';
import '../login-register-modal.css';

const ResetPasswordRequest = ({ onSwitchToLogin, onSwitchToRegister }) => {
    const {
        sendRequest,
        response,
        error,
        loading
    } = useRequest();
    const FORM_FIELDS = {
        EMAIL: 'email'
    };
    const initialFormState = {
        [FORM_FIELDS.EMAIL]: ''
    };

    function submitResetPasswordRequest() {
        sendRequest(
            {
                requestCb: async () => {
                    return await resetPasswordRequest({ email: formState[FORM_FIELDS.EMAIL] })
                }
            }
        )
    };

    const {
        handleChangeInput,
        onSubmit,
        formState
    } = useForm({
        initialFormState: initialFormState,
        submitFn: submitResetPasswordRequest
    });
    console.log(formState);

    return (
        <div className='modal-container'>
            <h1>
                Restablecer contraseña
            </h1>
            {
                response && !loading && !error ?
                    <p>{response.message}</p>
                    :
                    <>
                        <form className='form' onSubmit={onSubmit}>
                            <div className='form-control'>
                                <label htmlFor='email'>Email:</label>
                                <input type='email' id='email' className='input' name={FORM_FIELDS.EMAIL} onChange={handleChangeInput} value={formState[FORM_FIELDS.EMAIL]} required />
                            </div>
                            <button type='submit' disabled={loading}>{loading ? 'Cargando' : 'Enviar solicitud'}</button>
                        </form>
                        {error && <p className='error'>Error al enviar solicitud: {error.message}</p>}
                        <span>¿Recuerdas tu contraseña? <p className='form-link' onClick={onSwitchToLogin}>Iniciar sesión</p></span>
                        <br />
                        <span>¿No tienes una cuenta? <p className='form-link' onClick={onSwitchToRegister}>Registrarse</p></span>
                    </>
            }
        </div>
    )
};

export default ResetPasswordRequest;
