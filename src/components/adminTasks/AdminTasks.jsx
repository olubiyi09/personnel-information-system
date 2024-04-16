import React, { useState, useEffect } from "react";
import styles from "./AdminTasks.module.css"
import Modal from "../modal/Modal";
import { IoMdAdd } from "react-icons/io";
import { setLoading } from "@/redux/loaderSlide";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";

const AdminTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isAddTaskFormOpen, setAddTaskFormOpen] = useState(false);
    const [allUsers, setAllUsers] = useState(null);
    const [allTasks, setAllTasks] = useState(null);
    const [allUsersFullName, setAllUsersFullName] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        assignedTo: "",
    });
    const currentUser = useSelector((state) => state.users.currentUser);
    const dispatch = useDispatch();


    const getAllUser = async () => {
        try {
            dispatch(setLoading(true));
            const response = await axios.get("/api/users/getallusers");
            setAllUsers(response.data.data);
            const users = response.data.data;
            const fullNames = users.map((user) => user.fullname);
            setAllUsersFullName([...fullNames]);
        } catch (error) {
            toast.error("something went wrong");
        } finally {
            dispatch(setLoading(false));
        }
    };

    const getTasks = async () => {
        try {
            dispatch(setLoading(true));
            const response = await axios.get("/api/tasks");
            setAllTasks(response.data.tasks)
            // console.log(response.data.tasks);
        } catch (error) {
            // toast.error("No task found");
            console.log("No task found");
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        getAllUser();
    }, []);

    useEffect(() => {

        getTasks()
    }, []);


    const handleStatusChange = async (taskId, newStatus) => {
        try {
            dispatch(setLoading(true));
            const response = await axios.put(`/api/tasks`, {
                taskId: taskId,
                status: newStatus,
            });
            const updatedTask = response.data.task;
            const updatedTasks = tasks.map((task) =>
                task._id === updatedTask._id ? updatedTask : task
            );
            setTasks(updatedTasks);
            toast.success("Task status updated successfully!");
            getTasks()
        } catch (error) {
            toast.error("Failed to update task status");
        } finally {
            dispatch(setLoading(false));
        }
    };
    const handleDescriptionClick = (task) => {
        setSelectedTask(task);
    };

    const handleCloseModal = () => {
        setSelectedTask(null);
    };

    const handleAddTaskClick = () => {
        setAddTaskFormOpen(true);
    };

    const saveTask = async () => {
        try {
            dispatch(setLoading(true));

            const response = await axios.post("/api/tasks", {
                title: formData.title,
                description: formData.description,
                assignedTo: formData.assignedTo,
                userID: currentUser._id,
            });

            const newTask = response.data;
            setTasks(prevTasks => [...prevTasks, newTask]);
            toast.success("Task saved successfully!");
            getTasks();
        } catch (error) {
            toast.error("Failed to save task");
            console.log(error.response.data);
        } finally {
            dispatch(setLoading(false));
            setFormData({
                title: "",
                description: "",
                assignedTo: "",
            });
            setAddTaskFormOpen(false);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        saveTask();
    };

    const closeForm = () => {
        setAddTaskFormOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className={styles["tasks-wrapper"]}>
            <div className={styles["task-header"]}>
                <h1>Tasks</h1>
                <button className="flex items-center" onClick={handleAddTaskClick}>
                    Assign Task <span className={styles.icon}><IoMdAdd size={18} /></span>
                </button>
            </div>
            <table className={styles["task-table"]}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Assigned To</th>
                    </tr>
                </thead>
                <tbody>
                    {allTasks && allTasks.map((task, index) => (
                        <tr key={task._id}>
                            <td>{index + 1}</td>
                            <td>{task.title}</td>
                            <td>
                                <div
                                    className={styles["truncate"]}
                                    onClick={() => handleDescriptionClick(task)}
                                >
                                    {task.description.length > 50
                                        ? `${task.description.slice(0, 50)}...`
                                        : task.description}
                                </div>
                            </td>
                            <td>
                                <select
                                    value={task.status}
                                    onChange={(e) =>
                                        handleStatusChange(task._id, e.target.value)
                                    }
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="InProgress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </td>
                            <td>{task.assignedTo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal
                isOpen={selectedTask !== null}
                onClose={handleCloseModal}
                title={selectedTask?.title}
                description={selectedTask?.description}
            />
            {isAddTaskFormOpen && (
                <div className={styles.modalOverlay} onClick={closeForm}>
                    <div
                        className={styles.modal}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={styles.modalContent}>
                            <h2>Task Form</h2>
                            <form onSubmit={handleSubmit} className={styles.form}>
                                <label htmlFor="title">Title:</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />

                                <label htmlFor="description">Description:</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    required
                                ></textarea>

                                <label htmlFor="assignedTo">Assign to:</label>
                                <select
                                    id="assignedTo"
                                    name="assignedTo"
                                    value={formData.assignedTo}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>
                                        Select Name
                                    </option>
                                    {allUsersFullName.map((name) => (
                                        <option key={name} value={name}>
                                            {name}
                                        </option>
                                    ))}
                                </select>

                                <div className={styles.buttonContainer}>
                                    <button type="submit" className={styles.submitButton}>
                                        Submit
                                    </button>
                                    <button
                                        type="button"
                                        className={styles.cancelButton}
                                        onClick={closeForm}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminTasks