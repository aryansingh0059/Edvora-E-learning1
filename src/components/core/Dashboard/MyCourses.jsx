// import React, { useEffect } from 'react'

// import CourseTable from './InstructorCourses/CourseTable';
// import IconBtn from '../../common/IconBtn';
// import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { useState } from 'react';

// const MyCourses = () => {
//     const { token } = useSelector((state) => state.auth);
//     const navigate = useNavigate();
//     const { user } = useSelector((state) => state.profile);
//     const [courses, setCourses] = useState([]);

//     useEffect(() => {
//         const fetchCourses = async () => {
//             try {
//                 const response = await fetchInstructorCourses(token);
//                 if (response) {
//                     setCourses(response);
//                 }
//             }
//             catch (error) {
//                 console.error("Error fetching courses:", error);
//             }
//         }
//         fetchCourses();
//     }, [])
//     return (
//         <div>
//             <div>
//                 <h1>MyCourses</h1>
//                 <IconBtn
//                 text="Create New Course"
//                 onClick={() => navigate("/dashboard/add-course")}
//                 />
//             </div>
//             {
//                 courses && <CourseTable courses={courses} setCourses={setCourses} />
//             }
//         </div>
//     )
// }

// export default MyCourses

import { FiBook, FiPlus, FiTrendingUp } from 'react-icons/fi'
import React, { useEffect } from 'react'

import CourseTable from './InstructorCourses/CourseTable';
import IconBtn from '../../common/IconBtn';
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const MyCourses = () => {
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.profile);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const response = await fetchInstructorCourses(token);
                if (response) {
                    setCourses(response);
                }
            } catch (error) {
                console.error("Error fetching courses:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchCourses();
    }, [token])
    // console.log("Course Information: ",courses);

    // Loading Skeleton
    if (loading) {
        return (
            <div className="min-h-screen bg-richblack-900 p-6">
                <div className="animate-pulse space-y-6">
                    {/* Header Skeleton */}
                    <div className="flex justify-between items-center">
                        <div className="space-y-3">
                            <div className="h-8 bg-richblack-800 rounded w-48"></div>
                            <div className="h-4 bg-richblack-800 rounded w-64"></div>
                        </div>
                        <div className="h-12 bg-richblack-800 rounded-xl w-48"></div>
                    </div>
                    
                    {/* Table Skeleton */}
                    <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-24 bg-richblack-800 rounded-xl"></div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-richblack-900 p-4 lg:p-6">
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="space-y-3">
                        <h1 className="text-3xl lg:text-4xl font-bold text-richblack-5">
                            My <span className="bg-gradient-to-r from-yellow-50 to-yellow-100 bg-clip-text text-transparent">Courses</span>
                        </h1>
                        <p className="text-lg text-richblack-200 font-medium italic">
                            Manage and track your teaching journey
                        </p>
                        
                        {/* Quick Stats */}
                        <div className="flex flex-wrap gap-4 mt-4">
                            <div className="flex items-center gap-2 px-4 py-2 bg-richblack-800 rounded-lg border border-richblack-600">
                                <FiBook className="text-yellow-50 text-lg" />
                                <span className="text-richblack-5 font-semibold">{courses.length}</span>
                                <span className="text-richblack-300 text-sm">Total Courses</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-richblack-800 rounded-lg border border-richblack-600">
                                <FiTrendingUp className="text-green-400 text-lg" />
                                <span className="text-richblack-5 font-semibold">
                                    {courses.filter(course => course.status === 'Published').length}
                                </span>
                                <span className="text-richblack-300 text-sm">Published</span>
                            </div>
                        </div>
                    </div>
                    
                    <IconBtn
                        text="Create New Course"
                        onClick={() => navigate("/dashboard/add-course")}
                        customClasses="mt-4 lg:mt-0 px-6 py-3 bg-gradient-to-r from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 text-richblack-900 font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl flex items-center gap-2"
                    >
                        <FiPlus className="text-lg" />
                    </IconBtn>
                </div>
            </div>

            {/* Courses Table Section */}
            <div className="bg-richblack-800 rounded-2xl border border-richblack-600 shadow-xl overflow-hidden">
                {courses.length > 0 ? (
                    <CourseTable courses={courses} setCourses={setCourses} />
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="w-24 h-24 bg-richblack-700 rounded-full flex items-center justify-center mb-6 border border-yellow-50/20">
                            <FiBook className="text-4xl text-yellow-50" />
                        </div>
                        <h3 className="text-2xl font-bold text-richblack-5 mb-3">
                            No Courses Created Yet
                        </h3>
                        <p className="text-richblack-300 text-lg mb-6 max-w-md italic">
                            Start your teaching journey by creating your first course and sharing your knowledge with the world.
                        </p>
                        <IconBtn
                            text="Create Your First Course"
                            onClick={() => navigate("/dashboard/add-course")}
                            customClasses="px-8 py-3 bg-yellow-50 hover:bg-yellow-100 text-richblack-900 font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
                        >
                            <FiPlus className="text-lg" />
                        </IconBtn>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyCourses