import React, { useState } from 'react';
import styles from "./Attendance.module.css";

const Attendance = () => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        const value = event.target.value;
        // Regular expression to allow only numbers
        if (/^[0-9]*$/.test(value) || value === '') {
            setInputValue(value);
        }
    };

    const handleTimeIn = () => {
        // Handle Time In functionality
        console.log('Time In clicked');
    };

    const handleTimeOut = () => {
        // Handle Time Out functionality
        console.log('Time Out clicked');
    };

    return (
        <section>
            <div className={styles.container}>

                <div className={styles["card"]}>
                    <div className={styles["wrapper"]}>
                        <h1>Log Attendance</h1>
                        <p className={`${styles["message"]} ${styles.green}`}>You have successfully added your Time In Record today</p>
                        <label htmlFor="staffCode" className={styles["label"]}>Enter Your Employee Code:</label>
                        <input
                            type="text"
                            placeholder='xxxxxx'
                            value={inputValue}
                            onChange={handleInputChange}
                            className={styles["input"]}
                        />
                        <div className={styles["time-btn"]}>
                            <button onClick={handleTimeIn} className={styles["btn"]}>Time In</button>
                            <button onClick={handleTimeOut} className={styles["btn"]}>Time Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Attendance;
