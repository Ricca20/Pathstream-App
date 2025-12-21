const FooterMessage = ({ isInstructor }) => {
    return (
        <div className="mt-12 text-center text-gray-600">
            <p className="text-lg">
                {isInstructor
                    ? 'Ready to inspire the next generation of learners?'
                    : 'Join thousands of learners advancing their careers with PathStream'}
            </p>
        </div>
    );
};

export default FooterMessage;
