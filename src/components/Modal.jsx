import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, children }) => {

  const closeModal = () => {
    onClose();
  };

  return (
    // Render the modal only when isOpen prop is true
    
    isOpen && (
      <div style={{backgroundColor:'rgba(0,0,0, 0.8)'}}  className="modal-overlay">
        
        <button className='btn ' onClick={closeModal}><i  style={{backgroundColor:'white'}} className="fa-regular fa-rectangle-xmark card_pop"></i></button>
        
        {children}
      </div>
    )
  );
};

export default Modal;