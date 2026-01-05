import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

// Student Components
import LearningJourney from '../components/home/LearningJourney';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import CTASection from '../components/home/CTASection';
import StatisticsSection from '../components/home/StatisticsSection';
import FooterMessage from '../components/home/FooterMessage';

// Instructor Components
import InstructorHeroSection from '../components/home/InstructorHeroSection';
import InstructorFeaturesSection from '../components/home/InstructorFeaturesSection';
import InstructorCTASection from '../components/home/InstructorCTASection';
import InstructorStatisticsSection from '../components/home/InstructorStatisticsSection';
import InstructorFooterMessage from '../components/home/InstructorFooterMessage';



const HomePage = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const isInstructor = user?.role === 'instructor';

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar
                user={user}
                onLogout={logout}
                currentPage="home"
                onViewHome={() => navigate('/home')}
                onViewCourses={() => navigate('/courses')}
                onViewMyCourses={() => navigate('/my-courses')}
                onViewInstructorDashboard={() => navigate('/instructor-dashboard')}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {isInstructor ? (
                    <>
                        {/* Instructor Home Page Content */}
                        <InstructorHeroSection />
                        <InstructorStatisticsSection
                            userId={user?._id}
                            token={user?.token}
                        />
                        <InstructorFeaturesSection />
                        <InstructorCTASection
                            onViewInstructorDashboard={() => navigate('/instructor-dashboard')}
                        />
                        <InstructorFooterMessage />
                    </>
                ) : (
                    <>
                        {/* Student/Guest Home Page Content */}
                        <HeroSection />

                        {user && (
                            <div className="mb-12">
                                <LearningJourney enrolledCount={0} />
                            </div>
                        )}

                        <FeaturesSection />

                        <CTASection
                            isInstructor={isInstructor}
                            onViewCourses={() => navigate('/courses')}
                            onViewMyCourses={() => navigate('/my-courses')}
                            onViewInstructorDashboard={() => navigate('/instructor-dashboard')}
                            user={user} // Pass user to handle "Get Started" logic
                        />

                        <StatisticsSection />

                        <FooterMessage isInstructor={isInstructor} />
                    </>
                )}
            </div>
        </div>
    );
};

export default HomePage;


