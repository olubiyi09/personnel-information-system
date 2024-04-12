// import React, { useState } from 'react';
// import styles from "./Attendance.module.css";

// const Attendance = () => {
//     const [inputValue, setInputValue] = useState('');

//     const handleInputChange = (event) => {
//         const value = event.target.value;
//         // Regular expression to allow only numbers
//         if (/^[0-9]*$/.test(value) || value === '') {
//             setInputValue(value);
//         }
//     };

//     const handleTimeIn = () => {
//         // Handle Time In functionality
//         console.log('Time In clicked');
//     };

//     const handleTimeOut = () => {
//         // Handle Time Out functionality
//         console.log('Time Out clicked');
//     };

//     return (
//         <section>
//             <div className={styles.container}>

//                 <div className={styles["card"]}>
//                     <div className={styles["wrapper"]}>
//                         <h1>Log Attendance</h1>
//                         <p className={`${styles["message"]} ${styles.green}`}>You have successfully added your Time In Record today</p>
//                         <label htmlFor="staffCode" className={styles["label"]}>Enter Your Employee Code:</label>
//                         <input
//                             type="text"
//                             placeholder='xxxxxx'
//                             value={inputValue}
//                             onChange={handleInputChange}
//                             className={styles["input"]}
//                         />
//                         <div className={styles["time-btn"]}>
//                             <button onClick={handleTimeIn} className={styles["btn"]}>Time In</button>
//                             <button onClick={handleTimeOut} className={styles["btn"]}>Time Out</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Attendance;


import React, { useState } from 'react';
import styles from "./Attendance.module.css";

const Attendance = () => {
    const [timeIn, setTimeIn] = useState(null);
    const [timeOut, setTimeOut] = useState(null);
    const [timeInMessage, setTimeInMessage] = useState(null);
    const [timeOutMessage, setTimeOutMessage] = useState(null);

    const handleTimeIn = () => {
        const currentTime = new Date().toLocaleTimeString();
        setTimeIn(currentTime);
        setTimeInMessage('You have successfully added your Time In Record today');

        // Clear the message after 3 seconds
        setTimeout(() => {
            setTimeInMessage(null);
        }, 3000);
    };

    const handleTimeOut = () => {
        const currentTime = new Date().toLocaleTimeString();
        setTimeOut(currentTime);
        setTimeOutMessage('You have successfully added your Time Out Record today');

        // Clear the message after 3 seconds
        setTimeout(() => {
            setTimeOutMessage(null);
        }, 3000);
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
