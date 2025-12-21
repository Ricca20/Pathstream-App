import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config'; // Added import for API_URL

const Chatbot = ({ token }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'system', content: "Hi! I'm your AI academic counselor. Tell me about your interests, and I'll recommend the best courses for you!" }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input;
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setInput('');
        setLoading(true);

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            // Replaced hardcoded URL with API_URL
            const response = await axios.post(`${API_URL}/api/ai/recommend`, { prompt: userMessage }, config);

            const botMessage = response.data.message;
            const recommendations = response.data.recommendations || [];

            setMessages(prev => [...prev, {
                role: 'bot',
                content: botMessage,
                recommendations: recommendations
            }]);

        } catch (error) {
            console.error("Chatbot Error:", error);
            setMessages(prev => [...prev, { role: 'bot', content: "Sorry, I encountered an error while fetching recommendations. Please try again." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="bg-white w-96 md:w-[450px] lg:w-[500px] h-[600px] md:h-[650px] rounded-2xl shadow-2xl mb-4 flex flex-col overflow-hidden border border-gray-200">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-base">AI Course Advisor</h3>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                                    <p className="text-xs text-gray-300">Online</p>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`flex gap-2.5 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    {/* Avatar */}
                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user'
                                        ? 'bg-blue-500'
                                        : 'bg-blue-100'
                                        }`}>
                                        {msg.role === 'user' ? (
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        ) : (
                                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                            </svg>
                                        )}
                                    </div>

                                    {/* Message Bubble */}
                                    <div className="flex flex-col gap-2.5">
                                        <div className={`px-4 py-2.5 rounded-2xl ${msg.role === 'user'
                                            ? 'bg-blue-500 text-white rounded-tr-sm'
                                            : 'bg-white text-gray-900 border border-gray-200 rounded-tl-sm shadow-sm'
                                            }`}>
                                            <p className="text-sm leading-relaxed">{msg.content}</p>
                                        </div>

                                        {/* Recommendations Cards */}
                                        {msg.recommendations && msg.recommendations.length > 0 && (
                                            <div className="space-y-2">
                                                {msg.recommendations.map(course => (
                                                    <div key={course._id} className="bg-white p-3 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer">
                                                        <div className="flex justify-between items-start mb-1.5">
                                                            <h4 className="font-semibold text-sm text-gray-900 line-clamp-1 flex-1">{course.title}</h4>
                                                            <span className="text-sm font-bold text-gray-900 ml-2 whitespace-nowrap">${course.price}</span>
                                                        </div>
                                                        <p className="text-xs text-gray-600 line-clamp-2 mb-2">{course.description}</p>
                                                        <div className="flex justify-between items-center text-xs">
                                                            <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md font-medium">{course.category}</span>
                                                            <span className="text-gray-500">{course.level}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="flex gap-2.5">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                        </svg>
                                    </div>
                                    <div className="bg-white px-4 py-2.5 rounded-2xl rounded-tl-sm border border-gray-200 shadow-sm">
                                        <div className="flex gap-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about courses..."
                                className="flex-1 px-4 py-2.5 text-sm bg-blue-50 border border-blue-200 rounded-xl focus:outline-none focus:border-blue-400 focus:bg-white transition-colors"
                                disabled={loading}
                            />
                            <button
                                type="submit"
                                disabled={loading || !input.trim()}
                                className="bg-blue-500 hover:bg-blue-600 text-white p-2.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center min-w-[44px]"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center relative"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
                </button>
            )}
        </div>
    );
};

export default Chatbot;
