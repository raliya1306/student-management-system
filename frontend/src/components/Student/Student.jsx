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
      .catch(err => console.log(err))
  }, [])

  const handleDelete = (id) => {
    axios.delete('/api/adminlogin/delete_student/' + id)
      .then(result => {
        window.location.reload()
      })
      .catch(err => console.log(err))
  }

  return (
    <div className={styles.student_container}>
      <div className={styles.add_student_container}>
        <Link to='/dashboard/add_student'>
          <button>+ NEW STUDENT</button>
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
                    <Link to={'/dashboard/edit_student/' + s.id}>
                      <button className={styles.edit}>Edit</button>
                    </Link>
                    <button className={styles.delete} onClick={() => handleDelete(s.id)}>Delete</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {
          students.map(s =>
            <div className={styles.mobile_table} key={s.id}>
              <div className={styles.top}>
                <div className={styles.id}>{s.id}</div>
                <div className={styles.name_email}>
                  <div>{s.name} </div>
                  <div className={styles.email}> {s.email} </div> </div>
                <div className={styles.btns}>
                  <Link to={'/dashboard/edit_student/' + s.id}>
                    <button className={styles.edit}>Edit</button>
                  </Link>
                  <button className={styles.delete} onClick={() => handleDelete(s.id)}>Delete</button>
                </div>
              </div>
              <div className={styles.bottom}>
                <div className={styles.course}>{s.course_name}</div>
                <div className={styles.marks}>{s.marks}</div>
              </div>
            </div>
          )
        }

      </div>
    </div>
  )
}

export default Student