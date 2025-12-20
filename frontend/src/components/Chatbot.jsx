import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

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

            const response = await axios.post('http://127.0.0.1:5001/api/ai/recommend', { prompt: userMessage }, config);

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
                <div className="bg-white w-80 md:w-96 h-[500px] rounded-2xl shadow-2xl mb-4 flex flex-col overflow-hidden border border-gray-200">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">AI Course Advisor</h3>
                                <p className="text-xs text-blue-100">Online</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 p-1.5 rounded-lg transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-white space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    {/* Avatar */}
                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user'
                                        ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                                        : 'bg-gradient-to-br from-indigo-500 to-purple-600'
                                        }`}>
                                        {msg.role === 'user' ? (
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                            </svg>
                                        )}
                                    </div>

                                    {/* Message Bubble */}
                                    <div className="flex flex-col gap-2">
                                        <div className={`px-4 py-2.5 rounded-2xl ${msg.role === 'user'
                                            ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md'
                                            : 'bg-white text-gray-800 border border-gray-200 shadow-sm'
                                            } ${msg.role === 'user' ? 'rounded-tr-sm' : 'rounded-tl-sm'}`}>
                                            <p className="text-sm leading-relaxed">{msg.content}</p>
                                        </div>

                                        {/* Recommendations Cards */}
                                        {msg.recommendations && msg.recommendations.length > 0 && (
                                            <div className="space-y-2">
                                                {msg.recommendations.map(course => (
                                                    <div key={course._id} className="bg-white p-3 rounded-xl border border-indigo-100 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer group">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <h4 className="font-semibold text-sm text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">{course.title}</h4>
                                                            <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-1 rounded-full ml-2 whitespace-nowrap">${course.price}</span>
                                                        </div>
                                                        <p className="text-xs text-gray-600 line-clamp-2 mb-2">{course.description}</p>
                                                        <div className="flex justify-between items-center text-xs">
                                                            <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">{course.category}</span>
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
                                <div className="flex gap-2">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                    </div>
                                    <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm border border-gray-200 shadow-sm">
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
                        <div className="flex gap-2 bg-gray-50 rounded-full p-1 border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask me anything about courses..."
                                className="flex-1 px-4 py-2 text-sm bg-transparent focus:outline-none"
                                disabled={loading}
                            />
                            <button
                                type="submit"
                                disabled={loading || !input.trim()}
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2.5 rounded-full hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
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
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-4 rounded-full shadow-lg hover:shadow-2xl transition-all transform hover:scale-110 flex items-center justify-center group relative"
                >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                </button>
            )}
        </div>
    );
};

export default Chatbot;
