import React, { useEffect } from 'react'
import styles from './LoginAs.module.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const LoginAs = () => {
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('/api/verify')
      .then(result => {
        if (result.data.role === 'admin') {
          navigate('/dashboard')
        } else if (result.data.role === 'student') {
          navigate('/student_details/' + result.data.id)
        }
        else {
          navigate('/')
        }
      })
      .catch(err => console.log(err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    // <div className={styles.outercontainer}>
    <div className={styles.container}>
      <img src='/background.jpeg' />
      <div className={styles.title_btn}>
        <h2>LOGIN AS</h2>
        <div className={styles.btn_container}>
          <button onClick={() => navigate('/adminlogin')}>Admin</button>
          <button onClick={() => navigate('/studentlogin')}>Student</button>
        </div>
      </div>
    </div>
    // </div>
  )
}

export default LoginAs