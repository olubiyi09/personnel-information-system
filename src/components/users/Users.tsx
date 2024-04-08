import React, { useState } from 'react';
import styles from './Users.module.css';

const Users = ({ allUsers }: any) => {
    const [defaultRole, setDefaultRole] = useState(allUsers && allUsers.length > 0 ? allUsers[0].role : '');

    const getRowClassName = (index: any) => {
        return index % 2 !== 0 ? styles.evenRow : '';
    };

    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDefaultRole(event.target.value);
    };

    return (
        <div className={styles.usersTable}>
            <h2>All Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fullname</th>
                        <th>Role</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {allUsers && allUsers.map((user: any, index: any) => (
                        <tr key={user._id} className={getRowClassName(index)}>
                            <td>{user._id.slice(0, 6).toUpperCase()}</td>
                            <td>{user.fullname.slice(0, 1).toUpperCase() + user.fullname.slice(1)}</td>
                            <td className={styles.select}>
                                <select
                                    value={defaultRole}
                                    onChange={handleRoleChange}
                                >
                                    {['Unapproved', 'Supervisor', 'Approved', 'Admin'].map((role, index) => (
                                        <option key={index} value={role}>{role}</option>
                                    ))}
                                </select>
                            </td>
                            <td>{user.email}</td>
                            <td className={styles.btn}>
                                <button>View Info</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
