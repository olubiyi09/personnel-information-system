// components/Modal.js

import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ isOpen, onClose, title, description }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalContent}>
                    <h2>{title}</h2>
                    <p>{description}</p>
                    <button className={styles.closeButton} onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
