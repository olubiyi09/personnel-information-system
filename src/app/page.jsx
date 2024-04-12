"use client"
import React, { useState } from 'react';
import MainSection from "@/components/mainSection/MainSection";
import Sidebar from "@/components/sidebar/Sidebar";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { FaTasks } from "react-icons/fa";
import { FaRegCalendarCheck } from "react-icons/fa";
import { RiHotelFill } from "react-icons/ri";
import Dashboard from '@/components/dashboard/Dashboard';
import Profile from '@/components/profile/Profile';
import Tasks from '@/components/tasks/Tasks';
import Attendance from '@/components/attendance/Attendance';
import axios from 'axios';
import { toast } from 'sonner';
import Loader from '@/components/loader/Loader';
import { useRouter } from 'next/navigation';
import Admin from '@/components/admin/Admin';
import LeaveManagement from '@/components/leaveManagement/LeaveManagement';

const menuItems = [
  {
    id: 1,
    title: 'Dashboard',
    icon: <MdOutlineDashboardCustomize size={20} />,
    content: <Dashboard />,
  },
  {
    id: 2,
    title: 'Admin',
    icon: <RiAdminLine size={20} />,
    content: <Admin />,
  },
  {
    id: 3,
    title: 'Profile',
    icon: <CgProfile size={20} />,
    content: <Profile />,
  },
  {
    id: 4,
    title: 'Tasks',
    icon: <FaTasks size={20} />,
    content: <Tasks />,
  },
  {
    id: 5,
    title: 'Attendance',
    icon: <FaRegCalendarCheck size={20} />,
    content: <Attendance />,
  },
  {
    id: 6,
    title: 'Leave Management',
    icon: <RiHotelFill size={20} />,
    content: <LeaveManagement />,
  },
];




const Home = () => {
  const [selectedItem, setSelectedItem] = useState(menuItems[0]);

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();

  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleLogout = async () => {
    try {
      // dispatch(setLoading(true));
      setIsLoading(true)
      await axios.post("/api/users/logout");
      toast.success("Logged out successfully");
      window.location.reload();
      // dispatch(setCurrentUser(null));
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");

    } finally {
      // dispatch(setLoading(false));
      setIsLoading(false)
    }
  };


  return (
    <main>
      {isLoading && <Loader />}
      <div className="home-wrapper">
        <div className="sidebar">
          <Sidebar
            menuItems={menuItems}
            selectedItem={selectedItem}
            onItemClick={handleMenuItemClick}
            onLogout={handleLogout}
          />
        </div>
        <div className="main-section">
          <MainSection content={selectedItem.content} />
        </div>
      </div>
    </main>
  );
};

export default Home;
