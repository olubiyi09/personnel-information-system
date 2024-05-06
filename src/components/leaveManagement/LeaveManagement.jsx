import React, { useEffect, useState } from 'react';
import styles from './LeaveManagement.module.css';
import { IoMdAdd } from "react-icons/io";
import LeaveApplicationForm from '../leaveApplicationForm/LeaveApplicationForm';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/loaderSlide';
import { setLeaveData } from '@/redux/leaveSlice';
import axios from 'axios';

const LeaveManagement = () => {
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
    })).filter(leave => leave.userID === currentUser._id);

    const addNewLeave = (newLeave) => {
        setMyLeaveHistory([...myLeaveHistory, newLeave]);
    };

    console.log(leaveData);

    return (
        <div className={styles.leave}>
            <div className={styles.header}>
                <h1>Leave Management</h1>
                <button className="flex items-center" onClick={openForm}>
                    New Application<span className={styles.icon}><IoMdAdd size={18} /></span>
                </button>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
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
                            displayHistory.reverse().map((leave, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{leave.fullname}</td>
                                    <td>{leave.date}</td>
                                    <td>{leave.leaveType}</td>
                                    <td>{leave.applicationStatus}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No Applications yet</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
            <LeaveApplicationForm isOpen={isFormOpen} onClose={closeForm} addNewLeave={addNewLeave} />
        </div>
    );
};

export default LeaveManagement;
