import React from 'react'
import Sidebar from '../ui/sidebar'
import Navbar from '../ui/navbar'
import styles from "../ui/dashboard.module.css"

const Layout = ({children}) => {
  return (
    <div className={styles.container}>
        <div className={styles.sidebarContainer} >
            <Sidebar/>
        </div>
        <div className={styles.navbarContainer} >
            <Navbar/>
            {children}
        </div>
    </div>
  )
}

export default Layout