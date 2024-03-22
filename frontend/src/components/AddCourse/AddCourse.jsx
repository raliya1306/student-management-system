import React, { useState } from 'react'
import styles from './AddCourse.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddCourse = () => {
  const [course, setCourse] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    try {
      event.preventDefault()
      await axios.post('/api/adminlogin/add_course', { course })
      navigate('/dashboard/courses')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className={styles.container}>
        <form className={styles.courseform} onSubmit={handleSubmit}>
          <h2>New Course</h2>
          <div className={styles.input_fields}>
            <div className={styles.input_field}>
              <input className={styles.input_box} type='text' name='course' autoComplete='off' placeholder='Enter Course' onChange={(e) => setCourse(e.target.value)} />
            </div>
            <button className={styles.btn}>Add Course</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddCourse