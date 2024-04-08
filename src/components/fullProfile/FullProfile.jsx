import React, { useState } from 'react';
import styles from './FullProfile.module.css';

const experiences = [
    {
        company: 'Company A',
        position: 'Software Engineer',
        duration: 'Jan 2019 - Dec 2021',
    },
    {
        company: 'Company B',
        position: 'Web Developer',
        duration: 'May 2017 - Dec 2018',
    },
];

const FullProfile = () => {
    const [selectedTab, setSelectedTab] = useState('tab1');

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    const getRowClassName = (index) => {
        return index % 2 !== 0 ? styles.evenRow : '';
    };

    return (
        <div>
            <div className={styles.nav}>
                <button
                    className={selectedTab === 'tab1' ? styles.active : ''}
                    onClick={() => handleTabChange('tab1')}
                >
                    Personal
                </button>
                <button
                    className={selectedTab === 'tab2' ? styles.active : ''}
                    onClick={() => handleTabChange('tab2')}
                >
                    Experience
                </button>
            </div>

            <hr />

            <div className={styles.content}>
                {selectedTab === 'tab1' && (
                    <div className={styles.tab1}>
                        <p>Employee ID: <span>123456</span></p>
                        <p>Full Name: <span>Okediya Oluwaseyi Olubiyi</span></p>
                        <p>Email: <span>olubiyi@example.com</span></p>
                        <p>Phone: <span>+1 234 567 8900</span></p>
                        <p>Address: <span>Didube Tbilisi, Georgia</span></p>
                        <p>Position: <span>Full Stack Developer</span></p>
                        <p>Date of Birth: <span>02-12-2024</span></p>
                        <p>Gender: <span>Male</span></p>
                        <p>Marital Status: <span>Single</span></p>
                    </div>
                )}
                {selectedTab === 'tab2' && (
                    <div className={styles.tableContainer}>
                        {/* <h2>Previous Work Experience</h2> */}
                        <table className={styles.workExperienceTable}>
                            <thead>
                                <tr>
                                    <th>Company</th>
                                    <th>Position</th>
                                    <th>Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {experiences.map((experience, index) => (
                                    <tr key={index} className={getRowClassName(index)}>
                                        <td>{experience.company}</td>
                                        <td>{experience.position}</td>
                                        <td>{experience.duration}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div className={styles["edit-btn"]}>
                <button>Edit Profile</button>
            </div>
        </div>
    );
};

export default FullProfile;
