import React, { useEffect, useState } from 'react'
import styles from './AddStudent.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const AddStudent = () => {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    password: '',
    course_id: '',
    marks: 0
  })
  const [courses, setCourses] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    axios.get('/api/adminlogin/courses')
      .then(result => {
        setCourses(result.data.Result)
      })
      .catch(err =>  console.log(err))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post('/api/adminlogin/add_student', student)
      .then(result => {
        navigate('/dashboard')
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <div className={styles.container}>
        <form className={styles.studentform} onSubmit={handleSubmit}>
          <h2>New Student</h2>
          <div className={styles.input_fields}>
            <div className={styles.input_field}>
              <label htmlFor='name' className={styles.label}>
								Name
              </label>
              <input className={styles.input_box} type='text' name='name' autoComplete='off' placeholder='Enter Name' onChange={(e) => setStudent({ ...student, name: e.target.value })} />
            </div>
            <div className={styles.input_field}>
              <label htmlFor='email' className={styles.label}>
								Email
              </label>
              <input className={styles.input_box} type='text' name='email' autoComplete='off' placeholder='Enter Email' onChange={(e) => setStudent({ ...student, email: e.target.value })} />
            </div>
            <div className={styles.input_field}>
              <label htmlFor='password' className={styles.label}>
								Password
              </label>
              <input className={styles.input_box} type='password' name='password' autoComplete='off' placeholder='Enter Password' onChange={(e) => setStudent({ ...student, password: e.target.value })} />
            </div>
            <div className={styles.input_field}>
              <label htmlFor='course' className={styles.label}>
								Course
              </label>
              <select name='course' onChange={(e) => setStudent({ ...student, course_id: e.target.value })}>
                <option value='select_course'>Select Course</option>
                {courses.map(c => {
                  return <option key={c.course_id} value={c.course_id}>{c.course_name}</option>
                })}
              </select>
            </div>
            <div className={styles.input_field}>
              <label htmlFor='marks' className={styles.label}>
								Marks
              </label>
              <input className={styles.input_box} type='text' name='marks' autoComplete='off' placeholder='Enter Marks' onChange={(e) => setStudent({ ...student, marks: e.target.value })} />
            </div>
            <button className={styles.btn}>Add Student</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddStudent