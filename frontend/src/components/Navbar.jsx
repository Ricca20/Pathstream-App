const Navbar = ({
    user,
    onLogout,
    currentPage = 'home',
    onViewHome,
    onViewCourses,
    onViewMyCourses,
    onViewInstructorDashboard
}) => {
    const isInstructor = user?.role === 'instructor';

    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div
                        className="flex items-center cursor-pointer"
                        onClick={onViewHome}
                    >
                        <h1 className="text-2xl font-bold text-blue-600">
                            Path
                            <span className="text-gray-900">Stream</span>
                            {currentPage === 'instructor' && (
                                <span className="text-gray-500 text-sm font-normal"> | Instructor</span>
                            )}
                        </h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        {currentPage === 'instructor' ? (
                            <>
                                <button
                                    onClick={onViewHome}
                                    className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                                >
                                    Home
                                </button>
                                <button
                                    onClick={onViewCourses}
                                    className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                                >
                                    Courses
                                </button>
                                <div className="h-6 w-px bg-gray-300 mx-2"></div>
                                <span className="text-gray-700 font-medium">{user?.name}</span>
                                <button
                                    onClick={onLogout}
                                    className="ml-4 bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <span className="text-gray-700">Welcome, {user?.name || 'User'}!</span>
                                <button
                                    onClick={currentPage !== 'home' ? onViewHome : undefined}
                                    className={`${
                                        currentPage === 'home'
                                            ? 'text-blue-600 font-bold cursor-default'
                                            : 'text-blue-600 hover:text-blue-800 font-medium'
                                    } transition-colors`}
                                >
                                    Home
                                </button>
                                <button
                                    onClick={
                                        isInstructor
                                            ? onViewInstructorDashboard
                                            : (currentPage !== 'courses' ? onViewCourses : undefined)
                                    }
                                    className={`${
                                        currentPage === 'courses'
                                            ? 'text-blue-600 font-bold cursor-default'
                                            : 'text-blue-600 hover:text-blue-800 font-medium'
                                    } transition-colors`}
                                >
                                    Courses
                                </button>
                                {!isInstructor && (
                                    <button
                                        onClick={currentPage !== 'enrollments' ? onViewMyCourses : undefined}
                                        className={`${currentPage === 'enrollments'
                                                ? 'text-blue-600 font-bold cursor-default'
                                                : 'text-blue-600 hover:text-blue-800 font-medium'
                                            } transition-colors`}
                                    >
                                        My Enrollments
                                    </button>
                                )}
                                <button
                                    onClick={onLogout}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
