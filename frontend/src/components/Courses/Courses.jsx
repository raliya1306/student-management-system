import React, { useEffect, useState } from 'react'
import styles from './Courses.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Courses = () => {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    axios.get('/api/adminlogin/courses')
      .then(result => {
        setCourses(result.data.Result)
      })
      .catch(err =>  console.log(err))
  }, [])

  const handleDelete = (id) => {
    axios.delete('/api/adminlogin/delete_course/'+id)
      .then(result => {
        window.location.reload()
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <div className={styles.add_course_container}>
        <Link to='/dashboard/add_course'>
          <button>Add Course</button>
        </Link>
      </div>
      <div className={styles.course_data}>
        <h2 className={styles.table_title}>Courses</h2>
        <div className={styles.table_container}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(c =>
                <tr key={c.course_id}>
                  <td>{c.course_id}</td>
                  <td>{c.course_name}</td>
                  <td>
                    <button className={styles.delete} onClick={() => handleDelete(c.course_id)}>Delete</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Courses