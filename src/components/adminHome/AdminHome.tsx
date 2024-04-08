import React from 'react';
import { FaUsersBetweenLines } from 'react-icons/fa6';
import { FaCheckDouble } from 'react-icons/fa6';
import { MdSupervisorAccount } from 'react-icons/md';
import { FaQuestion } from 'react-icons/fa6';
import styles from '../admin/Admin.module.css';
import BarChart from '../barChart/BarChart';
import Loader from '../loader/Loader';

const AdminHome = ({ allUsers }: any) => {
    const unapprovedUsersCount: number = allUsers ? allUsers.filter((user: { role: string }) => user.role === "unapproved").length : 0;
    const numberofUsers = allUsers?.length

    const chartData = [numberofUsers, 2, 1, unapprovedUsersCount];
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
                            Approved Employees <span className="flex items-center">250 <span className={`ml-1 ${styles.icon2}`}><FaCheckDouble size={19} /></span></span>
                        </div>
                        <div className={styles.card}>
                            Total Supervisor <span className="flex items-center">50 <span className={`ml-1 ${styles.icon3}`}><MdSupervisorAccount size={19} /></span></span>
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
