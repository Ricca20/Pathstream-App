import { useState, useEffect } from 'react';
import axios from 'axios';

const InstructorStatisticsSection = ({ userId, token }) => {
    const [stats, setStats] = useState({
        totalCourses: 0,
        totalStudents: 0,
        totalModules: 0
    });

    useEffect(() => {
        const fetchInstructorStats = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.get('http://127.0.0.1:5001/api/courses/all', config);
                
                // Filter courses taught by this instructor
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

                setStats({ totalCourses, totalStudents, totalModules });
            } catch (err) {
                console.error("Error fetching instructor stats:", err);
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
            )
        },
        {
            label: "Total Students",
            value: stats.totalStudents,
            icon: (
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )
        },
        {
            label: "Course Modules",
            value: stats.totalModules,
            icon: (
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            )
        }
    ];

    return (
        <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                Your Teaching Impact
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
                {statsData.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InstructorStatisticsSection;
