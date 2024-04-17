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

    // Set default date to current date if not set
    useEffect(() => {
        if (!selectedDate) {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0
            const day = String(today.getDate()).padStart(2, '0');
            const currentDate = `${year}-${month}-${day}`;
            setSelectedDate(currentDate);
        }
    }, [selectedDate]);

    useEffect(() => {
        fetchAttendanceData();
    }, []);

    useEffect(() => {
        // Filter data based on selected date whenever selectedDate or attendanceData changes
        const filtered = attendanceData.filter(item => {
            const itemDate = new Date(item.date).toISOString().split('T')[0];
            // console.log(itemDate);
            return itemDate === selectedDate;
        });

        // Reverse the array to show the latest attendance at the top
        setFilteredData(filtered.reverse());
    }, [selectedDate, attendanceData]);

    const fetchAttendanceData = async () => {
        try {
            dispatch(setLoading(true));
            const response = await axios.get("/api/attendance");
            const { data } = response.data || {};

            if (Array.isArray(data)) {
                setAttendanceData(data);

                // No need to set selectedDate here anymore
                const filtered = data.filter(item => {
                    const itemDate = new Date(item.createdAt).toISOString().split('T')[0];
                    return itemDate === selectedDate;
                });
                console.log(filtered);

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
                {filteredData.length < 1 ? (
                    <p>No Attendance for this day yet</p>
                ) : (
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
                )}
            </table>
        </div>
    );
};

export default AdminAttendance;
