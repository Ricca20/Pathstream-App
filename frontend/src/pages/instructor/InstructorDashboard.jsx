import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/common/Navbar';
import InstructorStatisticsSection from '../../components/home/InstructorStatisticsSection';
import InstructorHeroSection from '../../components/home/InstructorHeroSection';
import InstructorFeaturesSection from '../../components/home/InstructorFeaturesSection';
import InstructorCTASection from '../../components/home/InstructorCTASection';
import InstructorFooterMessage from '../../components/home/InstructorFooterMessage';

import toast from 'react-hot-toast';
import API_URL from '../../config';

const InstructorDashboard = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [myCourses, setMyCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showCourseModal, setShowCourseModal] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        level: 'Beginner',
        duration: '',
        modules: []
    });
    const [showStudentsModal, setShowStudentsModal] = useState(false);
    const [selectedCourseTitle, setSelectedCourseTitle] = useState('');
    const [enrolledStudents, setEnrolledStudents] = useState([]);
    const [loadingStudents, setLoadingStudents] = useState(false);

    // Details modal state
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedCourseForDetails, setSelectedCourseForDetails] = useState(null);

    const openCreateModal = () => {
        setEditingCourse(null);
        setFormData({
            title: '',
            description: '',
            price: '',
            category: '',
            level: 'Beginner',
            duration: '',
            modules: []
        });
        setShowCourseModal(true);
    };

    const openEditModal = (course) => {
        setEditingCourse(course);
        setFormData({
            title: course.title,
            description: course.description,
            price: course.price,
            category: course.category,
            level: course.level,
            duration: course.duration,
            modules: course.modules || []
        });
        setShowCourseModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        if (user) {
            fetchInstructorCourses();
        }
    }, [user]);

    const fetchInstructorCourses = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/courses/all`);
            const taughtCourses = response.data.filter(course =>
                course.instructor && (course.instructor._id === user._id || course.instructor === user._id)
            );
            setMyCourses(taughtCourses);
            setLoading(false);
        } catch (err) {
            setError("Failed to load your courses.");
            setLoading(false);
        }
    };


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            if (editingCourse) {
                await axios.put(`${API_URL}/api/courses/${editingCourse._id}/update`, formData, config);
                toast.success("Course updated successfully!");
            } else {
                await axios.post(`${API_URL}/api/courses/create`, formData, config);
                toast.success("Course created successfully!");
            }

            setShowCourseModal(false);
            fetchInstructorCourses();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to save course");
        }
    };

    const handleDeleteCourse = async (courseId) => {
        if (!window.confirm("Are you sure you want to delete this course?")) return;

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            await axios.delete(`${API_URL}/api/courses/${courseId}/delete`, config);
            setMyCourses(myCourses.filter(c => c._id !== courseId));
            toast.success("Course deleted successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete course");
        }
    };

    const handleViewStudents = async (course) => {
        setSelectedCourseTitle(course.title);
        setShowStudentsModal(true);
        setLoadingStudents(true);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const response = await axios.get(`${API_URL}/api/courses/${course._id}/students`, config);
            setEnrolledStudents(response.data);
            setLoadingStudents(false);
        } catch (error) {
            toast.error("Failed to load students");
            setLoadingStudents(false);
            setShowStudentsModal(false);
        }
    };

    const handleViewDetails = (course) => {
        setSelectedCourseForDetails(course);
        setShowDetailsModal(true);
    };

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

            {/* Content */}
            <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">

                <InstructorStatisticsSection courses={myCourses} />

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4 mt-12">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">My Courses</h2>
                        <p className="mt-1 text-gray-500">Manage your course content and students.</p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-medium shadow-md transition-all flex items-center"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create New Course
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 bg-red-50 p-4 rounded-lg">
                        {error}
                    </div>
                ) : myCourses.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No courses yet</h3>
                        <p className="mt-2 text-gray-500">Get started by creating your first course.</p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {myCourses.map((course) => (
                            <div key={course._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-500">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-lg font-bold text-gray-900 pr-3">{course.title}</h3>
                                        <div className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-md whitespace-nowrap">
                                            ${course.price}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{course.category}</span>
                                        <span className="text-xs text-gray-500">{course.level}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{course.title}</h3>

                                    <div className="flex flex-col gap-2 mt-4">
                                        <button
                                            onClick={() => handleViewDetails(course)}
                                            className="w-full text-blue-600 bg-blue-50 hover:bg-blue-100 py-2 rounded text-sm font-medium transition-colors"
                                        >
                                            View Details
                                        </button>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleViewStudents(course)}
                                                className="flex-1 text-gray-700 bg-gray-100 hover:bg-gray-200 py-2 rounded text-sm font-medium transition-colors"
                                            >
                                                {course.students?.length || 0} Students
                                            </button>
                                            <button
                                                onClick={() => handleDeleteCourse(course._id)}
                                                className="text-red-500 hover:bg-red-50 p-2 rounded transition-colors"
                                                title="Delete Course"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}



            </main>

            {/* Create/Edit Course Modal */}
            {showCourseModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold text-gray-900">
                                    {editingCourse ? 'Edit Course' : 'Create New Course'}
                                </h3>
                                <button onClick={() => setShowCourseModal(false)} className="text-gray-400 hover:text-gray-500">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={handleFormSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Course Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        required
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        name="description"
                                        required
                                        rows={4}
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                                        <input
                                            type="number"
                                            name="price"
                                            required
                                            min="0"
                                            step="0.01"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Category</label>
                                        <input
                                            type="text"
                                            name="category"
                                            required
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Level</label>
                                        <select
                                            name="level"
                                            value={formData.level}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                        >
                                            <option value="Beginner">Beginner</option>
                                            <option value="Intermediate">Intermediate</option>
                                            <option value="Advanced">Advanced</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Duration</label>
                                        <input
                                            type="text"
                                            name="duration"
                                            required
                                            placeholder="e.g., 6 weeks, 40 hours"
                                            value={formData.duration}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                        />
                                    </div>
                                </div>

                                {/* Modules Section */}
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <label className="block text-sm font-medium text-gray-700">Course Modules</label>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setFormData(prev => ({
                                                    ...prev,
                                                    modules: [...prev.modules, { title: '', description: '', duration: '' }]
                                                }));
                                            }}
                                            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                        >
                                            + Add Module
                                        </button>
                                    </div>
                                    {formData.modules.length === 0 ? (
                                        <p className="text-sm text-gray-500 italic">No modules added yet. Click "Add Module" to start.</p>
                                    ) : (
                                        <div className="space-y-4">
                                            {formData.modules.map((module, index) => (
                                                <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-sm font-medium text-gray-700">Module {index + 1}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setFormData(prev => ({
                                                                    ...prev,
                                                                    modules: prev.modules.filter((_, i) => i !== index)
                                                                }));
                                                            }}
                                                            className="text-red-500 hover:text-red-700 text-sm"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                    <div className="space-y-3">
                                                        <input
                                                            type="text"
                                                            placeholder="Module Title"
                                                            value={module.title}
                                                            onChange={(e) => {
                                                                const newModules = [...formData.modules];
                                                                newModules[index].title = e.target.value;
                                                                setFormData(prev => ({ ...prev, modules: newModules }));
                                                            }}
                                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                                        />
                                                        <textarea
                                                            placeholder="Module Description"
                                                            rows={2}
                                                            value={module.description}
                                                            onChange={(e) => {
                                                                const newModules = [...formData.modules];
                                                                newModules[index].description = e.target.value;
                                                                setFormData(prev => ({ ...prev, modules: newModules }));
                                                            }}
                                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="Duration (e.g., 2 hours)"
                                                            value={module.duration}
                                                            onChange={(e) => {
                                                                const newModules = [...formData.modules];
                                                                newModules[index].duration = e.target.value;
                                                                setFormData(prev => ({ ...prev, modules: newModules }));
                                                            }}
                                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-end space-x-3 pt-6 border-t">
                                    <button
                                        type="button"
                                        onClick={() => setShowCourseModal(false)}
                                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        {editingCourse ? 'Save Changes' : 'Create Course'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Course Details Modal */}
            {showDetailsModal && selectedCourseForDetails && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50 overflow-y-auto">
                    <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Course Header */}
                        <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-500 p-8">
                            <button
                                onClick={() => setShowDetailsModal(false)}
                                className="absolute top-4 right-4 bg-white hover:bg-gray-50 text-gray-800 p-2 rounded-full transition-colors shadow-lg"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <div className="flex justify-between items-start pr-12">
                                <h2 className="text-3xl font-bold text-gray-900">{selectedCourseForDetails.title}</h2>
                                <div className="bg-blue-600 text-white px-6 py-3 rounded-lg text-2xl font-bold shadow-lg whitespace-nowrap">
                                    ${selectedCourseForDetails.price}
                                </div>
                            </div>
                        </div>

                        {/* Course Content */}
                        <div className="p-8">
                            {/* Header Section */}
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                        {selectedCourseForDetails.category}
                                    </span>
                                    <span className="text-sm text-gray-600 border border-gray-300 px-3 py-1 rounded-full">
                                        {selectedCourseForDetails.level}
                                    </span>
                                    <span className="text-sm text-gray-600 border border-gray-300 px-3 py-1 rounded-full">
                                        ⏱️ {selectedCourseForDetails.duration}
                                    </span>
                                    <span className="ml-auto text-3xl font-bold text-blue-600">
                                        ${selectedCourseForDetails.price}
                                    </span>
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedCourseForDetails.title}</h2>
                                <p className="text-gray-600 text-lg">{selectedCourseForDetails.description}</p>
                                <div className="mt-3 flex items-center text-gray-600">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span>Instructor: {selectedCourseForDetails.instructor?.name || 'You'}</span>
                                </div>
                            </div>

                            {/* Stats Section */}
                            <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900">
                                        {selectedCourseForDetails.students?.length || 0}
                                    </div>
                                    <div className="text-sm text-gray-600">Enrolled Students</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900">
                                        {selectedCourseForDetails.modules?.length || 0}
                                    </div>
                                    <div className="text-sm text-gray-600">Modules</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900">
                                        ${(selectedCourseForDetails.price * (selectedCourseForDetails.students?.length || 0)).toFixed(2)}
                                    </div>
                                    <div className="text-sm text-gray-600">Total Revenue</div>
                                </div>
                            </div>

                            {/* Modules Section */}
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Course Curriculum</h3>
                                {selectedCourseForDetails.modules && selectedCourseForDetails.modules.length > 0 ? (
                                    <div className="space-y-3">
                                        {selectedCourseForDetails.modules.map((module, index) => (
                                            <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                                <div className="flex items-start">
                                                    <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm">
                                                        {index + 1}
                                                    </span>
                                                    <div className="ml-3 flex-1">
                                                        <div className="flex justify-between items-start">
                                                            <h4 className="font-semibold text-gray-900">{module.title}</h4>
                                                            {module.duration && (
                                                                <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                                                                    {module.duration}
                                                                </span>
                                                            )}
                                                        </div>
                                                        {module.description && (
                                                            <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-center py-8 bg-gray-50 rounded-lg">
                                        No modules added yet. Edit this course to add curriculum content.
                                    </p>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-6 border-t">
                                <button
                                    onClick={() => {
                                        setShowDetailsModal(false);
                                        openEditModal(selectedCourseForDetails);
                                    }}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                                >
                                    Edit Course
                                </button>
                                <button
                                    onClick={() => {
                                        setShowDetailsModal(false);
                                        handleViewStudents(selectedCourseForDetails);
                                    }}
                                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors"
                                >
                                    View Students
                                </button>
                                <button
                                    onClick={() => setShowDetailsModal(false)}
                                    className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Enrolled Students Modal */}
            {showStudentsModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">Enrolled Students</h3>
                                    <p className="text-sm text-gray-500">{selectedCourseTitle}</p>
                                </div>
                                <button onClick={() => setShowStudentsModal(false)} className="text-gray-400 hover:text-gray-500">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {loadingStudents ? (
                                <div className="flex justify-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                </div>
                            ) : enrolledStudents.length === 0 ? (
                                <div className="text-center py-10 bg-gray-50 rounded-lg">
                                    <p className="text-gray-500">No students enrolled yet.</p>
                                </div>
                            ) : (
                                <div className="mt-4 overflow-hidden border border-gray-200 rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Name
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Email
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {enrolledStudents.map((student, idx) => (
                                                <tr key={student._id || idx}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                                                                {student.name.charAt(0)}
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {student.email}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={() => setShowStudentsModal(false)}
                                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InstructorDashboard;
