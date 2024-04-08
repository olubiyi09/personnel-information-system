"use client"
import React from 'react';
import styles from "./MainSection.module.css";

const MainSection = ({ content }: any) => {
    return <div className={styles.mainContent}>{content}</div>;
};

export default MainSection;
