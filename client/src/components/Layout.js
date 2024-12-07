import React from 'react'
import { Outlet } from 'react-router-dom'

import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Layout = () => {
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