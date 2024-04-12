"use client"

import React, { useState } from 'react';
import styles from "./Profile.module.css";
import FullProfile from "../fullProfile/FullProfile"
import { useDispatch, useSelector } from 'react-redux';
import { CldUploadButton, CldImage } from 'next-cloudinary';
import axios from 'axios';
import { toast } from 'sonner';
import { setCurrentUser } from '@/redux/usersSlice';

const Profile = () => {
  const [uploadResult, setUploadResult] = useState(null);
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();

  const capitalizeFirstLetter = (string) => {
    return string
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleOnUpload = (result, widget) => {
    setUploadResult(result.info);
    // console.log(result.info.url)
    widget.close();
  };

  const handleSave = async () => {
    if (uploadResult && uploadResult.url) {
      try {
        const response = await axios.put('/api/users/changeprofileimage', {
          userId: currentUser._id,
          newImageUrl: uploadResult.url,
        });

        // Update the currentUser in Redux store
        const updatedUser = { ...currentUser, profileimage: uploadResult.url };
        dispatch(setCurrentUser(updatedUser));

        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
        console.error(error);
      }
    }
  };

  return (
    <section className={styles.wrapper}>
      <h1>Profile</h1>
      <hr style={{ borderColor: "#114232" }} />
      <div className={styles.container}>
        <div className={styles["left-section"]}>
          <div className={styles.image}>
            <CldImage
              width="200"
              height="200"
              src={uploadResult ? uploadResult.url : currentUser?.profileimage}
              alt="profileImage"
            />
          </div>
          <div className={styles.btns}>
            <CldUploadButton
              uploadPreset="f1njlfjn"
              onUpload={handleOnUpload}
            />
            <button className="ml-2" onClick={handleSave}>
              Save
            </button>
          </div>
          <div className={styles.info}>
            <span>{capitalizeFirstLetter(currentUser.fullname)}</span>
            <span>{currentUser.position}</span>
            <span>{currentUser.email}</span>
            <span>{currentUser.phone}</span>
            <span>{currentUser.address}</span>
          </div>
        </div>
        <div className={styles["right-section"]}>
          <FullProfile />
        </div>
      </div>
    </section>
  );
};

export default Profile;




