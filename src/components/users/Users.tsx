// import React, { useState, useEffect } from 'react';
// import styles from './Users.module.css';
// import axios from 'axios';
// import { setLoading } from '@/redux/loaderSlide';
// import { useDispatch } from 'react-redux';
// import { toast } from 'sonner';

// const Users = ({ allUsers }: any) => {
//     // State to hold the roles for all users
//     const [userRoles, setUserRoles] = useState<any>({});

//     // Initialize user roles when component mounts
//     useEffect(() => {
//         const roles: any = {};
//         allUsers.forEach((user: any) => {
//             roles[user._id] = user.role;
//         });
//         setUserRoles(roles);
//     }, [allUsers]);
//     const dispatch = useDispatch()

//     const getRowClassName = (index: any) => {
//         return index % 2 !== 0 ? styles.evenRow : '';
//     };

//     const handleRoleChange = async (event: React.ChangeEvent<HTMLSelectElement>, userId: string) => {
//         const newRole = event.target.value;

//         try {
//             dispatch(setLoading(true))
//             const response = await axios.put('/api/users/updateRole', { userId, newRole });
//             console.log(response.data);

//             // Update the local state with the new role for the specific user
//             setUserRoles((prevRoles: any) => ({
//                 ...prevRoles,
//                 [userId]: newRole,
//             }));
//             toast.success(response.data.message)
//         } catch (error) {
//             console.error(error);
//         } finally {
//             dispatch(setLoading(false))
//         }
//     };

//     return (
//         <div className={styles.usersTable}>
//             <h2>All Users</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Fullname</th>
//                         <th>Role</th>
//                         <th>Email</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {allUsers && allUsers.map((user: any, index: any) => (
//                         <tr key={user._id} className={getRowClassName(index)}>
//                             <td>{user._id.slice(0, 6).toUpperCase()}</td>
//                             <td>{user.fullname.slice(0, 1).toUpperCase() + user.fullname.slice(1)}</td>
//                             <td className={styles.select}>
//                                 <select
//                                     value={userRoles[user._id]} // Use userRoles state for the specific user
//                                     onChange={(e) => handleRoleChange(e, user._id)}
//                                 >
//                                     {['Unapproved', 'Supervisor', 'Approved', 'Admin'].map((role, index) => (
//                                         <option key={index} value={role}>{role}</option>
//                                     ))}
//                                 </select>
//                             </td>
//                             <td>{user.email}</td>
//                             <td className={styles.btn}>
//                                 <button>View Info</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default Users;


// import React, { useState, useEffect } from 'react';
// import styles from './Users.module.css';
// import axios from 'axios';
// import { toast } from 'sonner';
// import { setLoading } from '@/redux/loaderSlide';
// import { useDispatch } from 'react-redux';

// const Users = ({ allUsers }: any) => {
//     // State to hold the roles for all users
//     const [userRoles, setUserRoles] = useState<any>({});
//     const dispatch = useDispatch();

//     // Fetch user roles from the backend when component mounts
//     useEffect(() => {
//         const fetchUserRoles = async () => {
//             try {
//                 dispatch(setLoading(true));
//                 const response = await axios.get('/api/users/updateRole');
//                 const roles: any = {};
//                 response.data.forEach((user: any) => {
//                     roles[user._id] = user.role;
//                 });
//                 setUserRoles(roles);
//                 localStorage.setItem('userRoles', JSON.stringify(roles)); // Save to local storage
//             } catch (error) {
//                 console.error(error);
//             } finally {
//                 dispatch(setLoading(false));
//             }
//         };

//         // Check local storage for cached roles
//         const cachedUserRoles = localStorage.getItem('userRoles');
//         if (cachedUserRoles) {
//             setUserRoles(JSON.parse(cachedUserRoles));
//         } else {
//             fetchUserRoles();
//         }
//     }, [dispatch]);

//     // Update userRoles state based on prop changes
//     useEffect(() => {
//         const roles: any = {};
//         allUsers.forEach((user: any) => {
//             roles[user._id] = user.role;
//         });
//         setUserRoles(roles);
//         localStorage.setItem('userRoles', JSON.stringify(roles)); // Update local storage on prop change
//     }, [allUsers]);

//     const getRowClassName = (index: any) => {
//         return index % 2 !== 0 ? styles.evenRow : '';
//     };

//     const handleRoleChange = async (event: React.ChangeEvent<HTMLSelectElement>, userId: string) => {
//         const newRole = event.target.value;

//         try {
//             dispatch(setLoading(true));
//             const response = await axios.put('/api/users/updateRole', { userId, newRole });
//             console.log(response.data);

//             // Update the local state with the new role for the specific user
//             setUserRoles((prevRoles: any) => ({
//                 ...prevRoles,
//                 [userId]: newRole,
//             }));
//             localStorage.setItem('userRoles', JSON.stringify(userRoles)); // Update local storage
//             toast.success(response.data.message);
//         } catch (error) {
//             console.error(error);
//         } finally {
//             dispatch(setLoading(false));
//         }
//     };

//     return (
//         <div className={styles.usersTable}>
//             <h2>All Users</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Fullname</th>
//                         <th>Role</th>
//                         <th>Email</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {allUsers && allUsers.map((user: any, index: any) => (
//                         <tr key={user._id} className={getRowClassName(index)}>
//                             <td>{user._id.slice(0, 6).toUpperCase()}</td>
//                             <td>{user.fullname.slice(0, 1).toUpperCase() + user.fullname.slice(1)}</td>
//                             <td className={styles.select}>
//                                 <select
//                                     value={userRoles[user._id] || ''} // Use userRoles state for the specific user
//                                     onChange={(e) => handleRoleChange(e, user._id)}
//                                 >
//                                     {['Unapproved', 'Supervisor', 'Approved', 'Admin'].map((role, index) => (
//                                         <option key={index} value={role}>{role}</option>
//                                     ))}
//                                 </select>
//                             </td>
//                             <td>{user.email}</td>
//                             <td className={styles.btn}>
//                                 <button>View Info</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default Users;



// import React, { useState, useEffect } from 'react';
// import styles from './Users.module.css';
// import axios from 'axios';
// import { toast } from 'sonner';
// import { setLoading } from '@/redux/loaderSlide';
// import { useDispatch } from 'react-redux';

// const Users = ({ allUsers }: any) => {
//     // State to hold the roles for all users
//     const [userRoles, setUserRoles] = useState<any>({});
//     const dispatch = useDispatch();

//     // Fetch user roles from the backend when component mounts
//     useEffect(() => {
//         const fetchUserRoles = async () => {
//             try {
//                 dispatch(setLoading(true));
//                 const response = await axios.get('/api/users/getUsersRoles');
//                 const roles: any = {};
//                 response.data.forEach((user: any) => {
//                     roles[user._id] = user.role;
//                 });
//                 setUserRoles(roles);
//                 localStorage.setItem('userRoles', JSON.stringify(roles)); // Save to local storage
//             } catch (error) {
//                 console.error(error);
//             } finally {
//                 dispatch(setLoading(false));
//             }
//         };

//         // Check local storage for cached roles
//         const cachedUserRoles = localStorage.getItem('userRoles');
//         if (cachedUserRoles) {
//             setUserRoles(JSON.parse(cachedUserRoles));
//         } else {
//             fetchUserRoles();
//         }
//     }, [dispatch]);

//     // Update userRoles state based on prop changes
//     useEffect(() => {
//         const roles: any = {};
//         allUsers.forEach((user: any) => {
//             roles[user._id] = user.role;
//         });
//         setUserRoles(roles);
//         localStorage.setItem('userRoles', JSON.stringify(roles)); // Update local storage on prop change
//     }, [allUsers]);

//     const getRowClassName = (index: any) => {
//         return index % 2 !== 0 ? styles.evenRow : '';
//     };

//     const handleRoleChange = async (event: React.ChangeEvent<HTMLSelectElement>, userId: string) => {
//         const newRole = event.target.value;

//         try {
//             dispatch(setLoading(true));
//             const response = await axios.put('/api/users/updateRole', { userId, newRole });
//             console.log(response.data);

//             // Fetch updated user roles from the new API endpoint
//             const updatedRolesResponse = await axios.get('/api/users/updateRole');
//             const updatedRoles: any = {};
//             updatedRolesResponse.data.forEach((user: any) => {
//                 updatedRoles[user._id] = user.role;
//             });
//             setUserRoles(updatedRoles);

//             toast.success(response.data.message);
//         } catch (error) {
//             console.error(error);
//         } finally {
//             dispatch(setLoading(false));
//         }
//     };

//     return (
//         <div className={styles.usersTable}>
//             <h2>All Users</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Fullname</th>
//                         <th>Role</th>
//                         <th>Email</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {allUsers && allUsers.map((user: any, index: any) => (
//                         <tr key={user._id} className={getRowClassName(index)}>
//                             <td>{user._id.slice(0, 6).toUpperCase()}</td>
//                             <td>{user.fullname.slice(0, 1).toUpperCase() + user.fullname.slice(1)}</td>
//                             <td className={styles.select}>
//                                 <select
//                                     value={userRoles[user._id] || ''} // Use userRoles state for the specific user
//                                     onChange={(e) => handleRoleChange(e, user._id)}
//                                 >
//                                     {['Unapproved', 'Supervisor', 'Approved', 'Admin'].map((role, index) => (
//                                         <option key={index} value={role}>{role}</option>
//                                     ))}
//                                 </select>
//                             </td>
//                             <td>{user.email}</td>
//                             <td className={styles.btn}>
//                                 <button>View Info</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default Users;




import React, { useState, useEffect } from 'react';
import styles from './Users.module.css';
import axios from 'axios';
import { toast } from 'sonner';
import { setLoading } from '@/redux/loaderSlide';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser, setUserRoles, updateUserRole } from '@/redux/usersSlice';

const Users = ({ allUsers }: any) => {
    const currentUser = useSelector((state: any) => state.users.currentUser);
    const userRoles = useSelector((state: any) => state.users.userRoles);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchUserRoles = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/users/updateRole');
                const roles: any = {};
                response.data.forEach((user: any) => {
                    roles[user._id] = user.role;
                });
                dispatch(setUserRoles(roles));
                // toast.success("User roles fetched successfully");
            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch user roles");
            } finally {
                setLoading(false);
            }
        };

        fetchUserRoles();
    }, [dispatch]);

    const getRowClassName = (index: any) => {
        return index % 2 !== 0 ? styles.evenRow : '';
    };

    const handleRoleChange = async (event: React.ChangeEvent<HTMLSelectElement>, userId: string) => {
        const newRole = event.target.value;

        try {
            setLoading(true);
            const response = await axios.put('/api/users/updateRole', { userId, newRole });
            console.log(response.data);

            // Update the user role in Redux state
            dispatch(updateUserRole({ userId, newRole }));
            toast.success(response.data.message);
        } catch (error) {
            console.error(error);
            toast.error("Failed to update user role");
        } finally {
            setLoading(false);
        }
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
                                    value={userRoles[user._id] || ''}
                                    onChange={(e) => handleRoleChange(e, user._id)}
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
