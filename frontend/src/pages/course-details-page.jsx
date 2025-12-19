import { useState, useEffect } from 'react';
import axios from 'axios';

const CourseDetailsPage = ({ user, courseId, onBack }) => {
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [enrolled, setEnrolled] = useState(false);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };

                // Fetch course details
                const response = await axios.get(`http://127.0.0.1:5001/api/courses/${courseId}`, config);
                setCourse(response.data);

                // Check if user is already enrolled
                // We can check this by seeing if the user's ID is in the course's students list 
                // OR by fetching enrolled courses. 
                // Since the backend 'getCourseById' might not return the full students list for privacy,
                // or we might want to check the 'my-courses' list.
                // However, the current Course model and controller 'getCourseById' returns the course document.
                // If the user is authorized, they might see it.
                // Let's rely on a separate check or if the course object has it.
                // Actually, let's just try to enroll and handle the "already enrolled" error, OR
                // checking the 'students' array if it's available and populates just IDs.
                // For a cleaner UI, let's fetch 'my-courses' to see if this ID is there, or just rely on the button action.
                // Better: Check if `response.data.students` includes `user._id`.
                if (response.data.students && response.data.students.includes(user._id)) {
                    setEnrolled(true);
                }

                setLoading(false);
            } catch (err) {
                console.error("Error fetching course details:", err);
                setError("Failed to load course details.");
                setLoading(false);
            }
        };

        if (courseId) {
            fetchCourseDetails();
        }
    }, [courseId, user.token, user._id]);

    const handleEnroll = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            await axios.post(`http://127.0.0.1:5001/api/courses/${courseId}/enroll`, {}, config);
            setEnrolled(true);
            alert("Enrollment successful!");
        } catch (error) {
            console.error("Enrollment error:", error);
            const msg = error.response?.data?.message || "Enrollment failed";
            if (msg === 'Already enrolled in this course') {
                setEnrolled(true);
            }
            alert(msg);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error || !course) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
                <div className="text-red-500 text-xl">{error || "Course not found"}</div>
                <button onClick={onBack} className="mt-4 text-blue-600 hover:underline">Back to Dashboard</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center cursor-pointer" onClick={onBack}>
                            <svg className="w-6 h-6 text-gray-500 mr-2 hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span className="text-lg font-medium text-gray-900">Back to Dashboard</span>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="bg-white shadow-lg rounded-2xl overflow-hidden mb-8">
                    <div className="md:flex">
                        <div className="md:flex-shrink-0 md:w-1/3 h-64 md:h-auto relative">
                            {course.thumbnail ? (
                                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex items-center justify-center h-full bg-gray-200 text-gray-400">
                                    <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            )}
                        </div>
                        <div className="p-8 w-full">
                            <div className="uppercase tracking-wide text-sm text-blue-500 font-semibold mb-1">{course.category} • {course.level}</div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
                            <p className="text-gray-600 mb-6">{course.description}</p>

                            <div className="flex items-center justify-between mt-auto">
                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                        {course.instructor?.name?.charAt(0) || 'I'}
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-900">{course.instructor?.name || 'Instructor'}</p>
                                        <p className="text-sm text-gray-500">{course.instructor?.email}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-gray-900">${course.price}</p>
                                </div>
                            </div>

                            <div className="mt-8">
                                {enrolled ? (
                                    <button className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md cursor-default">
                                        You are Enrolled
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleEnroll}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-colors"
                                    >
                                        Enroll Now
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modules Section */}
                <div className="bg-white shadow rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Course Curriculum</h3>
                    {course.modules && course.modules.length > 0 ? (
                        <div className="space-y-4">
                            {course.modules.map((module, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="text-lg font-semibold text-gray-800">Module {index + 1}: {module.title}</h4>
                                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{module.duration || 'N/A'}</span>
                                    </div>
                                    <p className="text-gray-600 text-sm">{module.content}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 italic">No modules listed for this course yet.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default CourseDetailsPage;
