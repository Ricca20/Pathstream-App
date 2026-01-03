import { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../../config';

const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg ${color}`}>
                {icon}
            </div>
            <div>
                <p className="text-sm text-gray-500 font-medium">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
            </div>
        </div>
    </div>
);

const InstructorStatisticsSection = ({ userId, token }) => {
    const [stats, setStats] = useState({
        totalCourses: 0,
        totalStudents: 0,
        totalModules: 0,
        totalRevenue: 0,
        averageRating: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInstructorStats = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.get(`${API_URL}/api/courses/all`, config);

                const instructorCourses = response.data.filter(course =>
                    course.instructor && (course.instructor._id === userId || course.instructor === userId)
                );

                // Calculate statistics
                const totalCourses = instructorCourses.length;
                const totalStudents = instructorCourses.reduce((sum, course) =>
                    sum + (course.students?.length || 0), 0
                );
                const totalModules = instructorCourses.reduce((sum, course) =>
                    sum + (course.modules?.length || 0), 0
                );

                // Calculate revenue based on price * students for each course
                const totalRevenue = instructorCourses.reduce((sum, course) =>
                    sum + (course.price * (course.students?.length || 0)), 0
                );

                // Default rating to 0 since it's not in the model yet
                const averageRating = 0;

                setStats({
                    totalCourses,
                    totalStudents,
                    totalModules,
                    totalRevenue,
                    averageRating
                });
                setLoading(false);
            } catch (err) {
                console.error("Error fetching instructor stats:", err);
                setLoading(false);
            }
        };

        if (userId && token) {
            fetchInstructorStats();
        }
    }, [userId, token]);

    const statsData = [
        {
            label: "Total Courses",
            value: stats.totalCourses,
            icon: (
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            color: "bg-blue-50"
        },
        {
            label: "Total Students",
            value: stats.totalStudents,
            icon: (
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
            color: "bg-green-50"
        },
        {
            label: "Course Modules",
            value: stats.totalModules,
            icon: (
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            ),
            color: "bg-purple-50"
        },
        {
            label: "Total Revenue",
            value: `$${stats.totalRevenue.toFixed(2)}`,
            icon: (
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            color: "bg-yellow-50"
        },
        {
            label: "Average Rating",
            value: stats.averageRating.toFixed(1),
            icon: (
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.324 1.118l1.519 4.674c.3.921-.755 1.688-1.539 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.539-1.118l1.519-4.674a1 1 0 00-.324-1.118L2.285 9.105c-.783-.57-.381-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z" />
                </svg>
            ),
            color: "bg-red-50"
        }
    ];

    if (loading) {
        return (
            <div className="mb-16 text-center text-gray-600">Loading your teaching impact...</div>
        );
    }

    return (
        <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                Your Teaching Impact
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
                {statsData.map((stat, index) => (
                    <StatCard
                        key={index}
                        title={stat.label}
                        value={stat.value}
                        icon={stat.icon}
                        color={stat.color}
                    />
                ))}
            </div>
        </div>
    );
};

export default InstructorStatisticsSection;
