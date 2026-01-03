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

router.get('/all', getCourses);
router.post('/create', protect, createCourse);
router.get('/my-courses', protect, getMyEnrolledCourses);
router.get('/:id/details', getCourse);
router.put('/:id/update', protect, updateCourse);
router.delete('/:id/delete', protect, deleteCourse);
router.get('/:id/students', protect, getCourseStudents);
router.post('/:id/enroll', protect, enrollCourse);

export default router;
