import React, { createContext, useState, useCallback } from 'react';
import Modal from '../Components/Modal/Modal';

export const AlertContext = createContext({
    showAlert: (message) => { },
    showConfirm: (message, onConfirm) => { }
});

export function AlertProvider({ children }) {
    const [alertState, setAlertState] = useState({
        isOpen: false,
        message: '',
        type: 'alert',
        onConfirm: null
    });

    const showAlert = useCallback((message) => {
        setAlertState({
            isOpen: true,
            message,
            type: 'alert',
            onConfirm: null
        });
    }, []);

    const showConfirm = useCallback((message, onConfirm) => {
        setAlertState({
            isOpen: true,
            message,
            type: 'confirm',
            onConfirm
        });
    }, []);

    const handleClose = () => setAlertState(prev => ({ ...prev, isOpen: false }));
    const handleConfirm = () => {
        if (alertState.onConfirm) alertState.onConfirm();
        handleClose();
    };

    return (
        <AlertContext.Provider value={{ showAlert, showConfirm }}>
            {children}
            {alertState.isOpen && (
                <Modal onClose={handleClose}>
                    <div style={{ padding: '1.5rem', textAlign: 'center', color: '#213547', minWidth: 'min(300px, 100%)' }}>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>
                            {alertState.type === 'confirm' ? 'Confirmar' : 'Aviso'}
                        </h3>
                        <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>{alertState.message}</p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            {alertState.type === 'confirm' && (
                                <button
                                    onClick={handleClose}
                                    style={{ padding: '0.5rem 1.5rem', border: '1px solid #cbd5e0', borderRadius: '6px', background: '#fff', cursor: 'pointer', fontSize: '1rem', fontWeight: '500' }}
                                >
                                    Cancelar
                                </button>
                            )}
                            <button
                                onClick={alertState.type === 'confirm' ? handleConfirm : handleClose}
                                style={{ padding: '0.5rem 1.5rem', border: 'none', borderRadius: '6px', background: '#3182ce', color: '#fff', cursor: 'pointer', fontSize: '1rem', fontWeight: '500' }}
                            >
                                Aceptar
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </AlertContext.Provider>
    )
};
