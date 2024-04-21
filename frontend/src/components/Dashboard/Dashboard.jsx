import React, { useState } from 'react'
import styles from './Dashboard.module.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { PiStudent } from 'react-icons/pi'
import { ImBooks } from 'react-icons/im'
import { FiLogOut } from 'react-icons/fi'
import axios from 'axios'

const Dashboard = () => {
  axios.defaults.withCredentials = true
  const [open, setOpen] = useState(false)

  const navigate = useNavigate()

  const handleLogout = () => {
    axios.get('/api/adminlogin/logout')
      .then(result => {
        navigate('/adminlogin')
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <div className={styles.container}>
        {/* <img src='/background1.jpeg' /> */}
        <div className={styles.sidebar}>
          <Link to='/dashboard'><h1 className={styles.institute_name}>Tutorific</h1></Link>
          <ul className={styles.items}>
            <li>
              <Link to='/dashboard'>
                <PiStudent />
                <span>Students</span>
              </Link>
            </li>
            <li>
              <Link to='/dashboard/courses'>
                <ImBooks />
                <span>Courses</span>
              </Link>
            </li>
            <li className={styles.logout} onClick={handleLogout}>
              <Link>
                <FiLogOut />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
          {/* <div className={styles.menuIcon}>
            <img src='menu.png' alt='' onClick={() => setOpen(true)} />
          </div>
          <div className={open ? styles.menuActive : styles.menu}>
            <ul>
              <div className={styles.homeAndIcon}>
                <li>
                  <Link to='/dashboard'>
                    <PiStudent />
                    <span>Students</span>
                  </Link>
                </li>
                <img src='close.png' alt='' onClick={() => setOpen(false)} />
              </div>
              <li>
                <Link to='/dashboard/courses'>
                  <ImBooks />
                  <span>Courses</span>
                </Link>
              </li>
              <li className={styles.logout} onClick={handleLogout}>
                <Link>
                  <FiLogOut />
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
          </div> */}
        </div>
        <div className={styles.main}>
          <div className={styles.header}>
            <div className={styles.menuIcon}>
              <img src='menu.png' alt='' onClick={() => setOpen(true)} />
            </div>
            <div>
              <ul className={open ? styles.menuActive : styles.menu}>
                <div className={styles.homeAndIcon}>
                  <li>
                    <Link to='/dashboard'>
                      <PiStudent />
                      <span>Students</span>
                    </Link>
                  </li>
                  <img src='close.png' alt='' onClick={() => setOpen(false)} />
                </div>
                <li>
                  <Link to='/dashboard/courses'>
                    <ImBooks />
                    <span>Courses</span>
                  </Link>
                </li>
                <li className={styles.logout} onClick={handleLogout}>
                  <Link>
                    <FiLogOut />
                    <span>Logout</span>
                  </Link>
                </li>
              </ul>
            </div>
            <h2>Student Management System</h2>
          </div>
          <hr />
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Dashboard