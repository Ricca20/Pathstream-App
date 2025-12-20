import express from 'express';
import { getCourseRecommendations } from '../controllers/aiController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/recommend', protect, getCourseRecommendations);

export default router;
