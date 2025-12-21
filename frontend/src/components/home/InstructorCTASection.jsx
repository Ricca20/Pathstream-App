const InstructorCTASection = ({ onViewInstructorDashboard }) => {
    return (
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Create Your Next Course?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                Start building engaging content today and make a difference in students' lives.
            </p>
            <button
                onClick={onViewInstructorDashboard}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
            >
                Go to Instructor Dashboard
            </button>
        </div>
    );
};

export default InstructorCTASection;
