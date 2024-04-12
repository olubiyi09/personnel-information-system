// import React, { useState, useEffect } from 'react';
// import styles from './FullProfile.module.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'sonner';
// import axios from 'axios';
// import { setCurrentUser } from '@/redux/usersSlice';
// import { setLoading } from '@/redux/loaderSlide';
// import { FaEdit } from "react-icons/fa";
// import { MdDeleteForever } from "react-icons/md";


// const FullProfile = () => {
//     const [selectedTab, setSelectedTab] = useState('tab1');
//     const [showEditModal, setShowEditModal] = useState(false);
//     const [showAddExperienceModal, setShowAddExperienceModal] = useState(false);
//     const [formData, setFormData] = useState({
//         phone: '',
//         address: '',
//         position: '',
//         dateofbirth: '',
//         gender: '',
//         maritalstatus: ''
//     });

//     const [newExperience, setNewExperience] = useState({
//         company: '',
//         position: '',
//         duration: ''
//     });

//     const currentUser = useSelector((state) => state.users.currentUser);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         if (currentUser) {
//             setFormData({
//                 phone: currentUser.phone || '',
//                 address: currentUser.address || '',
//                 position: currentUser.position || '',
//                 dateofbirth: currentUser.dateofbirth || '',
//                 gender: currentUser.gender || '',
//                 maritalstatus: currentUser.maritalstatus || ''
//             });
//         }
//     }, [currentUser]);

//     const handleTabChange = (tab) => {
//         setSelectedTab(tab);
//     };

//     const getRowClassName = (index) => {
//         return index % 2 !== 0 ? styles.evenRow : '';
//     };

//     const handleEditProfile = () => {
//         setShowEditModal(true);
//         if (currentUser) {
//             setFormData({
//                 phone: currentUser.phone || '',
//                 address: currentUser.address || '',
//                 position: currentUser.position || '',
//                 dateofbirth: currentUser.dateofbirth || '',
//                 gender: currentUser.gender || '',
//                 maritalstatus: currentUser.maritalstatus || ''
//             });
//         }
//     };

//     const handleCloseModal = () => {
//         setShowEditModal(false);
//         setShowAddExperienceModal(false);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!formData.phone || !formData.address || !formData.position || !formData.dateofbirth || !formData.gender || !formData.maritalstatus) {
//             toast.error('All fields are required');
//             return;
//         }

//         const currentDate = new Date();
//         const selectedDate = new Date(formData.dateofbirth);
//         if (selectedDate > currentDate) {
//             toast.error('Date of birth must not be after the present date');
//             return;
//         }

//         try {
//             dispatch(setLoading(true));
//             const response = await axios.put('/api/users/editprofile', {
//                 userId: currentUser._id,
//                 ...formData
//             });

//             const updatedUser = { ...currentUser, ...formData };
//             dispatch(setCurrentUser(updatedUser));

//             toast.success("Update successful")
//             console.log(response.data.message);
//             handleCloseModal();
//         } catch (error) {
//             console.error(error);
//         } finally {
//             dispatch(setLoading(false));
//         }
//     };

//     const handleChange = (e) => {
//         setFormData(prevState => ({
//             ...prevState,
//             [e.target.name]: e.target.value
//         }));
//     };

//     const handleAddExperience = () => {
//         setShowAddExperienceModal(true);
//     };

//     const handleAddExperienceSubmit = async (e) => {
//         e.preventDefault();
//         const { company, position, duration } = newExperience;
//         if (!company || !position || !duration) {
//             toast.error('All fields are required');
//             return;
//         }

//         try {
//             dispatch(setLoading(true));
//             const response = await axios.post('/api/users/experience', {
//                 userId: currentUser._id,
//                 company,
//                 position,
//                 duration,
//             });

//             const updatedUser = response.data.data;
//             console.log(updatedUser);
//             dispatch(setCurrentUser(updatedUser));

//             toast.success('Experience added successfully');
//             setNewExperience({
//                 company: '',
//                 position: '',
//                 duration: '',
//             });
//             handleCloseModal();
//         } catch (error) {
//             console.error(error);
//         } finally {
//             dispatch(setLoading(false));
//         }
//     };

//     const handleExperienceChange = (e) => {
//         setNewExperience(prevState => ({
//             ...prevState,
//             [e.target.name]: e.target.value
//         }));
//     };

//     return (
//         <div>
//             <div className={styles.nav}>
//                 <button
//                     className={selectedTab === 'tab1' ? styles.active : ''}
//                     onClick={() => handleTabChange('tab1')}
//                 >
//                     Personal
//                 </button>
//                 <button
//                     className={selectedTab === 'tab2' ? styles.active : ''}
//                     onClick={() => handleTabChange('tab2')}
//                 >
//                     Experience
//                 </button>
//             </div>

//             <hr />

//             <div className={styles.content}>
//                 {selectedTab === 'tab1' && (
//                     <div className={styles.tab1}>
//                         <p>Employee ID: <span>{currentUser?._id?.slice(0, 6).toUpperCase()}</span></p>
//                         <p>Full Name:  <span>{currentUser?.fullname}</span></p>
//                         <p>Email: <span>{currentUser?.email}</span></p>
//                         <p>Phone: <span>{formData.phone || ''}</span></p>
//                         <p>Address: <span>{formData.address || ''}</span></p>
//                         <p>Position: <span>{formData.position || ''}</span></p>
//                         <p>Date of Birth: <span>{formData.dateofbirth || ''}</span></p>
//                         <p>Gender: <span>{formData.gender || ''}</span></p>
//                         <p>Marital Status: <span>{formData.maritalstatus || ''}</span></p>
//                     </div>
//                 )}

//                 {selectedTab === 'tab2' && (
//                     <div className={styles.tableContainer}>
//                         <div className={styles["exp-btn"]}>
//                             <button onClick={handleAddExperience}>Add</button>
//                         </div>
//                         {currentUser?.experience?.length === 0 ? (
//                             <p>No experience added yet.</p>
//                         ) : (
//                             <table className={styles.workExperienceTable}>
//                                 <thead>
//                                     <tr>
//                                         <th>Company</th>
//                                         <th>Position</th>
//                                         <th>Duration</th>
//                                         <th>Actions</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {currentUser?.experience.map((experience, index) => (
//                                         <tr key={index} className={getRowClassName(index)}>
//                                             <td>{experience?.company}</td>
//                                             <td>{experience?.position}</td>
//                                             <td>{experience?.duration}</td>
//                                             <td >
//                                                 <div className={`${styles["icon-container"]}`}>
//                                                     <FaEdit size={20} color="green" className={styles.icon} />
//                                                     <MdDeleteForever size={25} color="red" className={styles.icon} />
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         )}
//                     </div>
//                 )}
//             </div>

//             <div className={styles["edit-btn"]}>
//                 <button onClick={handleEditProfile}>Edit Profile</button>
//             </div>

//             {showEditModal && (
//                 <div className={styles.modalOverlay} onClick={handleCloseModal}>
//                     <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
//                         <div className={styles.modalContent}>
//                             <h2>Edit Profile</h2>
//                             <form onSubmit={handleSubmit} className={styles.form}>
//                                 <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
//                                 <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
//                                 <input type="text" name="position" placeholder="Position" value={formData.position} onChange={handleChange} />
//                                 <input type="date" name="dateofbirth" placeholder="Date of Birth" value={formData.dateofbirth} onChange={handleChange} />
//                                 <select name="gender" value={formData.gender} onChange={handleChange}>
//                                     <option value="Male">Male</option>
//                                     <option value="Female">Female</option>
//                                 </select>
//                                 <select name="maritalstatus" value={formData.maritalstatus} onChange={handleChange}>
//                                     <option value="Single">Single</option>
//                                     <option value="Married">Married</option>
//                                     <option value="Divorced">Divorced</option>
//                                 </select>

//                                 <div className={styles.buttonContainer}>
//                                     <button type="submit" className={styles.submitButton}>Submit</button>
//                                     <button type="button" className={styles.cancelButton} onClick={handleCloseModal}>Cancel</button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {showAddExperienceModal && (
//                 <div className={styles.modalOverlay} onClick={handleCloseModal}>
//                     <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
//                         <div className={styles.modalContent}>
//                             <h2>Add Experience</h2>
//                             <form onSubmit={handleAddExperienceSubmit} className={styles.form}>
//                                 <input type="text" name="company" placeholder="Company" value={newExperience.company} onChange={handleExperienceChange} />
//                                 <input type="text" name="position" placeholder="Position" value={newExperience.position} onChange={handleExperienceChange} />
//                                 <input type="text" name="duration" placeholder="Duration format: May 2017 - Dec 2018" value={newExperience.duration} onChange={handleExperienceChange} />

//                                 <div className={styles.buttonContainer}>
//                                     <button type="submit" className={styles.submitButton}>Add Experience</button>
//                                     <button type="button" className={styles.cancelButton} onClick={handleCloseModal}>Cancel</button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default FullProfile;



// import React, { useState, useEffect } from 'react';
// import styles from './FullProfile.module.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'sonner';
// import axios from 'axios';
// import { setCurrentUser } from '@/redux/usersSlice';
// import { setLoading } from '@/redux/loaderSlide';
// import { FaEdit } from "react-icons/fa";
// import { MdDeleteForever } from "react-icons/md";

// const FullProfile = () => {
//     const [selectedTab, setSelectedTab] = useState('tab1');
//     const [showEditModal, setShowEditModal] = useState(false);
//     const [showAddExperienceModal, setShowAddExperienceModal] = useState(false);
//     const [formData, setFormData] = useState({
//         phone: '',
//         address: '',
//         position: '',
//         dateofbirth: '',
//         gender: '',
//         maritalstatus: ''
//     });

//     const [editExperience, setEditExperience] = useState(null); // Track the experience being edited
//     const [editCompany, setEditCompany] = useState('');
//     const [editPosition, setEditPosition] = useState('');
//     const [editDuration, setEditDuration] = useState('');

//     const currentUser = useSelector((state) => state.users.currentUser);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         if (currentUser) {
//             setFormData({
//                 phone: currentUser.phone || '',
//                 address: currentUser.address || '',
//                 position: currentUser.position || '',
//                 dateofbirth: currentUser.dateofbirth || '',
//                 gender: currentUser.gender || '',
//                 maritalstatus: currentUser.maritalstatus || ''
//             });
//         }
//     }, [currentUser]);

//     const handleTabChange = (tab) => {
//         setSelectedTab(tab);
//     };

//     const getRowClassName = (index) => {
//         return index % 2 !== 0 ? styles.evenRow : '';
//     };

//     const handleEditProfile = () => {
//         setShowEditModal(true);
//     };

//     const handleCloseModal = () => {
//         setShowEditModal(false);
//         setShowAddExperienceModal(false);
//         setEditExperience(null);
//         setEditCompany('');
//         setEditPosition('');
//         setEditDuration('');
//     };

//     const handleEditExperience = (experience) => {
//         setEditExperience(experience);
//         setEditCompany(experience.company);
//         setEditPosition(experience.position);
//         setEditDuration(experience.duration);
//         setShowAddExperienceModal(true);
//     };

//     const handleDeleteExperience = async (index) => {
//         const updatedExperience = [...currentUser.experience];
//         updatedExperience.splice(index, 1);

//         try {
//             dispatch(setLoading(true));
//             const response = await axios.put(`/api/users/experience`, {
//                 userId: currentUser._id,
//                 experience: updatedExperience
//             });

//             const updatedUser = { ...currentUser, experience: updatedExperience };
//             dispatch(setCurrentUser(updatedUser));

//             toast.success("Experience deleted successfully");
//         } catch (error) {
//             console.error(error);
//         } finally {
//             dispatch(setLoading(false));
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!editCompany || !editPosition || !editDuration) {
//             toast.error('All fields are required');
//             return;
//         }

//         const updatedExperiences = currentUser.experience.map((exp) => {
//             if (exp === editExperience) {
//                 return {
//                     ...exp,
//                     company: editCompany,
//                     position: editPosition,
//                     duration: editDuration,
//                 };
//             }
//             return exp;
//         });

//         try {
//             dispatch(setLoading(true));
//             const response = await axios.put(`/api/users/experience`, {
//                 userId: currentUser._id,
//                 experience: updatedExperiences
//             });
//             console.log(response.data.data);

//             const updatedUser = { ...currentUser, experience: updatedExperiences };
//             console.log(updatedUser);
//             dispatch(setCurrentUser(updatedUser));

//             toast.success("Experience updated successfully");
//             handleCloseModal();
//         } catch (error) {
//             console.error(error);
//         } finally {
//             dispatch(setLoading(false));
//         }
//     };


//     const handleAddExperienceSubmit = async (e) => {
//         e.preventDefault();
//         if (!formData.company || !formData.position || !formData.duration) {
//             toast.error('All fields are required');
//             return;
//         }

//         const newExperience = {
//             company: formData.company,
//             position: formData.position,
//             duration: formData.duration,
//         };

//         try {
//             dispatch(setLoading(true));
//             const response = await axios.post(`/api/users/experience`, {
//                 userId: currentUser._id,
//                 ...newExperience
//             });

//             const updatedUser = { ...currentUser, experience: response.data.data.experience };
//             dispatch(setCurrentUser(updatedUser));

//             toast.success("Experience added successfully");
//             handleCloseModal();
//         } catch (error) {
//             console.error(error);
//         } finally {
//             dispatch(setLoading(false));
//         }
//     };

//     const handleEditProfileSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             dispatch(setLoading(true));
//             const response = await axios.put(`/api/users/editprofile`, {
//                 userId: currentUser._id,
//                 phone: formData.phone,
//                 address: formData.address,
//                 position: formData.position,
//                 dateofbirth: formData.dateofbirth,
//                 gender: formData.gender,
//                 maritalstatus: formData.maritalstatus
//             });

//             const updatedUser = response.data.data;
//             console.log(updatedUser);
//             dispatch(setCurrentUser(updatedUser));

//             toast.success("Profile updated successfully");
//             setShowEditModal(false);
//         } catch (error) {
//             console.error(error);
//         } finally {
//             dispatch(setLoading(false));
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         switch (name) {
//             case "company":
//                 setEditCompany(value);
//                 break;
//             case "position":
//                 setEditPosition(value);
//                 break;
//             case "duration":
//                 setEditDuration(value);
//                 break;
//             default:
//                 break;
//         }
//     };

//     const handleFormChange = (e) => {
//         setFormData((prevFormData) => ({
//             ...prevFormData,
//             [e.target.name]: e.target.value,
//         }));
//     };

//     return (
//         <div className={styles["sec-wrapper"]}>
//             <div className={styles.nav}>
//                 <button
//                     className={selectedTab === 'tab1' ? styles.active : ''}
//                     onClick={() => handleTabChange('tab1')}
//                 >
//                     Personal
//                 </button>
//                 <button
//                     className={selectedTab === 'tab2' ? styles.active : ''}
//                     onClick={() => handleTabChange('tab2')}
//                 >
//                     Experience
//                 </button>
//             </div>

//             <hr />

//             <div className={styles.content}>
//                 {selectedTab === 'tab1' && (
//                     <div className={styles.tab1}>
//                         <p>Employee ID: <span>{currentUser?._id?.slice(0, 6).toUpperCase()}</span></p>
//                         <p>Full Name:  <span>{currentUser?.fullname}</span></p>
//                         <p>Email: <span>{currentUser?.email}</span></p>
//                         <p>Phone: <span>{formData.phone || ''}</span></p>
//                         <p>Address: <span>{formData.address || ''}</span></p>
//                         <p>Position: <span>{formData.position || ''}</span></p>
//                         <p>Date of Birth: <span>{formData.dateofbirth || ''}</span></p>
//                         <p>Gender: <span>{formData.gender || ''}</span></p>
//                         <p>Marital Status: <span>{formData.maritalstatus || ''}</span></p>
//                         <div className={styles["edit-btn"]}>
//                             <button onClick={handleEditProfile}>Edit Profile</button>
//                         </div>
//                     </div>
//                 )}

//                 {selectedTab === 'tab2' && (
//                     <div className={styles.tableContainer}>
//                         <div className={styles["exp-btn"]}>
//                             <button onClick={() => setShowAddExperienceModal(true)}>Add</button>
//                         </div>
//                         {currentUser?.experience?.length === 0 ? (
//                             <p>No experience added yet.</p>
//                         ) : (
//                             <table className={styles.workExperienceTable}>
//                                 <thead>
//                                     <tr>
//                                         <th>Company</th>
//                                         <th>Position</th>
//                                         <th>Duration</th>
//                                         <th>Actions</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {currentUser?.experience.map((experience, index) => (
//                                         <tr key={index} className={getRowClassName(index)}>
//                                             <td>{experience?.company}</td>
//                                             <td>{experience?.position}</td>
//                                             <td>{experience?.duration}</td>
//                                             <td>
//                                                 <div className={`${styles["icon-container"]}`}>
//                                                     <FaEdit
//                                                         size={20}
//                                                         color="green"
//                                                         className={styles.icon}
//                                                         onClick={() => handleEditExperience(experience)}
//                                                     />
//                                                     <MdDeleteForever
//                                                         size={25}
//                                                         color="red"
//                                                         className={styles.icon}
//                                                         onClick={() => handleDeleteExperience(index)}
//                                                     />
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         )}
//                     </div>
//                 )}
//             </div>

//             {showEditModal && (
//                 <div className={styles.modalOverlay} onClick={handleCloseModal}>
//                     <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
//                         <div className={styles.modalContent}>
//                             <h2>Edit Profile</h2>
//                             <form onSubmit={handleEditProfileSubmit} className={styles.form}>
//                                 <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleFormChange} />
//                                 <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleFormChange} />
//                                 <input type="text" name="position" placeholder="Position" value={formData.position} onChange={handleFormChange} />
//                                 <input type="date" name="dateofbirth" placeholder="Date of Birth" value={formData.dateofbirth} onChange={handleFormChange} />
//                                 <select name="gender" value={formData.gender} onChange={handleFormChange}>
//                                     <option value="Male">Male</option>
//                                     <option value="Female">Female</option>
//                                 </select>
//                                 <select name="maritalstatus" value={formData.maritalstatus} onChange={handleFormChange}>
//                                     <option value="Single">Single</option>
//                                     <option value="Married">Married</option>
//                                     <option value="Divorced">Divorced</option>
//                                 </select>

//                                 <div className={styles.buttonContainer}>
//                                     <button type="submit" className={styles.submitButton}>Submit</button>
//                                     <button type="button" className={styles.cancelButton} onClick={handleCloseModal}>Cancel</button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {showAddExperienceModal && (
//                 <div className={styles.modalOverlay} onClick={handleCloseModal}>
//                     <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
//                         <div className={styles.modalContent}>
//                             <h2>{editExperience ? 'Edit Experience' : 'Add Experience'}</h2>
//                             <form onSubmit={editExperience ? handleSubmit : handleAddExperienceSubmit} className={styles.form}>
//                                 <input
//                                     type="text"
//                                     name="company"
//                                     placeholder="Company"
//                                     value={editExperience ? editCompany : formData.company}
//                                     onChange={editExperience ? handleChange : handleFormChange}
//                                 />
//                                 <input
//                                     type="text"
//                                     name="position"
//                                     placeholder="Position"
//                                     value={editExperience ? editPosition : formData.position}
//                                     onChange={editExperience ? handleChange : handleFormChange}
//                                 />
//                                 <input
//                                     type="text"
//                                     name="duration"
//                                     placeholder="Duration format: May 2017 - Dec 2018"
//                                     value={editExperience ? editDuration : formData.duration}
//                                     onChange={editExperience ? handleChange : handleFormChange}
//                                 />

//                                 <div className={styles.buttonContainer}>
//                                     <button type="submit" className={styles.submitButton}>
//                                         {editExperience ? 'Save Changes' : 'Add Experience'}
//                                     </button>
//                                     <button type="button" className={styles.cancelButton} onClick={handleCloseModal}>Cancel</button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default FullProfile;



import React, { useState, useEffect } from 'react';
import styles from './FullProfile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { setCurrentUser } from '@/redux/usersSlice';
import { setLoading } from '@/redux/loaderSlide';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const FullProfile = () => {
    const [selectedTab, setSelectedTab] = useState('tab1');
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddExperienceModal, setShowAddExperienceModal] = useState(false);
    const [formData, setFormData] = useState({
        phone: '',
        address: '',
        position: '',
        dateofbirth: '',
        gender: '',
        maritalstatus: ''
    });

    const [editExperience, setEditExperience] = useState(null); // Track the experience being edited
    const [editCompany, setEditCompany] = useState('');
    const [editPosition, setEditPosition] = useState('');
    const [editDuration, setEditDuration] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const experiencesPerPage = 7;

    const currentUser = useSelector((state) => state.users.currentUser);
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentUser) {
            setFormData({
                phone: currentUser.phone || '',
                address: currentUser.address || '',
                position: currentUser.position || '',
                dateofbirth: currentUser.dateofbirth || '',
                gender: currentUser.gender || '',
                maritalstatus: currentUser.maritalstatus || ''
            });
        }
    }, [currentUser]);

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    const getRowClassName = (index) => {
        return index % 2 !== 0 ? styles.evenRow : '';
    };

    const handleEditProfile = () => {
        setShowEditModal(true);
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
        setShowAddExperienceModal(false);
        setEditExperience(null);
        setEditCompany('');
        setEditPosition('');
        setEditDuration('');
    };

    const handleEditExperience = (experience) => {
        setEditExperience(experience);
        setEditCompany(experience.company);
        setEditPosition(experience.position);
        setEditDuration(experience.duration);
        setShowAddExperienceModal(true);
    };

    const handleDeleteExperience = async (index) => {
        const updatedExperience = [...currentUser.experience];
        updatedExperience.splice(index, 1);

        try {
            dispatch(setLoading(true));
            const response = await axios.put(`/api/users/experience`, {
                userId: currentUser._id,
                experience: updatedExperience
            });

            const updatedUser = { ...currentUser, experience: updatedExperience };
            dispatch(setCurrentUser(updatedUser));

            toast.success("Experience deleted successfully");
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!editCompany || !editPosition || !editDuration) {
            toast.error('All fields are required');
            return;
        }

        const updatedExperiences = currentUser.experience.map((exp) => {
            if (exp === editExperience) {
                return {
                    ...exp,
                    company: editCompany,
                    position: editPosition,
                    duration: editDuration,
                };
            }
            return exp;
        });

        try {
            dispatch(setLoading(true));
            const response = await axios.put(`/api/users/experience`, {
                userId: currentUser._id,
                experience: updatedExperiences
            });

            const updatedUser = { ...currentUser, experience: updatedExperiences };
            dispatch(setCurrentUser(updatedUser));

            toast.success("Experience updated successfully");
            handleCloseModal();
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(setLoading(false));
        }
    };


    const handleAddExperienceSubmit = async (e) => {
        e.preventDefault();
        if (!formData.company || !formData.position || !formData.duration) {
            toast.error('All fields are required');
            return;
        }

        const newExperience = {
            company: formData.company,
            position: formData.position,
            duration: formData.duration,
        };

        try {
            dispatch(setLoading(true));
            const response = await axios.post(`/api/users/experience`, {
                userId: currentUser._id,
                ...newExperience
            });

            const updatedUser = { ...currentUser, experience: response.data.data.experience };
            dispatch(setCurrentUser(updatedUser));

            toast.success("Experience added successfully");
            handleCloseModal();
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleEditProfileSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const response = await axios.put(`/api/users/editprofile`, {
                userId: currentUser._id,
                phone: formData.phone,
                address: formData.address,
                position: formData.position,
                dateofbirth: formData.dateofbirth,
                gender: formData.gender,
                maritalstatus: formData.maritalstatus
            });

            const updatedUser = response.data.data;
            dispatch(setCurrentUser(updatedUser));

            toast.success("Profile updated successfully");
            setShowEditModal(false);
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case "company":
                setEditCompany(value);
                break;
            case "position":
                setEditPosition(value);
                break;
            case "duration":
                setEditDuration(value);
                break;
            default:
                break;
        }
    };

    const handleFormChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };

    // Pagination
    const indexOfLastExperience = currentPage * experiencesPerPage;
    const indexOfFirstExperience = indexOfLastExperience - experiencesPerPage;
    const currentExperiences = currentUser.experience.slice(indexOfFirstExperience, indexOfLastExperience);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className={styles["sec-wrapper"]}>
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
                        <p>Employee ID: <span>{currentUser?._id?.slice(0, 6).toUpperCase()}</span></p>
                        <p>Full Name:  <span>{currentUser?.fullname}</span></p>
                        <p>Email: <span>{currentUser?.email}</span></p>
                        <p>Phone: <span>{formData.phone || ''}</span></p>
                        <p>Address: <span>{formData.address || ''}</span></p>
                        <p>Position: <span>{formData.position || ''}</span></p>
                        <p>Date of Birth: <span>{formData.dateofbirth || ''}</span></p>
                        <p>Gender: <span>{formData.gender || ''}</span></p>
                        <p>Marital Status: <span>{formData.maritalstatus || ''}</span></p>
                        <div className={styles["edit-btn"]}>
                            <button onClick={handleEditProfile}>Edit Profile</button>
                        </div>
                    </div>
                )}

                {selectedTab === 'tab2' && (
                    <div className={styles.tableContainer}>
                        <div className={styles.footer}>
                            <div className={styles["exp-btn"]}>
                                <button onClick={() => setShowAddExperienceModal(true)}>Add</button>
                            </div>

                            <div className={styles.pagination}>
                                {currentUser.experience.length > experiencesPerPage && (
                                    <ul className={styles.paginationList}>
                                        {Array.from({ length: Math.ceil(currentUser.experience.length / experiencesPerPage) }, (_, i) => (
                                            <li key={i} className={currentPage === i + 1 ? styles.activePage : ''}>
                                                <button onClick={() => paginate(i + 1)}>{i + 1}</button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                        {currentExperiences.length === 0 ? (
                            <p>No experience added yet.</p>
                        ) : (
                            <>
                                <table className={styles.workExperienceTable}>
                                    <thead>
                                        <tr>
                                            <th>Company</th>
                                            <th>Position</th>
                                            <th>Duration</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentExperiences.map((experience, index) => (
                                            <tr key={index} className={getRowClassName(index)}>
                                                <td>{experience?.company}</td>
                                                <td>{experience?.position}</td>
                                                <td>{experience?.duration}</td>
                                                <td>
                                                    <div className={`${styles["icon-container"]}`}>
                                                        <FaEdit
                                                            size={20}
                                                            color="green"
                                                            className={styles.icon}
                                                            onClick={() => handleEditExperience(experience)}
                                                        />
                                                        <MdDeleteForever
                                                            size={25}
                                                            color="red"
                                                            className={styles.icon}
                                                            onClick={() => handleDeleteExperience(indexOfFirstExperience + index)}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </>
                        )}
                    </div>
                )}
            </div>

            {showEditModal && (
                <div className={styles.modalOverlay} onClick={handleCloseModal}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalContent}>
                            <h2>Edit Profile</h2>
                            <form onSubmit={handleEditProfileSubmit} className={styles.form}>
                                <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleFormChange} />
                                <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleFormChange} />
                                <input type="text" name="position" placeholder="Position" value={formData.position} onChange={handleFormChange} />
                                <input type="date" name="dateofbirth" placeholder="Date of Birth" value={formData.dateofbirth} onChange={handleFormChange} />
                                <select name="gender" value={formData.gender} onChange={handleFormChange}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                <select name="maritalstatus" value={formData.maritalstatus} onChange={handleFormChange}>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Divorced">Divorced</option>
                                </select>

                                <div className={styles.buttonContainer}>
                                    <button type="submit" className={styles.submitButton}>Submit</button>
                                    <button type="button" className={styles.cancelButton} onClick={handleCloseModal}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {showAddExperienceModal && (
                <div className={styles.modalOverlay} onClick={handleCloseModal}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalContent}>
                            <h2>{editExperience ? 'Edit Experience' : 'Add Experience'}</h2>
                            <form onSubmit={editExperience ? handleSubmit : handleAddExperienceSubmit} className={styles.form}>
                                <input
                                    type="text"
                                    name="company"
                                    placeholder="Company"
                                    value={editExperience ? editCompany : formData.company}
                                    onChange={editExperience ? handleChange : handleFormChange}
                                />
                                <input
                                    type="text"
                                    name="position"
                                    placeholder="Position"
                                    value={editExperience ? editPosition : formData.position}
                                    onChange={editExperience ? handleChange : handleFormChange}
                                />
                                <input
                                    type="text"
                                    name="duration"
                                    placeholder="Duration format: May 2017 - Dec 2018"
                                    value={editExperience ? editDuration : formData.duration}
                                    onChange={editExperience ? handleChange : handleFormChange}
                                />

                                <div className={styles.buttonContainer}>
                                    <button type="submit" className={styles.submitButton}>
                                        {editExperience ? 'Save Changes' : 'Add Experience'}
                                    </button>
                                    <button type="button" className={styles.cancelButton} onClick={handleCloseModal}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FullProfile;
