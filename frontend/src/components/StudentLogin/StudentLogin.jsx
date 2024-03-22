import React from 'react'
import styles from './StudentLogin.module.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const StudentLogin = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  axios.defaults.withCredentials = true
  const handleSubmit = async (event) => {
    try {
      event.preventDefault()
      const result = await axios.post('/api/studentlogin', values)
      navigate('/student_details/'+result.data.id)
    } catch (err) {
      setError('Wrong email or password')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  return (
    <div className={styles.outercontainer}>
      <div className={styles.container}>
        <img src='/background.jpeg' />
        <form className={styles.loginform} onSubmit={handleSubmit}>
          <div className={styles.error_message}>
            {error && error}
          </div>
          <h2>STUDENT LOGIN</h2>
          <div className={styles.input_fields}>
            <div className={styles.input_field}>
              <input className={styles.input_box} type='email' name='email' autoComplete='off' placeholder='Email' onChange={(e) => setValues({ ...values, email : e.target.value })} />
            </div>
            <div className={styles.input_field}>
              <input className={styles.input_box}type='password' name='password' autoComplete='off' placeholder='Password' onChange={(e) => setValues({ ...values, password : e.target.value })} />
            </div>
            <button className={styles.btn}>LOGIN</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default StudentLogin