import Navbar from '../components/Navbar';

const HomePage = ({ user, onLogout, onViewCourses, onViewMyCourses, onViewInstructorDashboard }) => {
    const isInstructor = user?.role === 'instructor';

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar
                user={user}
                onLogout={onLogout}
                currentPage="home"
                onViewHome={() => {}}
                onViewCourses={onViewCourses}
                onViewMyCourses={onViewMyCourses}
                onViewInstructorDashboard={onViewInstructorDashboard}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        Welcome to PathStream
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Your journey to knowledge starts here. Explore, learn, and grow with our comprehensive online learning platform.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Expert-Led Courses
                        </h3>
                        <p className="text-gray-600">
                            Learn from industry professionals with years of experience in their fields.
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Flexible Learning
                        </h3>
                        <p className="text-gray-600">
                            Study at your own pace with lifetime access to course materials.
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            AI-Powered Recommendations
                        </h3>
                        <p className="text-gray-600">
                            Get personalized course suggestions tailored to your learning goals.
                        </p>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-8 text-white mb-12">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-4">
                            {isInstructor ? 'Manage Your Courses' : 'Start Learning Today'}
                        </h2>
                        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                            {isInstructor
                                ? 'Create and manage your courses, track student progress, and grow your teaching portfolio.'
                                : 'Browse our extensive course catalog and find the perfect courses to advance your skills and career.'}
                        </p>
                        <div className="flex justify-center gap-4">
                            {isInstructor ? (
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
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        Platform Statistics
                    </h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                            <div className="text-gray-600">Courses Available</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-green-600 mb-2">10K+</div>
                            <div className="text-gray-600">Active Students</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-purple-600 mb-2">200+</div>
                            <div className="text-gray-600">Expert Instructors</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-orange-600 mb-2">4.8/5</div>
                            <div className="text-gray-600">Average Rating</div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center text-gray-600">
                    <p className="text-lg">
                        {isInstructor
                            ? 'Ready to inspire the next generation of learners?'
                            : 'Join thousands of learners advancing their careers with PathStream'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
