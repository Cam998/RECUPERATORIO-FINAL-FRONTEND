import React from 'react';
import './modal.css';

function Modal({ children, onClose }) {
    return (
        <>
            <div className='backdrop-modal' onClick={onClose}>
                <dialog className='modal-dialog' open onClick={(e) => e.stopPropagation()}>
                    {children}
                </dialog>
            </div>
        </>
    )
};

export default Modal; 