import AdminLogin from './components/AdminLogin/AdminLogin'
import Dashboard from './components/Dashboard/Dashboard'
import Student from './components/Student/Student'
import Courses from './components/Courses/Courses'
import AddCourse from './components/AddCourse/AddCourse'
import AddStudent from './components/AddStudent/AddStudent'
import EditStudent from './components/EditStudent/EditStudent'
import LoginAs from './components/LoginAs/LoginAs'
import StudentLogin from './components/StudentLogin/StudentLogin'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import StudentDetails from './components/StudentDetails/StudentDetails'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginAs />}></Route>
        <Route path='/adminlogin' element={<AdminLogin />}></Route>
        <Route path='/studentlogin' element={<StudentLogin />}></Route>
        <Route path='/student_details/:id' element={<StudentDetails />}></Route>
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='' element={<Student />}></Route>
          <Route path='/dashboard/add_student' element={<AddStudent />}></Route>
          <Route path='/dashboard/edit_student/:id' element={<EditStudent />}></Route>
          <Route path='/dashboard/courses' element={<Courses />}></Route>
          <Route path='/dashboard/add_course' element={<AddCourse />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
