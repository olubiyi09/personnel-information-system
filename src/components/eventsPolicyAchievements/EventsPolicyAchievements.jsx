import React from 'react';
import styles from './EventsPolicyAchievements.module.css';

const EventsPolicyAchievements = () => {
    // Dummy data for demonstration
    const items = [
        {
            id: 1,
            title: "Company Picnic",
            date: "April 15, 2024",
            description: "Join us for a fun-filled day at the annual company picnic!",
        },
        {
            id: 2,
            title: "New Remote Work Policy",
            date: "March 28, 2024",
            description: "We have updated our remote work policy. Please review the changes.",
        },
        {
            id: 3,
            title: "Employee of the Month",
            date: "March 15, 2024",
            description: "Congratulations to John Smith for being the Employee of the Month!",
        },
    ];

    return (
        <div className={styles.container}>
            <h2>Updates</h2>
            <ul className={styles.list}>
                {items.map((item) => (
                    <li key={item.id} className={styles.item}>
                        <div className={styles.itemHeader}>
                            <h3 className={styles.title}>{item.title}</h3>
                            <span className={styles.date}>{item.date}</span>
                        </div>
                        <p className={styles.description}>{item.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventsPolicyAchievements;
