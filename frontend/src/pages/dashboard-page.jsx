import { useState, useEffect } from 'react';
import axios from 'axios';
import Chatbot from '../components/Chatbot';
import Navbar from '../components/Navbar';

const DashboardPage = ({ user, onLogout, onViewHome, onViewMyCourses, onViewInstructorDashboard }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5001/api/courses');
                setCourses(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching courses:", err);
                setError("Failed to load courses. Please check your connection.");
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handleEnroll = async (courseId) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            await axios.post(`http://127.0.0.1:5001/api/courses/${courseId}/enroll`, {}, config);
            alert("Enrollment successful!");
            setSelectedCourse(null); // Close modal if open
        } catch (error) {
            console.error("Enrollment error:", error);
            const msg = error.response?.data?.message || "Enrollment failed";
            alert(msg);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar
                user={user}
                onLogout={onLogout}
                currentPage="courses"                onViewHome={onViewHome}                onViewCourses={() => { }}
                onViewMyCourses={onViewMyCourses}
                onViewInstructorDashboard={onViewInstructorDashboard}
            />

            {/* Content */}
            <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Available Courses
                    </h2>
                    <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                        Explore our wide range of courses and start learning today.
                    </p>
                    {user?.role === 'instructor' && (
                        <div className="mt-6">
                            <button
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors shadow-md"
                                onClick={onViewInstructorDashboard}
                            >
                                + Create New Course
                            </button>
                        </div>
                    )}
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 bg-red-50 p-4 rounded-lg">
                        {error}
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {courses.map((course) => (
                            <div key={course._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
                                <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-500">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-2xl font-bold text-gray-900 pr-4">{course.title}</h3>
                                        <div className="bg-blue-600 text-white px-4 py-2 rounded-lg text-lg font-bold shadow-md whitespace-nowrap">
                                            ${course.price}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-semibold uppercase tracking-wide text-blue-500 bg-blue-50 px-2 py-1 rounded-full">
                                            {course.category}
                                        </span>
                                        <span className="text-xs text-gray-500 flex items-center">
                                            {course.level}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>

                                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                                                {course.instructor?.name?.charAt(0) || 'I'}
                                            </div>
                                            <span className="ml-2 text-sm text-gray-600">{course.instructor?.name || 'Instructor'}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => setSelectedCourse(course)}
                                                className="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                                            >
                                                Details
                                            </button>
                                            {user?.role !== 'instructor' && (
                                                <button
                                                    onClick={() => handleEnroll(course._id)}
                                                    className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
                                                >
                                                    Enroll
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <Chatbot token={user?.token} />

            {/* Course Details Modal */}
            {selectedCourse && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50 overflow-y-auto">
                    <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full">
                        <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-2xl border-b-2 border-blue-500 p-8">
                            <button
                                onClick={() => setSelectedCourse(null)}
                                className="absolute top-4 right-4 bg-white hover:bg-gray-50 text-gray-800 p-2 rounded-full transition-colors shadow-md"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <div className="flex justify-between items-start pr-12">
                                <h2 className="text-3xl font-bold text-gray-900">{selectedCourse.title}</h2>
                                <div className="bg-blue-600 text-white px-6 py-3 rounded-lg text-2xl font-bold shadow-lg whitespace-nowrap">
                                    ${selectedCourse.price}
                                </div>
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">{selectedCourse.category}</span>
                                        <span className="text-sm text-gray-500 border border-gray-200 px-2.5 py-0.5 rounded-full">{selectedCourse.level}</span>
                                        {selectedCourse.duration && (
                                            <span className="text-sm text-gray-500 border border-gray-200 px-2.5 py-0.5 rounded-full">
                                                ⏱️ {selectedCourse.duration}
                                            </span>
                                        )}
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-900">{selectedCourse.title}</h2>
                                    <p className="text-gray-500 mt-1">Instructor: {selectedCourse.instructor?.name || 'Unknown'}</p>
                                </div>
                                <div className="text-3xl font-bold text-blue-600">
                                    ${selectedCourse.price}
                                </div>
                            </div>

                            <div className="prose max-w-none text-gray-600 mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">About this Course</h3>
                                <p className="whitespace-pre-line leading-relaxed mb-6">{selectedCourse.description}</p>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                                        <div className="text-2xl font-bold text-gray-900">{selectedCourse.students?.length || 0}</div>
                                        <div className="text-sm text-gray-500">Students Enrolled</div>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                                        <div className="text-2xl font-bold text-gray-900">{selectedCourse.modules?.length || 0}</div>
                                        <div className="text-sm text-gray-500">Modules</div>
                                    </div>
                                </div>

                                {selectedCourse.modules && selectedCourse.modules.length > 0 && (
                                    <>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Course Curriculum</h3>
                                        <div className="space-y-3">
                                            {selectedCourse.modules.map((module, index) => (
                                                <div key={index} className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                                                    <div className="flex justify-between items-start">
                                                        <div className="flex-1">
                                                            <div className="font-medium text-gray-900">Module {index + 1}: {module.title}</div>
                                                            {module.description && (
                                                                <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                                                            )}
                                                        </div>
                                                        {module.duration && (
                                                            <span className="text-sm text-gray-500 ml-2">{module.duration}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                                <button
                                    onClick={() => setSelectedCourse(null)}
                                    className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                                >
                                    Close
                                </button>
                                {user?.role !== 'instructor' && (
                                    <button
                                        onClick={() => handleEnroll(selectedCourse._id)}
                                        className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-sm transition-colors"
                                    >
                                        Enroll Now
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
