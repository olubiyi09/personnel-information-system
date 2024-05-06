import React, { useEffect, useState } from 'react';
import styles from "./EventsPolicyAchievements.module.css"
import { useDispatch } from 'react-redux';
import { setLoading } from '@/redux/loaderSlide';
import axios from 'axios';

const EventsPolicyAchievements = () => {
    const [allItems, setAllItems] = useState()
    const dispatch = useDispatch();

    const getAllPost = async () => {
        try {
            dispatch(setLoading(true));
            const response = await axios.get("/api/updates");
            setAllItems(response.data.data);
            // console.log(response.data.data);
        } catch (error) {
            // toast.error("something went wrong")
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        getAllPost();
    }, []);

    const formatDateTime = (dateTimeString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        const formattedDateTime = new Date(dateTimeString).toLocaleString(undefined, options);
        return formattedDateTime;
    };

    return (
        <div className={styles.container}>
            <h2>Updates</h2>
            <ul className={styles.list}>
                {allItems && allItems.slice().reverse().slice(0, 4).map((item) => (
                    <li key={item._id} className={styles.item}>
                        <div className={styles.itemHeader}>
                            <h3 className={styles.title}>{item.title}</h3>
                            <span className={styles.date}>{formatDateTime(item.date)}</span>
                        </div>
                        <p className={styles.description}>{item.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventsPolicyAchievements;
