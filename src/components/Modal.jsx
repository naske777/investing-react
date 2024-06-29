import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        padding: '20px',
        background: '#fff',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        margin: '0 10px',

      }}>
        {children}
        <button className='button-secondary' onClick={onClose}>Cerrar</button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;