import React, { useState, useEffect } from 'react';
import styles from "./AdminAttendance.module.css";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setLoading } from '@/redux/loaderSlide';

const AdminAttendance = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        fetchAttendanceData();
    }, []);

    const fetchAttendanceData = async () => {
        try {
            dispatch(setLoading(true));
            const response = await axios.get("/api/attendance");
            const { data } = response.data || {};

            if (Array.isArray(data)) {
                setAttendanceData(data);

                const currentDate = new Date().toISOString().split('T')[0];
                setSelectedDate(currentDate);

                // Filter data based on the current date
                const filtered = data.filter(item => {
                    const itemDate = new Date(item.createdAt).toISOString().split('T')[0];
                    return itemDate === currentDate;
                });

                // Reverse the array to show the latest attendance at the top
                setFilteredData(filtered.reverse());
            } else {
                console.error("Invalid attendance data received:", data);
            }
        } catch (error) {
            console.error("Failed to fetch attendance data:", error.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setSelectedDate(selectedDate);

        // Filter data based on selected date
        const filtered = attendanceData.filter(item => {
            const itemDate = new Date(item.createdAt).toISOString().split('T')[0];
            return itemDate === selectedDate;
        });

        // Reverse the array to show the latest attendance at the top
        setFilteredData(filtered.reverse());
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className={styles.adminAttendance}>
            <div className={styles.filters}>
                <label htmlFor="dateFilter">Filter by Date:</label>
                <input
                    type="date"
                    id="dateFilter"
                    value={selectedDate}
                    onChange={handleDateChange}
                />
            </div>
            <table className={styles.attendanceTable}>
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Date</th>
                        <th>Check-In Time</th>
                        <th>Check-Out Time</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map(item => (
                        <tr key={item._id}>
                            <td>{item.fullname}</td>
                            <td>{formatDate(item.createdAt)}</td>
                            <td>{item.checkIn}</td>
                            <td>{item.checkOut}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminAttendance;
