import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const EnrolledCoursesPage = ({ user, onLogout, onViewHome, onViewCourses, onViewInstructorDashboard }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                const response = await axios.get('http://127.0.0.1:5001/api/courses/my-courses', config);
                setCourses(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching enrolled courses:", err);
                setError("Failed to load enrolled courses.");
                setLoading(false);
            }
        };

        fetchEnrolledCourses();
    }, [user.token]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar
                user={user}
                onLogout={onLogout}
                currentPage="enrollments"
                onViewHome={onViewHome}
                onViewCourses={onViewCourses}
                onViewMyCourses={() => { }}
                onViewInstructorDashboard={onViewInstructorDashboard}
            />

            <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        My Enrolled Courses
                    </h2>
                    <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                        Continue your learning journey.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 bg-red-50 p-4 rounded-lg">
                        {error}
                    </div>
                ) : courses.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-600 mb-6">You haven't enrolled in any courses yet.</p>
                        <button
                            onClick={onBackToDashboard}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                        >
                            Browse Courses
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {courses.map((course) => (
                            <div key={course._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
                                <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-500">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-2xl font-bold text-gray-900 pr-4">{course.title}</h3>
                                        <div className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-md whitespace-nowrap">
                                            Enrolled
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-semibold uppercase tracking-wide text-blue-500 bg-blue-50 px-2 py-1 rounded-full">
                                            {course.category}
                                        </span>
                                        <span className="text-xs text-gray-500 flex items-center">
                                            {course.level}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>
                                    {course.duration && (
                                        <p className="text-sm text-gray-500 mb-4">⏱️ Duration: {course.duration}</p>
                                    )}

                                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                                                {course.instructor?.name?.charAt(0) || 'I'}
                                            </div>
                                            <span className="ml-2 text-sm text-gray-600">{course.instructor?.name || 'Instructor'}</span>
                                        </div>
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                            Continue
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default EnrolledCoursesPage;
