# Project Structure

## Backend (MVC Architecture)

```
backend/
│
├── config/
│   └── db.js                    # Database configuration and connection
│
├── controllers/                 # Controllers - Handle business logic
│   ├── aiController.js         # AI recommendation logic
│   ├── authController.js       # Authentication logic
│   └── courseController.js     # Course CRUD operations
│
├── middlewares/                 # Middleware functions
│   └── authMiddleware.js       # JWT authentication middleware
│
├── models/                      # Models - Database schemas
│   ├── Course.js               # Course schema
│   └── User.js                 # User schema
│
├── routes/                      # Routes - API endpoint definitions
│   ├── aiRoutes.js             # AI recommendation routes
│   ├── authRoutes.js           # Authentication routes
│   └── courseRoutes.js         # Course routes
│
├── .env.example                # Environment variables template
├── package.json                # Backend dependencies
└── server.js                   # Application entry point

```

## Frontend (Component-based Architecture)

```
frontend/
│
├── public/                      # Static files
│
├── src/
│   │
│   ├── assets/                 # Images, icons, etc.
│   │
│   ├── components/             # Reusable Components
│   │   ├── Chatbot.jsx        # AI chatbot component
│   │   └── Navbar.jsx         # Navigation bar component
│   │
│   ├── pages/                  # Page Components (Views)
│   │   ├── course-details-page.jsx      # Course details view
│   │   ├── dashboard-page.jsx           # Main dashboard
│   │   ├── enrolled-courses-page.jsx    # Student enrollments
│   │   ├── instructor-dashboard.jsx     # Instructor interface
│   │   ├── login-page.jsx              # Login view
│   │   └── register-page.jsx           # Registration view
│   │
│   ├── App.jsx                 # Root component & routing
│   ├── index.css              # Global styles
│   └── main.jsx               # React entry point
│
├── .gitignore
├── eslint.config.js           # ESLint configuration
├── index.html                 # HTML template
├── package.json               # Frontend dependencies
├── postcss.config.js          # PostCSS configuration
├── tailwind.config.js         # Tailwind CSS configuration
└── vite.config.js             # Vite configuration

```

## Root Directory

```
PathStream/
│
├── backend/                    # Backend application
├── frontend/                   # Frontend application
│
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore rules
└── README.md                  # Project documentation

```

## MVC Architecture Explanation

### Backend MVC Pattern

#### Models (Data Layer)
- **Location**: `backend/models/`
- **Purpose**: Define data structure and database schemas
- **Files**:
  - `User.js` - User schema with authentication fields
  - `Course.js` - Course schema with modules and enrollment info

#### Views (Presentation Layer)
- **Location**: `frontend/src/pages/` and `frontend/src/components/`
- **Purpose**: User interface and presentation
- **Components**: React components for rendering UI

#### Controllers (Business Logic Layer)
- **Location**: `backend/controllers/`
- **Purpose**: Handle requests, process data, and return responses
- **Files**:
  - `authController.js` - User registration, login
  - `courseController.js` - Course CRUD operations
  - `aiController.js` - AI recommendation processing

#### Routes (API Layer)
- **Location**: `backend/routes/`
- **Purpose**: Define API endpoints and map to controllers
- **Files**:
  - `authRoutes.js` - Authentication endpoints
  - `courseRoutes.js` - Course management endpoints
  - `aiRoutes.js` - AI recommendation endpoints

#### Middleware
- **Location**: `backend/middlewares/`
- **Purpose**: Intercept and process requests
- **Files**:
  - `authMiddleware.js` - Verify JWT tokens and protect routes

## Data Flow

1. **Client Request** → Frontend (React)
2. **API Call** → Backend Routes
3. **Route Handler** → Controller Function
4. **Business Logic** → Controller processes request
5. **Database Operation** → Model interacts with MongoDB
6. **Response** → Controller sends data back
7. **UI Update** → Frontend displays result

## Environment Variables

### Backend (.env)
- `PORT` - Server port number
- `NODE_ENV` - Environment (development/production)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT
- `OPENAI_API_KEY` - OpenAI API key

## Dependencies

### Backend
- express - Web framework
- mongoose - MongoDB ODM
- bcryptjs - Password hashing
- jsonwebtoken - JWT authentication
- dotenv - Environment variables
- cors - CORS middleware
- openai - OpenAI API client

### Frontend
- react - UI library
- react-dom - React DOM rendering
- axios - HTTP client
- tailwindcss - CSS framework
- vite - Build tool

## Security Measures

1. **Password Hashing** - BCrypt with salt rounds
2. **JWT Tokens** - Secure authentication tokens
3. **Protected Routes** - Middleware-based protection
4. **Environment Variables** - Sensitive data in .env
5. **CORS** - Cross-origin configuration
6. **Role-Based Access** - Instructor/Student permissions

## Best Practices Implemented

- ✅ MVC architecture separation
- ✅ Environment variable usage
- ✅ Modular code structure
- ✅ Reusable components
- ✅ Clean code principles
- ✅ Consistent naming conventions
- ✅ Error handling
- ✅ Input validation
- ✅ Secure authentication
- ✅ Responsive design
