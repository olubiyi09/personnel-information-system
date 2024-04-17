import React, { useState } from 'react';
import styles from './AdminNavbar.module.css';

const AdminNavbar = ({ onItemClick }: any) => {
    const [activeItem, setActiveItem] = useState('home');

    const handleItemClick = (item: any) => {
        setActiveItem(item);
        onItemClick(item);
    };

    return (
        <section>
            <div className="mb-8">
                <nav className={styles.nav}>
                    <ul>
                        <li className={activeItem === 'home' ? styles.active : ''} onClick={() => handleItemClick('home')}>
                            Home
                        </li>
                        <li className={activeItem === 'users' ? styles.active : ''} onClick={() => handleItemClick('users')}>
                            Users
                        </li>
                        {/* <li className={activeItem === 'approvedEmployees' ? styles.active : ''} onClick={() => handleItemClick('approvedEmployees')}>
                            Approved-Employees
                        </li>
                        <li className={activeItem === 'unapprovedUsers' ? styles.active : ''} onClick={() => handleItemClick('unapprovedUsers')}>
                            Unapproved-Users
                        </li> */}
                        <li className={activeItem === 'attendance' ? styles.active : ''} onClick={() => handleItemClick('attendance')}>
                            Attendance
                        </li>
                        <li className={activeItem === 'leave' ? styles.active : ''} onClick={() => handleItemClick('leave')}>
                            Leave
                        </li>
                        <li className={activeItem === 'tasks' ? styles.active : ''} onClick={() => handleItemClick('tasks')}>
                            Tasks
                        </li>
                        <li className={activeItem === 'updates' ? styles.active : ''} onClick={() => handleItemClick('updates')}>
                            updates
                        </li>
                    </ul>
                </nav>
            </div>
        </section>
    );
};

export default AdminNavbar;
