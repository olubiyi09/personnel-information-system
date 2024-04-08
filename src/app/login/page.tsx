"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from 'react-icons/ri';
import "@/app/style.css"
import axios from 'axios';
import Loader from '@/components/loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/loaderSlide';

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const { loading } = useSelector((state: any) => state.loaders)

    const { email, password } = formData;

    const router = useRouter();
    const dispatch = useDispatch()

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (email === "" || password === "") {
            toast.error("All fields are required");
            return;
        }

        if (password.length < 7) {
            toast.error("Password must be at least 7 characters long");
            return;
        }

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Invalid email format");
            return;
        }

        // Here you can proceed with your form submission
        // console.log("Form submitted:", formData);

        try {
            dispatch(setLoading(true))
            const response = await axios.post("/api/users/login", formData);
            toast.success(response.data.message)
            router.push("/")
            setFormData({
                email: '',
                password: '',
            });
        } catch (error: any) {
            toast.error(error.response.data.message || "Something went wrong")
        } finally {
            dispatch(setLoading(false))
        }
    };

    return (
        <>
            {loading && <Loader />}
            <div className="form">
                <div className='form-wrapper'>
                    <form onSubmit={handleSubmit}>
                        <h1>Login</h1>

                        <div className='input-wrapper'>
                            <input
                                type="email"
                                id='email'
                                name='email'
                                placeholder='Email'
                                value={email}
                                onChange={handleChange}
                            />
                            <MdOutlineEmail size={18} className="icon" />
                        </div>

                        <div className='input-wrapper'>
                            <input
                                type="password"
                                id='password'
                                name='password'
                                placeholder='Password'
                                value={password}
                                onChange={handleChange}
                            />
                            <RiLockPasswordLine size={18} className="icon" />
                        </div>

                        <button type="submit">Login</button>
                        <p className="p-2">Don't have an Account? <Link href="/register"><span className="link-span">Register</span></Link></p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
