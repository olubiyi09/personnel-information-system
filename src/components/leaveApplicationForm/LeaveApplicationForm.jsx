import React from 'react';
import styles from './LeaveApplicationForm.module.css';

const LeaveApplicationForm = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        onClose();
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalContent}>
                    <h2>Leave Application</h2>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <label htmlFor="date">Date:</label>
                        <input type="date" id="date" name="date" required />

                        <label htmlFor="type">Type:</label>
                        <select id="type" name="type" required>
                            <option value="vacation">Vacation</option>
                            <option value="sick_leave">Sick Leave</option>
                            <option value="personal">Personal</option>
                        </select>

                        <label htmlFor="reason">Reason:</label>
                        <textarea id="reason" name="reason" rows="4" required></textarea>

                        <div className={styles.buttonContainer}>
                            <button type="submit" className={styles.submitButton}>Submit</button>
                            <button type="button" className={styles.cancelButton} onClick={onClose}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LeaveApplicationForm;
