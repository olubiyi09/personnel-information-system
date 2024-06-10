import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "./PostUpdates.module.css";
import { useDispatch } from 'react-redux';
import { setLoading } from '@/redux/loaderSlide';
import { toast } from 'sonner';

const PostUpdates = ({ allUsers }) => {
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPostId, setCurrentPostId] = useState(null);
    const [allPosts, setAllPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: '', content: '' });
    const dispatch = useDispatch();

    // Function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPost((prevPost) => ({
            ...prevPost,
            [name]: value,
        }));
    };

    const getAllPost = async () => {
        try {
            dispatch(setLoading(true));
            const response = await axios.get("/api/updates");
            setAllPosts(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            // toast.error("something went wrong")
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        getAllPost();
    }, []);

    // Function to handle submission of new post or edit post
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(setLoading(true));
            let response;
            if (isEditing) {
                response = await axios.put("/api/updates", { postId: currentPostId, ...newPost });
            } else {
                response = await axios.post("/api/updates", newPost);
            }

            if (!response.data.success) {
                throw new Error(isEditing ? "Failed to update post" : "Failed to save post");
            }

            if (isEditing) {
                setAllPosts(allPosts.map(post => post._id === currentPostId ? response.data.updatedPost : post));
                toast.success("Post updated successfully");
            } else {
                setAllPosts([...allPosts, response.data.newPost]);
                toast.success("Post saved successfully");
            }

            setNewPost({ title: '', content: '' });
            setShowModal(false);
            setIsEditing(false);
            setCurrentPostId(null);
        } catch (error) {
            console.error(isEditing ? 'Error updating post:' : 'Error saving post:', error.message);
            // Handle error as needed
        } finally {
            dispatch(setLoading(false));
        }
    };

    // Function to delete a post
    const handleDelete = async (postId) => {
        try {
            dispatch(setLoading(true));
            const response = await axios.delete("/api/updates", { data: { postId } });

            if (!response.data.success) {
                throw new Error("Failed to delete post");
            }

            // Update the state to remove the deleted post
            setAllPosts(allPosts.filter(post => post._id !== postId));
            toast.success("Post deleted successfully");
        } catch (error) {
            console.error('Error deleting post:', error.message);
            toast.error("Failed to delete post");
        } finally {
            dispatch(setLoading(false));
        }
    };

    // Function to edit a post
    const handleEdit = (post) => {
        setIsEditing(true);
        setCurrentPostId(post._id);
        setNewPost({ title: post.title, content: post.content });
        setShowModal(true);
    };

    // Function to convert date string to normal date format
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
        return formattedDate;
    };

    return (
        <div className={styles.postUpdates}>
            <div className={styles.header}>
                <h1>Post Updates</h1>
                <button onClick={() => setShowModal(true)}>Add New Post</button>
            </div>

            {/* Modal for adding new post or editing a post */}
            {showModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <span className={styles.close} onClick={() => { setShowModal(false); setIsEditing(false); setCurrentPostId(null); }}>
                            &times;
                        </span>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <label>Title:</label>
                            <input
                                type="text"
                                name="title"
                                value={newPost.title}
                                onChange={handleInputChange}
                                required
                            />
                            <label>Content:</label>
                            <textarea
                                name="content"
                                value={newPost.content}
                                onChange={handleInputChange}
                                required
                            />
                            <button type="submit">{isEditing ? "Update Post" : "Save Post"}</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Table of previous posts */}
            <table className={styles.postTable}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {allPosts.slice().reverse().map((post, index) => (
                        <tr key={index}>
                            <td>{post.title}</td>
                            <td>{post.content}</td>
                            <td>{formatDate(post.date)}</td>
                            <td>
                                <button onClick={() => handleEdit(post)}>Edit</button>
                                <button onClick={() => handleDelete(post._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PostUpdates;
