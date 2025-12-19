import { useState, useEffect } from 'react';
import axios from 'axios';

const EnrolledCoursesPage = ({ user, onLogout, onBackToDashboard }) => {
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
            {/* Navbar */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center cursor-pointer" onClick={onBackToDashboard}>
                            <h1 className="text-2xl font-bold text-blue-600">PathStream</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700">Welcome, {user?.name || 'User'}!</span>
                            <button
                                onClick={onBackToDashboard}
                                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                            >
                                Dashboard
                            </button>
                            <button
                                onClick={onLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

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
                                <div className="h-48 bg-gray-200 relative">
                                    {course.thumbnail ? (
                                        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-400 bg-gray-100">
                                            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 bg-green-100 text-green-800 px-2 py-1 rounded-md text-sm font-bold shadow-sm">
                                        Enrolled
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="tex-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>

                                    <div className="mt-auto pt-4 border-t border-gray-100">
                                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                                            Continue Learning
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
