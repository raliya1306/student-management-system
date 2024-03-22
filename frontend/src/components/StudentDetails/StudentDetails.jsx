import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './StudentDetails.module.css'

const StudentDetails = () => {
  const { id } = useParams()
  const [student, setStudent] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    axios.get('/api/studentlogin/student_details/'+id)
      .then(result => {
        setStudent(result.data[0])
      })
      .catch(err => console.log(err))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogout = () => {
    axios.get('/api/studentlogin/logout')
      .then(result => {
        navigate('/studentlogin')
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <div className={styles.container}>
        <img src='/background1.jpeg' />
        <div className={styles.student_data}>
          <div className={styles.add_student_container}>
            <button onClick={handleLogout}>LOGOUT</button>
          </div>
          <div className={styles.table_container}>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Course</th>
                  <th>Marks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.course_id}</td>
                  <td>{student.marks}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default StudentDetails