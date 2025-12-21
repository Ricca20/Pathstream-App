import React from 'react';

const LearningJourney = ({ currentStage = 'dreaming', enrolledCount = 0 }) => {
    const stages = [
        {
            id: 'dreaming',
            title: 'Dreaming',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            ),
            description: 'Discovering possibilities'
        },
        {
            id: 'planning',
            title: 'Planning',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
            ),
            description: 'Setting goals'
        },
        {
            id: 'exploring',
            title: 'Exploring',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            ),
            description: 'Finding courses'
        },
        {
            id: 'enrolling',
            title: 'Enrolling',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
            ),
            description: 'Starting courses'
        },
        {
            id: 'engaging',
            title: 'Engaging',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            description: 'Learning actively'
        },
        {
            id: 'achieving',
            title: 'Achieving',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
            ),
            description: 'Reaching goals'
        }
    ];

    // Determine current stage based on enrolled count
    const determineStage = () => {
        if (enrolledCount === 0) return 'exploring';
        if (enrolledCount >= 1 && enrolledCount < 3) return 'enrolling';
        if (enrolledCount >= 3) return 'engaging';
        return currentStage;
    };

    const activeStage = determineStage();
    const activeIndex = stages.findIndex(stage => stage.id === activeStage);

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Your Learning Journey</h3>
                <p className="text-sm text-gray-600 mt-1">Track your progress from discovery to achievement</p>
            </div>

            {/* Mobile View - Vertical */}
            <div className="block md:hidden space-y-4">
                {stages.map((stage, index) => {
                    return (
                        <div key={stage.id} className="flex items-start gap-3">
                            {/* Icon Circle */}
                            <div className="flex flex-col items-center flex-shrink-0">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-50 text-blue-700 transition-all">
                                    {stage.icon}
                                </div>
                                {index < stages.length - 1 && (
                                    <div className="w-0.5 h-12 mt-2 bg-gray-300" />
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 pt-1">
                                <div className="text-sm font-semibold text-gray-900">
                                    {stage.title}
                                </div>
                                <div className="text-xs mt-0.5 text-gray-600">
                                    {stage.description}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Desktop View - Horizontal */}
            <div className="hidden md:block">
                <div className="relative">
                    {/* Progress Line */}
                    <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-300"></div>

                    {/* Stages */}
                    <div className="relative grid grid-cols-6 gap-2">
                        {stages.map((stage, index) => {
                            return (
                                <div key={stage.id} className="flex flex-col items-center">
                                    {/* Icon Circle */}
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-50 text-blue-700 transition-all mb-3">
                                        {stage.icon}
                                    </div>

                                    {/* Label */}
                                    <div className="text-center">
                                        <div className="text-sm font-semibold mb-1 text-gray-900">
                                            {stage.title}
                                        </div>
                                        <div className="text-xs text-gray-600">
                                            {stage.description}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LearningJourney;
