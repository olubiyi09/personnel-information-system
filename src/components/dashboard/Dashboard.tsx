"use client"
import React, { useState } from 'react';
import Calendar from '../calendar/Calendar';
// import EventsPolicyAchievements from "@/components/eventsPolicyAchievements/EventsPolicyAchievements"
import EventsPolicyAchievements from "../eventsPolicyAchievements/EventsPolicyAchievements"
import styles from "./Dashboard.module.css";
import Loader from '../loader/Loader';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { currentUser } = useSelector((state: any) => state.users);

    const capitalizeFullName = (fullname: any) => {
        if (!fullname) return '';

        let capitalized = fullname.charAt(0).toUpperCase() + fullname.slice(1);

        // Check if there is a space in the full name
        const firstSpaceIndex = capitalized.indexOf(' ');
        if (firstSpaceIndex !== -1) {
            // Cut off all characters after the first space
            capitalized = capitalized.substring(0, firstSpaceIndex);
        }

        return capitalized;
    };

    return (
        <section>
            {isLoading ? (
                <Loader />
            ) : (
                <div className={styles.wrapper}>
                    <h1>Welcome, {capitalizeFullName(currentUser?.fullname)}</h1>
                    <div className={styles.allContent}>
                        <EventsPolicyAchievements />
                        <Calendar year={2024} />
                    </div>
                </div>
            )}
        </section>
    );
};

export default Dashboard;
