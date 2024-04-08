import React, { useEffect, useState } from 'react';
import styles from "./Admin.module.css";
import AdminNavbar from '../adminNavbar/AdminNavbar';
import AdminHome from '../adminHome/AdminHome';
import Users from '../users/Users';
import AdminAttendance from "../adminAttendance/AdminAttendance"
import AdminLeave from "../adminLeave/AdminLeave"
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setLoading } from '@/redux/loaderSlide';
import { toast } from 'sonner';


const Admin = () => {
    const [activeItem, setActiveItem] = useState('home');
    const [allUsers, setAllUsers] = useState(null)
    const { loading } = useSelector((state) => state.loaders)
    const dispatch = useDispatch()

    const handleItemClick = (itemName) => {
        setActiveItem(itemName);
    };

    let content;
    switch (activeItem) {
        case 'home':
            content = <AdminHome allUsers={allUsers} />;
            break;
        case 'users':
            content = <Users allUsers={allUsers} />;
            break;
        case 'attendance':
            content = <AdminAttendance allUsers={allUsers} />;
            break;
        case 'leave':
            content = <AdminLeave allUsers={allUsers} />;
            break;
        default:
            content = <AdminHome />;
    }


    const getAllUser = async () => {
        try {
            dispatch(setLoading(true))
            const response = await axios.get("/api/users/getallusers");
            console.log(response.data.data);
            setAllUsers(response.data.data)

        } catch (error) {
            toast.error("something went wrong")
        } finally {
            dispatch(setLoading(false))
        }
    }

    useEffect(() => {
        getAllUser()
    }, [])

    return (
        <section>
            <AdminNavbar onItemClick={handleItemClick} />
            <div className={styles.wrapper}>
                {content}
            </div>
        </section>
    );
};

export default Admin;
