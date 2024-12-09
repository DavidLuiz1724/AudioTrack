import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Layout = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) navigate("/signin");
  }, [])
  return (
    <div className='layout'>
        <Sidebar />
        <div className='content'>
          <Navbar />
          <Outlet />
        </div>
    </div>
  )
}

export default Layout