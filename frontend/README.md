# PathStream Frontend

This is the React frontend for the PathStream online learning platform built with Vite.

## Structure

```
frontend/src/
├── components/          # Reusable UI components
│   ├── home/           # Home page components
│   ├── Chatbot.jsx     # AI chatbot component
│   ├── Layout.jsx      # Common layout wrapper
│   ├── Navbar.jsx      # Navigation bar
│   └── ProtectedRoute.jsx  # Route protection
├── context/            # React Context
│   └── AuthContext.jsx # Authentication state management
├── pages/              # Page components
│   ├── login-page.jsx
│   ├── register-page.jsx
│   ├── home-page.jsx
│   ├── dashboard-page.jsx
│   ├── enrolled-courses-page.jsx
│   ├── instructor-dashboard.jsx
│   └── course-details-page.jsx
├── App.jsx             # Main app with routing
├── main.jsx            # App entry point
└── index.css           # Global styles
```

## Key Features

### Authentication System
- **AuthContext**: Global auth state with localStorage persistence
- **ProtectedRoute**: Guards authenticated routes
- **Login/Register**: JWT-based authentication

### Routing (React Router v6)
- `/login` - Login page
- `/register` - Registration page
- `/home` - Home page (protected)
- `/courses` - Browse courses (protected)
- `/my-courses` - Enrolled courses (protected)
- `/instructor-dashboard` - Instructor dashboard (protected)
- `/course/:id` - Course details (protected)

### Components

#### Layout Components
- **Navbar**: Dynamic navigation based on user role
- **Layout**: Wraps pages with common elements (Chatbot)
- **ProtectedRoute**: Redirects unauthenticated users to login

#### Home Page Components
Student view:
- HeroSection, FeaturesSection, CTASection
- LearningJourney, StatisticsSection, FooterMessage

Instructor view:
- InstructorHeroSection, InstructorFeaturesSection
- InstructorCTASection, InstructorStatisticsSection
- InstructorFooterMessage

#### Chatbot
- AI-powered course advisor
- Real-time recommendations
- Clean, modern UI with light blue theme

## Running the Application

```bash
npm install
npm run dev
```

Application will run on `http://localhost:5173`

## Build for Production

```bash
npm run build
```

## Technologies
- React 18 with Vite
- React Router v6
- Tailwind CSS
- Axios for API calls
- Context API for state management
