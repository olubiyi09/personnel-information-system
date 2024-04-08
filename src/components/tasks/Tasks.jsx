import { useState, useEffect } from 'react';
import styles from "./Tasks.module.css"
import Modal from "../modal/Modal"
import { IoMdAdd } from "react-icons/io";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);


  // Dummy tasks for testing
  const dummyTasks = [
    {
      _id: '1',
      title: 'Complete Project Proposal',
      description: 'Write and finalize the project proposal for client review.',
      status: 'Pending',
      assignedTo: 'John Doe',
    },
    {
      _id: '2',
      title: 'Design Wireframes',
      description: 'Create wireframe designs for the homepage and product page.',
      status: 'In Progress',
      assignedTo: 'Jane Smith',
    },
    {
      _id: '3',
      title: 'Develop Landing Page',
      description: 'Code the landing page with HTML, CSS, and JavaScript.',
      status: 'Completed',
      assignedTo: 'Alex Johnson',
    },
    {
      _id: '4',
      title: 'Test Website Performance',
      description: 'Run performance tests and optimize website loading speed.',
      status: 'Pending',
      assignedTo: 'Emily Brown',
    },
  ];

  useEffect(() => {
    // Fetch tasks from API
    // For now, just use dummy tasks
    setTasks(dummyTasks);
  }, []);

  const handleStatusChange = (taskId, newStatus) => {
    // Update the status of the task locally
    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);

    // Here you would typically send a request to update the status in the database
    // For now, we'll just log the changes
    console.log(`Task ID ${taskId} status changed to ${newStatus}`);
  };

  const handleDescriptionClick = (task) => {
    setSelectedTask(task);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  return (
    <div className={styles["tasks-wrapper"]}>
      <div className={styles["task-header"]}>
        <h1>Tasks</h1>
        <button className="flex items-center">Assign Task <span className={styles.icon}><IoMdAdd size={18} /></span></button>
      </div>
      <table className={styles['task-table']}>
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
          {tasks.map((task, index) => (
            <tr key={task._id}>
              <td>{index + 1}</td>
              <td>{task.title}</td>
              <td>
                <div
                  className={styles['truncate']}
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
                  <option value="In Progress">In Progress</option>
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
    </div>
  );
};

export default Tasks;