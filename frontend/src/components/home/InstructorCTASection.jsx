const InstructorCTASection = ({
    onViewInstructorDashboard,
    buttonText = "Go to Instructor Dashboard",
    title = "Ready to Create Your Next Course?",
    description = "Start building engaging content today and make a difference in students' lives."
}) => {
    return (
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
                {title}
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                {description}
            </p>
            <button
                onClick={onViewInstructorDashboard}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
            >
                {buttonText}
            </button>
        </div>
    );
};

export default InstructorCTASection;
