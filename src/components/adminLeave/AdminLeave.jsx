import React, { useEffect, useState } from 'react';
import styles from './AdminLeave.module.css';
import LeaveApplicationForm from '../leaveApplicationForm/LeaveApplicationForm';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/loaderSlide';
import { setLeaveData } from '@/redux/leaveSlice';
import axios from 'axios';

const AdminLeave = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const currentUser = useSelector((state) => state.users.currentUser);
    const leaveData = useSelector((state) => state.leave.leaveData);
    const [myLeaveHistory, setMyLeaveHistory] = useState([]);

    const { loading } = useSelector((state) => state.loaders)
    const dispatch = useDispatch();

    const openForm = () => {
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (month < 10) {
            month = `0${month}`;
        }
        if (day < 10) {
            day = `0${day}`;
        }

        return `${year}-${month}-${day}`;
    };

    const fetchUserLeaves = async () => {
        if (currentUser && currentUser._id) {
            try {
                dispatch(setLoading(true));
                const response = await axios.get("/api/getleaves");
                dispatch(setLeaveData(response.data.data));
                setMyLeaveHistory(response.data.data);
                if (!response.data.success) {
                    throw new Error("Failed to fetch leave applications");
                }
            } catch (error) {
                // console.error("Error fetching user leaves:", error);
            } finally {
                dispatch(setLoading(false));
            }
        }
    };

    useEffect(() => {
        fetchUserLeaves();
    }, [currentUser]);

    const displayHistory = leaveData.map(leave => ({
        ...leave,
        date: formatDate(leave.date)
    }));

    const addNewLeave = (newLeave) => {
        setMyLeaveHistory([...myLeaveHistory, newLeave]);
    };

    const handleStatusChange = async (event, index) => {
        const newLeaveData = [...leaveData];
        const updatedLeave = { ...newLeaveData[index] };
        updatedLeave.applicationStatus = event.target.value;
        newLeaveData[index] = updatedLeave;

        try {
            dispatch(setLoading(true));
            const response = await axios.put(`/api/getleaves`, {
                userId: updatedLeave._id,
                applicationStatus: updatedLeave.applicationStatus
            });

            // Log the _id of the leave and the new status
            console.log(`Updated leave ${updatedLeave._id} status to: ${updatedLeave.applicationStatus}`);

            // Update local state
            dispatch(setLeaveData(newLeaveData));
            toast.success(response.data.message)
        } catch (error) {
            console.error("Error updating leave status:", error);
            // Optionally, show an error toast
            toast.error("Failed to update leave status");
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className={styles.leave}>
            <h1>Leave Management</h1>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Full Name</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {displayHistory.length > 0 ? (
                        displayHistory.map((leave, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{leave.fullname}</td>
                                <td>{leave.date}</td>
                                <td>{leave.leaveType}</td>
                                <td>
                                    <select
                                        value={leave.applicationStatus}
                                        onChange={(event) => handleStatusChange(event, index)}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No Applications yet</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <LeaveApplicationForm isOpen={isFormOpen} onClose={closeForm} addNewLeave={addNewLeave} />
        </div>
    );
};

export default AdminLeave;
