// import React from 'react';
// import styles from './LeaveApplicationForm.module.css';

// const LeaveApplicationForm = ({ isOpen, onClose }) => {
//     if (!isOpen) return null;

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         onClose();
//     };

//     return (
//         <div className={styles.modalOverlay} onClick={onClose}>
//             <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
//                 <div className={styles.modalContent}>
//                     <h2>Leave Application</h2>
//                     <form onSubmit={handleSubmit} className={styles.form}>
//                         <label htmlFor="date">Date:</label>
//                         <input type="date" id="date" name="date" required />

//                         <label htmlFor="type">Type:</label>
//                         <select id="type" name="type" required>
//                             <option value="vacation">Vacation</option>
//                             <option value="sick_leave">Sick Leave</option>
//                             <option value="personal">Personal</option>
//                         </select>

//                         <label htmlFor="reason">Reason:</label>
//                         <textarea id="reason" name="reason" rows="4" required></textarea>

//                         <div className={styles.buttonContainer}>
//                             <button type="submit" className={styles.submitButton}>Submit</button>
//                             <button type="button" className={styles.cancelButton} onClick={onClose}>Cancel</button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LeaveApplicationForm;


import React, { useState } from 'react';
import styles from './LeaveApplicationForm.module.css';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/loaderSlide';
import axios from 'axios';
import { addLeave } from '@/redux/leaveSlice';

const LeaveApplicationForm = ({ isOpen, onClose }) => {
    const [date, setDate] = useState("");
    const [leaveType, setLeaveType] = useState("");
    const [reason, setReason] = useState("");
    const currentUser = useSelector((state) => state.users.currentUser);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            userID: currentUser._id,
            date,
            leaveType,
            reason,
            fullname: currentUser.fullname,
            applicationStatus: "Pending",
        };


        try {
            dispatch(setLoading(true));
            const response = await axios.post("/api/leavemanagement", formData);

            if (!response.data.success) {
                throw new Error("Failed to submit leave application");
            }
            dispatch(addLeave(formData));

            // console.log(response.data);
            toast.success(response.data.message)

            setDate("")
            setLeaveType("")
            setReason("")

            onClose();
        } catch (error) {
            toast.error("Error submitting leave application")
            // console.error("Error submitting leave application:", error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    if (!isOpen) return null;


    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalContent}>
                    <h2>Leave Application</h2>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <label htmlFor="date">Date:</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />

                        <label htmlFor="type">Type:</label>
                        <select
                            id="type"
                            name="type"
                            value={leaveType}
                            onChange={(e) => setLeaveType(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select Type</option>
                            <option value="vacation">Vacation</option>
                            <option value="sick_leave">Sick Leave</option>
                            <option value="personal">Personal</option>
                        </select>

                        <label htmlFor="reason">Reason:</label>
                        <textarea
                            id="reason"
                            name="reason"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            rows="4"
                            required
                        ></textarea>


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
