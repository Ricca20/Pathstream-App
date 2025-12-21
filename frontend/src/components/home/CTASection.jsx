const CTASection = ({ isInstructor, onViewCourses, onViewMyCourses, onViewInstructorDashboard, user }) => {
    return (
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-8 text-white mb-12">
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">
                    {user
                        ? (isInstructor ? 'Manage Your Courses' : 'Start Learning Today')
                        : 'Start Your Learning Journey'}
                </h2>
                <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                    {user
                        ? (isInstructor
                            ? 'Create and manage your courses, track student progress, and grow your teaching portfolio.'
                            : 'Browse our extensive course catalog and find the perfect courses to advance your skills and career.')
                        : 'Join thousands of students and instructors on PathStream. Register today to access high-quality courses.'}
                </p>
                <div className="flex justify-center gap-4">
                    {user ? (
                        isInstructor ? (
                            <button
                                onClick={onViewInstructorDashboard}
                                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-md font-semibold transition-colors"
                            >
                                Go to Dashboard
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={onViewCourses}
                                    className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-md font-semibold transition-colors"
                                >
                                    Browse Courses
                                </button>
                                <button
                                    onClick={onViewMyCourses}
                                    className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-md font-semibold transition-colors"
                                >
                                    My Enrollments
                                </button>
                            </>
                        )
                    ) : (
                        <a
                            href="/register"
                            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-md font-semibold transition-colors shadow-sm"
                        >
                            Get Started
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CTASection;
