import React, { useState } from 'react';
import styles from "./Attendance.module.css";
import { useSelector, useDispatch } from 'react-redux';
import { setLoading } from '@/redux/loaderSlide';
import axios from 'axios';
import { toast } from 'sonner';

const Attendance = () => {
    const [timeIn, setTimeIn] = useState(null);
    const [timeOut, setTimeOut] = useState(null);
    const [timeInMessage, setTimeInMessage] = useState(null);
    const [timeOutMessage, setTimeOutMessage] = useState(null);
    const currentUser = useSelector((state) => state.users.currentUser);
    const dispatch = useDispatch();

    const getFormattedDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleTimeIn = async () => {
        try {
            dispatch(setLoading(true));
            const currentDate = getFormattedDate(); // Get date in YYYY-MM-DD format

            const requestBody = {
                userID: currentUser._id,
                fullname: currentUser.fullname,
                date: currentDate,
            };

            const response = await axios.post("/api/attendance", requestBody);
            console.log(response.data);

            if (response.status === 200 || response.status === 201) {
                // Success: HTTP status code 200 or 201 means "OK" or "Created"
                setTimeInMessage('You have successfully added your Time In Record today');
            } else if (response.status === 400) {
                // Already checked in: HTTP status code 400 means "Bad Request"
                setTimeInMessage(response.data.message || 'You have already checked in for today');
            } else {
                // Handle other status codes
                setTimeInMessage(response.data.message || 'Failed to add Time In Record');
            }

            // Clear the message after 3 seconds
            setTimeout(() => {
                setTimeInMessage(null);
            }, 3000);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                // Handle 400 status code from the response
                setTimeInMessage(error.response.data.message || 'You have already checked in for today');
            } else {
                // Handle other errors
                setTimeInMessage('Failed to add Time In Record');
            }
            // Clear the message after 3 seconds
            setTimeout(() => {
                setTimeInMessage(null);
            }, 3000);
        } finally {
            dispatch(setLoading(false));
        }
    };


    const handleTimeOut = async () => {
        try {
            dispatch(setLoading(true));
            const currentDate = getFormattedDate(); // Get date in YYYY-MM-DD format

            const requestBody = {
                userID: currentUser._id,
                fullname: currentUser.fullname,
                date: currentDate,
            };

            const response = await axios.put("/api/attendance", requestBody);
            // console.log(response.data);

            if (response.status === 200) {
                // Success: HTTP status code 200 means "OK"
                setTimeOutMessage(response.data.message || 'You have successfully checked out for today');
            } else if (response.status === 400) {
                // Not checked in: HTTP status code 400 means "Bad Request"
                setTimeOutMessage(response.data.message || 'You have not checked in for today');
            } else {
                // Handle other status codes
                setTimeOutMessage(response.data.message || 'Failed to check out');
            }

            // Clear the message after 3 seconds
            setTimeout(() => {
                setTimeOutMessage(null);
            }, 3000);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                // Handle 400 status code from the response
                setTimeOutMessage(error.response.data.message || 'You have not checked in for today');
            } else {
                // Handle other errors
                setTimeOutMessage('Failed to check out');
            }
        } finally {
            dispatch(setLoading(false));
        }
    };


    return (
        <section>
            <div className={styles.container}>

                <div className={styles["card"]}>
                    <div className={styles["wrapper"]}>
                        <h1>Log Attendance</h1>

                        <hr />
                        {timeInMessage && (
                            <p className={`${styles["message"]} ${styles.green}`}>{timeInMessage}</p>
                        )}
                        {timeOutMessage && (
                            <p className={`${styles["message"]} ${styles.red}`}>{timeOutMessage}</p>
                        )}
                        <div className={styles.info}>
                            <p>You can time in from 9:00 - 9:15</p>
                            <p>You can time out from 18:00 - 18:15</p>
                        </div>
                        <div className={styles["time-btn"]}>
                            <button onClick={handleTimeIn} className={styles["btn"]}>Time In</button>
                            <button onClick={handleTimeOut} className={styles["btn"]}>Time Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default Attendance;
