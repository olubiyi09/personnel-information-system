import React, { useState } from 'react';
import styles from './LeaveManagement.module.css';
import { IoMdAdd } from "react-icons/io";
import LeaveApplicationForm from '../leaveApplicationForm/LeaveApplicationForm';

const LeaveManagement = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const openForm = () => {
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
    };

    const leaveHistory = [
        { id: 1, date: '2024-03-01', type: 'Vacation', status: 'Approved' },
        { id: 2, date: '2024-03-10', type: 'Sick Leave', status: 'Pending' },
        { id: 3, date: '2024-03-15', type: 'Personal', status: 'Rejected' },
    ];

    return (
        <div className={styles.leave}>
            <div className={styles.header}>
                <h1>Leave Management</h1>
                <button className="flex items-center" onClick={openForm}>
                    New Application<span className={styles.icon}><IoMdAdd size={18} /></span>
                </button>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {leaveHistory.map((leave) => (
                        <tr key={leave.id}>
                            <td>{leave.id}</td>
                            <td>{leave.date}</td>
                            <td>{leave.type}</td>
                            <td>{leave.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <LeaveApplicationForm isOpen={isFormOpen} onClose={closeForm} />
        </div>
    );
};

export default LeaveManagement;
