import express from 'express';
import { createCourse, getCourseById, getCourses } from '../controllers/courseController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getCourses);
router.post('/', protect, adminOnly, createCourse);
router.get('/:id', getCourseById);

export default router;
