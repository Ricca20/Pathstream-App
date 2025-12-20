# PathStream - Online Learning Platform

PathStream is a comprehensive online learning platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It empowers instructors to create and manage courses while enabling students to discover, enroll, and track their learning progress. The platform features an integrated AI-powered chatbot (via OpenAI GPT-3.5) for personalized course recommendations.

## Features

###  For Students
- **User Authentication**: Secure sign up and login
- **Course Discovery**: Browse available courses with detailed information
- **Course Enrollment**: Enroll in courses of interest
- **My Enrollments**: Track and manage enrolled courses
- **AI Course Advisor**: Get personalized course recommendations via AI chatbot
- **Course Details**: View comprehensive information including modules, duration, and instructor details

###  For Instructors
- **Instructor Dashboard**: Dedicated interface for course management
- **Course Creation**: Create courses with detailed information including:
  - Title, description, and category
  - Price and difficulty level
  - Course duration
  - Multiple modules with descriptions and durations
- **Course Management**: Update and delete courses
- **Student Analytics**: View enrolled students for each course
- **Revenue Tracking**: Monitor total revenue from course enrollments
- **Role-Based Access Control**: Secure RBAC implementation

### 🎨 User Interface
- **Modern Design**: Clean and intuitive interface with light blue color theme
- **Responsive Layout**: Fully responsive design that works on all devices
- **Consistent Navigation**: Unified navbar across all pages
- **Enhanced Chatbot UI**: Modern AI assistant with gradient design and smooth animations

---

## Architecture

The project follows the **MVC (Model-View-Controller)** architecture pattern:

### Backend Structure
```
backend/
├── config/          # Database configuration
├── controllers/     # Request handlers (business logic)
├── middlewares/     # Custom middleware (auth, error handling)
├── models/          # MongoDB schemas (User, Course)
├── routes/          # API route definitions
└── server.js        # Entry point
```

### Frontend Structure
```
frontend/
├── src/
│   ├── components/  # Reusable components (Navbar, Chatbot)
│   ├── pages/       # Page components (Dashboard, Login, etc.)
│   ├── App.jsx      # Main application component
│   ├── main.jsx     # React entry point
│   └── index.css    # Global styles
└── public/          # Static assets
```

---

##  Tech Stack

### Frontend
- **React.js** (Vite) - Fast, modern React framework
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM

### Security & Features
- **JWT** - JSON Web Tokens for authentication
- **BCrypt** - Password hashing
- **OpenAI API** - GPT-3.5 Turbo for AI recommendations
- **CORS** - Cross-origin resource sharing

---

##  Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (Local installation or MongoDB Atlas)
- OpenAI API Key

### 1. Clone the Repository
```bash
git clone <repository-url>
cd PathStream
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env file with your credentials
# Required variables:
# - MONGO_URI: Your MongoDB connection string
# - JWT_SECRET: Secret key for JWT tokens
# - OPENAI_API_KEY: Your OpenAI API key
# - PORT: Server port (default: 5001)

# Start the backend server
npm start
```

The backend server will run on `http://localhost:5001`

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend application will run on `http://localhost:5173`

---

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create course (Instructor only)
- `PUT /api/courses/:id` - Update course (Instructor only)
- `DELETE /api/courses/:id` - Delete course (Instructor only)
- `POST /api/courses/:id/enroll` - Enroll in course
- `GET /api/courses/my-courses` - Get enrolled courses
- `GET /api/courses/:id/students` - Get enrolled students (Instructor only)

### AI Recommendations
- `POST /api/ai/recommend` - Get AI-powered course recommendations

---

## 🎯 Usage

### For Students
1. **Register/Login** - Create an account or login
2. **Browse Courses** - Explore available courses on the dashboard
3. **View Details** - Click on any course to see full details
4. **Enroll** - Enroll in courses you're interested in
5. **Track Progress** - View your enrolled courses in "My Enrollments"
6. **AI Advisor** - Use the chatbot for personalized recommendations

### For Instructors
1. **Login** - Login with instructor credentials
2. **Access Dashboard** - Navigate to Instructor Dashboard
3. **Create Course** - Click "Create New Course" and fill in details
4. **Add Modules** - Add course curriculum with modules
5. **Manage Courses** - View, edit, or delete your courses
6. **View Students** - Check enrolled students for each course
7. **Track Revenue** - Monitor earnings from your courses

---

## 🔐 Security Features

- **Password Hashing**: Bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Protected Routes**: Middleware-based route protection
- **Role-Based Access**: Separate permissions for students and instructors
- **Environment Variables**: Sensitive data stored securely

---

## 🎨 UI/UX Features

- **Light Blue Theme**: Consistent color scheme throughout
- **Gradient Accents**: Modern gradient backgrounds
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Transitions and hover effects
- **Clean Typography**: Easy-to-read fonts and spacing
- **Modern Cards**: Course cards with clean design (no images)
- **Enhanced Chatbot**: Modern AI assistant interface

---

## 📝 Project Status

The project is **production-ready** with the following features implemented:
- ✅ Complete authentication system
- ✅ Course CRUD operations
- ✅ Student enrollment system
- ✅ Instructor dashboard
- ✅ AI-powered recommendations
- ✅ Responsive UI design
- ✅ MVC architecture
- ✅ Security best practices

---

## 🤝 Contributing

This is a learning platform project. Feel free to fork and modify for your needs.

---

## 📄 License

This project is for educational purposes.

---

## 👨‍💻 Author

Developed as part of a full-stack development assessment.

---

## 🐛 Known Issues & Future Enhancements

### Potential Improvements
- Add course reviews and ratings
- Implement course completion tracking
- Add video lecture support
- Create advanced search and filtering
- Add payment gateway integration
- Implement email notifications
- Add user profile management
- Create admin panel for platform management

---

## 📞 Support

For issues or questions, please open an issue in the repository.

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:
```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
OPENAI_API_KEY=your_openai_api_key
```

Run the Data Seeder (Optional - populates DB with sample data):
```bash
npm run data:import
```

Start the Backend Server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```

Start the Frontend Application:
```bash
npm run dev
```
Access the application at `http://localhost:5173`.

---

## Deployment Guide

### Deployment Options
You can deploy this MERN application using services like **Render**, **Heroku**, or **Vercel** (Frontend) + **Render/Railway** (Backend).

### Option 1: Render (Recommended for Full Stack)
1.  **Create a New Web Service** on Render.
2.  Connect your GitHub repository.
3.  **Backend Service**:
    *   Root Directory: `backend`
    *   Build Command: `npm install`
    *   Start Command: `node server.js`
    *   Environment Variables: Add `MONGO_URI`, `JWT_SECRET`, `OPENAI_API_KEY`.
4.  **Frontend Static Site**:
    *   Root Directory: `frontend`
    *   Build Command: `npm run build`
    *   Publish Directory: `dist`
    *   Rewrites: Add a rewrite rule -> Source: `/*`, Destination: `/index.html`, Action: `Rewrite`.
    *   Environment Variables: Add `VITE_API_URL` pointing to your deployed backend URL.

### Option 2: Vercel (Frontend) & Railway (Backend)
1.  Deploy **Backend** to Railway/Render as a Node.js service.
2.  Deploy **Frontend** to Vercel:
    *   Import repo.
    *   Set Root Directory to `frontend`.
    *   Add `VITE_API_URL` environment variable.

---

## API Documentation

### Authentication
- `POST /api/auth/register` - Register a new user (role: 'student' or 'instructor').
- `POST /api/auth/login` - Authenticate user and get token.

### Courses
- `GET /api/courses` - Get all courses.
- `GET /api/courses/:id` - Get single course details.
- `POST /api/courses` - Create a new course (Instructor only).
- `PUT /api/courses/:id` - Update a course (Instructor only).
- `DELETE /api/courses/:id` - Delete a course (Instructor only).
- `GET /api/courses/:id/students` - Get enrolled students for a course (Instructor only).
- `POST /api/courses/:id/enroll` - Enroll a student in a course.

### AI
- `POST /api/ai/recommend` - Get course recommendations based on user prompt.

---

## Database Architecture

### User Schema
- `name`: String
- `email`: String (Unique)
- `password`: String (Hashed)
- `role`: Enum ['student', 'instructor'] (Default: 'student')

### Course Schema
- `title`: String
- `description`: String
- `price`: Number
- `thumbnail`: String (URL)
- `category`: String
- `level`: Enum ['Beginner', 'Intermediate', 'Advanced']
- `instructor`: ObjectId (Ref: User)
- `students`: Array of ObjectIds (Ref: User)
- `modules`: Array of Objects (title, duration)

---

## License
This project is for educational purposes as part of the Full Stack Developer Assessment.
