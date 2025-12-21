import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Chatbot from '../components/Chatbot';

import toast from 'react-hot-toast';

const DashboardPage = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5001/api/courses/all');
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
            toast.success("Enrollment successful!");
            setSelectedCourse(null); // Close modal if open
        } catch (error) {
            console.error("Enrollment error:", error);
            const msg = error.response?.data?.message || "Enrollment failed";
            toast.error(msg);
        }
    };

    // Get unique categories
    const categories = ['All', ...new Set(courses.map(course => course.category).filter(Boolean))];

    // Filter courses based on search and category
    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Calculate stats
    const totalCourses = courses.length;
    const totalCategories = new Set(courses.map(c => c.category).filter(Boolean)).size;
    const enrolledCoursesCount = courses.filter(course =>
        course.students?.some(student => student._id === user?._id || student === user?._id)
    ).length;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar
                user={user}
                onLogout={logout}
                currentPage="courses"
                onViewHome={() => navigate('/home')}
                onViewCourses={() => navigate('/courses')}
                onViewMyCourses={() => navigate('/my-courses')}
                onViewInstructorDashboard={() => navigate('/instructor-dashboard')}
            />

            {/* Welcome Section */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900 mb-1">
                            Welcome back, {user?.name || 'Student'}!
                        </h1>
                        <p className="text-gray-600">
                            Ready to continue your learning journey?
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 rounded-lg p-5 border border-gray-200">
                            <div className="text-2xl font-semibold text-blue-600">{totalCourses}</div>
                            <div className="text-blue-600 text-sm mt-1">Available Courses</div>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-5 border border-gray-200">
                            <div className="text-2xl font-semibold text-blue-600">{totalCategories}</div>
                            <div className="text-blue-600 text-sm mt-1">Categories</div>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-5 border border-gray-200">
                            <div className="text-2xl font-semibold text-blue-600">{enrolledCoursesCount}</div>
                            <div className="text-blue-600 text-sm mt-1">Your Enrollments</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Explore Courses
                        </h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Discover the perfect course to advance your skills
                        </p>
                    </div>
                    {user?.role === 'instructor' && (
                        <button
                            className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                            onClick={() => navigate('/instructor-dashboard')}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Create New Course
                        </button>
                    )}
                </div>

                {/* Search and Filter Section */}
                <div className="mb-6 space-y-3">
                    {/* Search Bar */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search courses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 text-sm"
                        />
                    </div>

                    {/* Category Filters */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${selectedCategory === category
                                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
                    </div>
                ) : error ? (
                    <div className="text-center bg-red-50 p-5 rounded-lg border border-red-200">
                        <p className="text-red-700 font-medium">{error}</p>
                    </div>
                ) : filteredCourses.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
                        <svg className="mx-auto h-16 w-16 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="text-base font-semibold text-gray-900 mb-1">No courses found</h3>
                        <p className="text-sm text-gray-600">
                            {searchQuery || selectedCategory !== 'All'
                                ? 'Try adjusting your search or filters'
                                : 'No courses available at the moment'}
                        </p>
                        {(searchQuery || selectedCategory !== 'All') && (
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedCategory('All');
                                }}
                                className="mt-3 text-sm text-gray-700 hover:text-gray-900 font-medium underline"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {filteredCourses.map((course) => (
                            <div key={course._id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-gray-300 hover:shadow-md transition-all flex flex-col">
                                <div className="p-5 border-b border-gray-100">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">{course.category}</span>
                                        <span className="text-xs text-gray-500">{course.level}</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">{course.description}</p>

                                    <div className="mt-auto pt-4 border-t border-gray-100">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center text-sm text-gray-600">
                                                <div className="h-7 w-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-700 mr-2">
                                                    {course.instructor?.name?.charAt(0) || 'I'}
                                                </div>
                                                <span>{course.instructor?.name || 'Instructor'}</span>
                                            </div>
                                            <span className="text-lg font-bold text-gray-900">${course.price}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setSelectedCourse(course)}
                                                className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                                            >
                                                Details
                                            </button>
                                            {user?.role !== 'instructor' && (
                                                <button
                                                    onClick={() => handleEnroll(course._id)}
                                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
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


            {/* Course Details Modal */}
            {selectedCourse && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Header */}
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
                            <button
                                onClick={() => setSelectedCourse(null)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <div className="pr-8">
                                <h2 className="text-xl font-semibold text-blue-600 mb-2">{selectedCourse.title}</h2>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <span>{selectedCourse.instructor?.name || 'Unknown'}</span>
                                    <span>•</span>
                                    <span>{selectedCourse.category}</span>
                                    <span>•</span>
                                    <span>{selectedCourse.level}</span>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-6">
                            {/* Meta Info */}
                            <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                                <div className="flex items-center gap-6 text-sm">
                                    <div>
                                        <span className="text-gray-500">Students: </span>
                                        <span className="font-medium text-gray-900">{selectedCourse.students?.length || 0}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Modules: </span>
                                        <span className="font-medium text-gray-900">{selectedCourse.modules?.length || 0}</span>
                                    </div>
                                </div>
                                <div className="text-2xl font-semibold text-blue-600">${selectedCourse.price}</div>
                            </div>

                            {/* Description */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 mb-2">About</h3>
                                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{selectedCourse.description}</p>
                            </div>

                            {/* Modules */}
                            {selectedCourse.modules && selectedCourse.modules.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 mb-3">Curriculum</h3>
                                    <div className="space-y-2">
                                        {selectedCourse.modules.map((module, index) => (
                                            <div key={index} className="flex gap-3 p-3 hover:bg-gray-50 rounded transition-colors">
                                                <span className="text-sm font-medium text-gray-400">{index + 1}.</span>
                                                <div className="flex-1">
                                                    <div className="text-sm font-medium text-gray-900">{module.title}</div>
                                                    {module.description && (
                                                        <p className="text-xs text-gray-500 mt-1">{module.description}</p>
                                                    )}
                                                </div>
                                                {module.duration && (
                                                    <span className="text-xs text-gray-400">{module.duration}</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex gap-3">
                            <button
                                onClick={() => setSelectedCourse(null)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                            >
                                Close
                            </button>
                            {user?.role !== 'instructor' && (
                                <button
                                    onClick={() => handleEnroll(selectedCourse._id)}
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
                                >
                                    Enroll Now
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* AI Chatbot */}
            <Chatbot token={user?.token} />
        </div>
    );
};

export default DashboardPage;
