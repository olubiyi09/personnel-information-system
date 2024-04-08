"use client"
import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'
import { usePathname } from 'next/navigation'
import axios from 'axios'
import { setCurrentUser } from '@/redux/usersSlice'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './loader/Loader'
import { setLoading } from '@/redux/loaderSlide'


const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const dispatch = useDispatch()
  const { loading } = useSelector((state: any) => state.loaders)
  const { currentUser } = useSelector((state: any) => state.users)


  const getCurrentUser = async () => {
    try {
      dispatch(setLoading(true))
      const response = await axios.get("/api/users/currentuser");
      dispatch(setCurrentUser(response.data.data))
    } catch (error: any) {
      // toast.error("something went wrong")
      dispatch(setCurrentUser(null))
    } finally {
      dispatch(setLoading(false))
    }
  }


  useEffect(() => {
    if (pathname !== "/login" && pathname !== "/register" && !currentUser) {
      getCurrentUser();
    }

  }, [pathname]);





  return (
    <html lang="en">
      <body>
        {loading && <Loader />}
        <Toaster richColors position="top-right" />
        {children}
      </body>
    </html>
  )
}

export default LayoutProvider
