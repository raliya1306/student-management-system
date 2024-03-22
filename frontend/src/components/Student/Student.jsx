import React, { useEffect, useState } from 'react'
import styles from './Student.module.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Student = () => {
  const [students, setStudents] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    axios.get('/api/adminlogin/students')
      .then(result => {
        setStudents(result.data.Result)
      })
      .catch(err =>  console.log(err))
  }, [])

  const handleDelete = (id) => {
    axios.delete('/api/adminlogin/delete_student/'+id)
      .then(result => {
        window.location.reload()
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <div className={styles.add_student_container}>
        <Link to='/dashboard/add_student'>
          <button>Add Student</button>
        </Link>
      </div>
      <div className={styles.student_data}>
        <h2 className={styles.table_title}>Students</h2>
        <div className={styles.table_container}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Marks</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s =>
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.course_name}</td>
                  <td>{s.marks}</td>
                  <td>
                    <Link to={'/dashboard/edit_student/'+s.id}>
                      <button className={styles.edit}>Edit</button>
                    </Link>
                    <button className={styles.delete} onClick={() => handleDelete(s.id)}>Delete</button>
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

export default Student