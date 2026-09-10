import { Route, Routes } from 'react-router-dom'

import { ACCOUNT_TYPE } from './utils/constants'
import About from './pages/About'
import AddCourse from './components/core/Dashboard/AddCourse'
import AllCourses from './pages/AllCourses'
import Cart from './components/core/Dashboard/Cart/Cart'
import Catalog from './pages/Catalog'
import Contact from './pages/ContactUs'
// import ContactUs from './pages/ContactUs'
import CookiePolicy from './pages/CookiePolicy'
// import CourseDetail from './pages/CourseDetail'
import CourseDetails from './pages/CourseDetail'
import Dashboard from './pages/Dashboard'
import EditCourse from './components/core/Dashboard/EditCourse/EditCourse'
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses'
import Error from './pages/Error'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import Instructor from "../src/components/core/InstructorDashboard/Instructor"
// import Instructor from './components/core/Dashboard/Instructor/Instructor'
import Login from './pages/Login'
import MyCourses from './components/core/Dashboard/MyCourses'
import MyProfile from './components/core/Dashboard/MyProfile'
import Navbar from './components/common/Navbar'
import OpenRoute from './components/core/Auth/OpenRoute'
import PrivacyPolicy from './pages/PrivacyPolicy'
import PrivateRoute from './components/core/Auth/PrivateRoute'
// import React from 'react'
import Settings from './components/core/Dashboard/Settings/index'
import Signup from './pages/Signup'
import Terms from './pages/Terms'
import UpdatePassword from './pages/UpdatePassword'
import VerifyEmail from './pages/VerifyEmail'
import VideoDetails from './components/core/ViewCourse/VideoDetails'
import ViewCourse from '../src/pages/ViewCourse'
import VirtualTeacher from './pages/VirtualTeacher'
import { useSelector } from 'react-redux'

// import { useDispatch, useSelector } from 'react-redux'

// import { useNavigate } from 'react-router-dom'

function App() {

  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  
  const { user } = useSelector((state) => state.profile)


  return (
   <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="catalog/:catalogName" element={<Catalog/>} />
      <Route path="courses/:courseId" element={<CourseDetails/>} />
      
      <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
    <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

    <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />  

      <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />  

    <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />  

    <Route
          path="/about"
          element={
            
              <About />
            
          }
        />
    <Route path="/contact" element={<Contact />} />

    <Route 
      element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }
    >
      <Route path="dashboard/my-profile" element={<MyProfile />} />
      
      <Route path="dashboard/Settings" element={<Settings />} />
      

      {
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          <Route path="dashboard/cart" element={<Cart />} />
          <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
          </>
        )
      }

      {
        user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
          <>
          <Route path="dashboard/instructor" element={<Instructor />} />
          <Route path="dashboard/add-course" element={<AddCourse />} />
          <Route path="dashboard/my-courses" element={<MyCourses />} />
          <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
          
          </>
        )
      }


    </Route>

    
      <Route element={
        <PrivateRoute>
          <ViewCourse />
        </PrivateRoute>
      }>

      {
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          <Route 
            path="view-course/:courseId/section/:sectionId/sub-section/:SubsectionId"
            element={<VideoDetails />}
          />
          </>
        )
      }

      </Route>

<Route path="/privacy-policy" element={<PrivacyPolicy />} />
<Route path="cookie-policy" element={<CookiePolicy />} />
<Route path="/terms" element={<Terms/>} />
<Route path="all-courses" element={<AllCourses/>} />
<Route path="/virtual-teacher" element={<VirtualTeacher />} />

    <Route path="*" element={<Error />} />


    </Routes>

   </div>
  );
}

export default App;




 