import { useState, useEffect } from 'react';
import axios from 'axios';

const DashboardPage = ({ token, user, onLogout, onViewMyCourses, onViewCourse }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                // Use port 5002 as confirmed working (or 5001 if user fixed it, but let's try relative or env var if possible, 
                // but for now hardcode or use the same as auth)
                const response = await axios.get('http://127.0.0.1:5001/api/courses'); // Defaulting to 5001
                setCourses(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching courses:", err);
                // Try 5002 if 5001 fails? Or just show error. 
                // Let's assume user fixed 5001 or we use the port they are running on.
                // The previous error showed 5002 working but blocked by IP.
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
        } catch (error) {
            console.error("Enrollment error:", error);
            const msg = error.response?.data?.message || "Enrollment failed";
            alert(msg);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-blue-600">PathStream</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700">Welcome, {user?.name || 'User'}!</span>
                            <button
                                onClick={onViewMyCourses}
                                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                            >
                                My Courses
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
                                onClick={() => alert("Create Course functionality coming soon!")}
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
                                    <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-md text-sm font-bold text-blue-600 shadow-sm">
                                        ${course.price}
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
                                    <h3 className="tex-xl font-bold text-gray-900 mb-2">{course.title}</h3>
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
                                                onClick={() => onViewMyCourses && onViewCourse(course._id)}
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
        </div>
    );
};

export default DashboardPage;
