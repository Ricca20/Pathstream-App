import express from 'express';
const router = express.Router();
import {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    enrollCourse,
    getCourseStudents,
    getMyEnrolledCourses,
} from '../controllers/courseController.js';
import { protect } from '../middlewares/authMiddleware.js';

router.route('/').get(getCourses).post(protect, createCourse);
router.route('/my-courses').get(protect, getMyEnrolledCourses);
router.route('/:id').get(getCourse).put(protect, updateCourse).delete(protect, deleteCourse);
router.route('/:id/students').get(protect, getCourseStudents);
router.route('/:id/enroll').post(protect, enrollCourse);

export default router;
