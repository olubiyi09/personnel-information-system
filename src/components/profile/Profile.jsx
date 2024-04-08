import React, { useState } from 'react';
import styles from "./Profile.module.css"
import FullProfile from "../fullProfile/FullProfile"

const Profile = () => {
  const [image, setImage] = useState('/mp.jpeg');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
      console.log(file);
    }
  };

  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <section className={styles.wrapper}>
      <h1>Profile</h1>

      <hr style={{ borderColor: "#114232" }} />
      <div className={styles.container}>
        <div className={styles["left-section"]}>
          <img src={image} alt="Profile" style={{ width: '200px', height: '200px', borderRadius: '50%' }} />
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
          <div className={styles.btns}>
            <button onClick={handleButtonClick}>Change</button>
            <button className="ml-2">Save</button>
          </div>

          <div className={styles.info}>
            <span>Okediya Oluwaseyi O</span>
            <span>Full Stack Developer</span>
            <span>olubiyi@example.com</span>
            <span>+1 234 567 8900</span>
            <span>Didube Tbilisi, Georgia</span>
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
