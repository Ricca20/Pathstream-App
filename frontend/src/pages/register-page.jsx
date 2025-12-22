import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import API_URL from '../config';
import InputField from '../components/InputField';

// Icons
const UserIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>
);

const MailIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
);

const LockIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
    </svg>
);

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "student"
    });
    const [isLoading, setIsLoading] = useState(false);

    const { name, email, password, confirmPassword, role } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const setRole = (newRole) => {
        setFormData({ ...formData, role: newRole });
    };

    const validateForm = () => {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return false;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return false;
        }
        // Basic email structure check (HTML5 type="email" handles most, but good to have)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.match(emailRegex)) {
            toast.error("Please enter a valid email address");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const { data } = await axios.post(`${API_URL}/api/auth/register`, {
                name,
                email,
                password,
                role
            });

            toast.success("Registration successful! Please login.");
            navigate('/login');
        } catch (error) {
            console.error("Error:", error);
            if (!error.response) {
                // Network error (server down, cors, etc)
                toast.error("Unable to connect to server. Please check your connection.");
            } else {
                toast.error(error.response?.data?.message || "Registration failed");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="max-w-md w-full space-y-8 relative z-10 bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-100">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create Account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Join us to start your journey
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="space-y-4">
                        {/* Role Selector */}
                        <div>
                            <label htmlFor="role" className="sr-only">I am a</label>
                            <div className="flex gap-4 mb-4">
                                <button
                                    type="button"
                                    onClick={() => setRole('student')}
                                    className={`flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-all ${role === 'student'
                                        ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm'
                                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    Student
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole('instructor')}
                                    className={`flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-all ${role === 'instructor'
                                        ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm'
                                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    Instructor
                                </button>
                            </div>
                        </div>

                        <InputField
                            id="name"
                            name="name"
                            type="text"
                            label="Full Name"
                            placeholder="Full Name"
                            value={name}
                            onChange={handleChange}
                            required
                            icon={UserIcon}
                        />

                        <InputField
                            id="email-address"
                            name="email"
                            type="email"
                            label="Email address"
                            placeholder="Email address"
                            value={email}
                            onChange={handleChange}
                            required
                            icon={MailIcon}
                        />

                        <InputField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            placeholder="Password"
                            value={password}
                            onChange={handleChange}
                            required
                            icon={LockIcon}
                        />

                        <InputField
                            id="confirm-password"
                            name="confirmPassword"
                            type="password"
                            label="Confirm Password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={handleChange}
                            required
                            icon={LockIcon}
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl ${isLoading ? 'opacity-70 cursor-not-allowed hover:scale-100' : ''}`}
                        >
                            {isLoading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating Account...
                                </span>
                            ) : (
                                'Sign up'
                            )}
                        </button>
                    </div>

                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <button
                                type="button"
                                onClick={() => navigate('/login')}
                                className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none underline transition-colors"
                            >
                                Sign in
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
