# PathStream

AI-powered online learning platform built with the MERN stack.

## Features

- 🎓 Course management for students and instructors
- 🤖 AI-powered course recommendations
- 🔐 JWT authentication with role-based access
- 📱 Responsive design

## Tech Stack

**Frontend:** React 18, React Router v6, Tailwind CSS, Vite  
**Backend:** Node.js, Express, MongoDB, Mongoose  
**AI:** OpenAI GPT-3.5

## Quick Start

### Prerequisites
- Node.js v16+
- MongoDB
- OpenAI API key

### Installation

1. **Backend Setup**
```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/pathstream
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_key
NODE_ENV=development
```

2. **Frontend Setup**
```bash
cd frontend
npm install
```

### Run

```bash
# Backend (http://localhost:5001)
cd backend
npm run dev

# Frontend (http://localhost:5173)
cd frontend
npm run dev
```

## API Endpoints

**Auth:** `/api/auth/register`, `/api/auth/login`  
**Courses:** `/api/courses/*`  
**AI:** `/api/ai/recommend`

## Project Structure

```
backend/
├── config/         # Database config
├── controllers/    # Business logic
├── models/         # Database schemas
├── routes/         # API routes
└── middlewares/    # Auth middleware

frontend/
└── src/
    ├── components/ # UI components
    ├── context/    # Auth context
    ├── pages/      # Route pages
    └── App.jsx     # Router config
```

---

Built with the MERN stack
