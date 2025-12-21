const StatisticsSection = () => {
    const stats = [
        { value: '500+', label: 'Courses Available', color: 'text-blue-600' },
        { value: '10K+', label: 'Active Students', color: 'text-green-600' },
        { value: '200+', label: 'Expert Instructors', color: 'text-purple-600' },
        { value: '4.8/5', label: 'Average Rating', color: 'text-orange-600' }
    ];

    return (
        <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Platform Statistics
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                        <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                            {stat.value}
                        </div>
                        <div className="text-gray-600">{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatisticsSection;
