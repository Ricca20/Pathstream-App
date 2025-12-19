import express from 'express';
import {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    enrollCourse,
    getEnrolledCourses,
} from '../controllers/courseController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, authorize('instructor'), createCourse)
    .get(getAllCourses);

router.route('/my-courses').get(protect, getEnrolledCourses);
router.route('/:id/enroll').post(protect, enrollCourse);

router.route('/:id')
    .get(getCourseById)
    .put(protect, authorize('instructor'), updateCourse)
    .delete(protect, authorize('instructor'), deleteCourse);

export default router;
