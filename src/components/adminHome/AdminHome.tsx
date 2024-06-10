import React, { useEffect, useState } from 'react';
import { FaUsersBetweenLines } from 'react-icons/fa6';
import { FaCheckDouble } from 'react-icons/fa6';
import { MdSupervisorAccount } from 'react-icons/md';
import { FaQuestion } from 'react-icons/fa6';
import styles from '../admin/Admin.module.css';
import BarChart from '../barChart/BarChart';
import Loader from '../loader/Loader';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/redux/loaderSlide';
import axios from 'axios';
import { setLeaveData } from '@/redux/leaveSlice';
import { toast } from 'sonner';

const AdminHome = () => {
    const [allUsers, setAllUsers] = useState([])
    const [myLeaveHistory, setMyLeaveHistory] = useState([]);
    const dispatch = useDispatch();
    const unapprovedUsersCount: number = allUsers ? allUsers.filter((user: { role: string }) => user.role === "Unapproved").length : 0;
    const supervisorCount: number = allUsers ? allUsers.filter((user: { role: string }) => user.role === "Supervisor").length : 0;
    const numberofUsers = allUsers?.length;
    console.log(unapprovedUsersCount);


    useEffect(() => {
        const getAllUser = async () => {
            try {
                dispatch(setLoading(true))
                const response = await axios.get("/api/users/getallusers");
                // console.log(response.data.data);
                setAllUsers(response.data.data)

            } catch (error) {
                toast.error("something went wrong")
            } finally {
                dispatch(setLoading(false))
            }
        }

        getAllUser()
    }, [])


    useEffect(() => {
        const fetchUserLeaves = async () => {
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

        fetchUserLeaves();
    }, []);



    const leaveApplicationsCount = myLeaveHistory.length;

    // Update chartData to use numberofUsers and leaveApplicationsCount
    const chartData = [numberofUsers, leaveApplicationsCount, supervisorCount, unapprovedUsersCount];

    return (
        <div>
            {!allUsers ? (
                <Loader />
            ) : (
                <>
                    <div className={styles['card-wrapper']}>
                        <div className={styles.card}>
                            Total Users <span className="flex items-center">{numberofUsers} <span className={`ml-1 ${styles.icon1}`}><FaUsersBetweenLines size={19} /></span></span>
                        </div>
                        <div className={styles.card}>
                            leave applications <span className="flex items-center">{leaveApplicationsCount} <span className={`ml-1 ${styles.icon2}`}><FaCheckDouble size={19} /></span></span>
                        </div>
                        <div className={styles.card}>
                            Total Supervisor <span className="flex items-center">{supervisorCount} <span className={`ml-1 ${styles.icon3}`}><MdSupervisorAccount size={19} /></span></span>
                        </div>
                        <div className={styles.card}>
                            UnApproved Users <span className="flex items-center">{unapprovedUsersCount} <span className={`ml-1 ${styles.icon4}`}><FaQuestion size={19} /></span></span>
                        </div>
                    </div>

                    <div className={styles.chartContainer}>
                        <BarChart data={chartData} />
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminHome;
