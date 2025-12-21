import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.use(cors({
    origin: ["https://pathstream-learning-platform.vercel.app", "http://localhost:5173", "http://localhost:5000"],
    credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'API is running...' });
});

app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is connected!', mongoEnv: process.env.MONGO_URI ? 'Set' : 'Not Set' });
});

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/ai', aiRoutes);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
}

export default app;
