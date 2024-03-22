import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './EditStudent.module.css'
import axios from 'axios'

const EditStudent = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const [student, setStudent] = useState({
    name: '',
    email: '',
    course_id: '',
    marks: ''
  })
  const [courses, setCourses] = useState([])

  useEffect(() => {
    axios.get('/api/adminlogin/courses')
      .then(result => {
        setCourses(result.data.Result)
      })
      .catch(err =>  console.log(err))

    axios.get('/api/adminlogin/students/'+id)
      .then(result => {
        setStudent({
          ...student,
          name: result.data.Result[0].name,
          email: result.data.Result[0].email,
          marks: result.data.Result[0].marks,
          course_id: result.data.Result[0].course_id
        })
      })
      .catch(err => console.log(err))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    axios.put('/api/adminlogin/edit_student/'+id, student)
      .then(result => {
        navigate('/dashboard')
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <div className={styles.container}>
        <form className={styles.studentform} onSubmit={handleSubmit}>
          <h2>Edit Student</h2>
          <div className={styles.input_fields}>
            <div className={styles.input_field}>
              <label htmlFor='name' className={styles.label}>
								Name
              </label>
              <input className={styles.input_box} type='text' name='name' autoComplete='off' placeholder='Enter Name' value={student.name} onChange={(e) => setStudent({ ...student, name: e.target.value })} />
            </div>
            <div className={styles.input_field}>
              <label htmlFor='email' className={styles.label}>
								Email
              </label>
              <input className={styles.input_box} type='text' name='email' autoComplete='off' placeholder='Enter Email' value={student.email} onChange={(e) => setStudent({ ...student, email: e.target.value })} />
            </div>
            <div className={styles.input_field}>
              <label htmlFor='marks' className={styles.label}>
								Marks
              </label>
              <input className={styles.input_box} type='text' name='marks' autoComplete='off' placeholder='Enter Marks' value={student.marks} onChange={(e) => setStudent({ ...student, marks: e.target.value })} />
            </div>
            <button className={styles.btn}>Save changes</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default EditStudent