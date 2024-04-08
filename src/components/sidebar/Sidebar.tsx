"use client"
import React from 'react';
import styles from "./Sidebar.module.css";
import { AiOutlineLogout } from "react-icons/ai";

const Sidebar = ({ menuItems, onItemClick, onLogout }: any) => {
    const [selectedItem, setSelectedItem] = React.useState(menuItems[0]);

    const handleClick = (item: any) => {
        setSelectedItem(item);
        onItemClick(item);
    };

    const handleLogout = () => {
        onLogout();
    };

    return (
        <section>
            <div>
                <div className={styles.logo}>PI System</div>
                <hr style={{ borderColor: "#f5f4a7" }} />
                <div className={styles["sidebar-items"]}>
                    {menuItems.map((item: any) => (
                        <div
                            key={item.id}
                            className={`flex items-center ${styles["sidebar-item"]} ${item === selectedItem ? styles.active : ''
                                }`}
                            onClick={() => handleClick(item)}
                        >
                            <span className="mr-2">{item.icon}</span> {item.title}
                        </div>
                    ))}
                </div>
            </div>
            <div className={`${styles["logout"]}`}>
                <div
                    className={`flex items-center ${styles["sidebar-item"]}`}
                    onClick={handleLogout}
                >
                    <span className="mr-2"><AiOutlineLogout size={20} /></span> Logout
                </div>
            </div>
        </section>
    );
};

export default Sidebar;
