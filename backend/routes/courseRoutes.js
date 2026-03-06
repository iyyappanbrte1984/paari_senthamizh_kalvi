import express from 'express';
import {
  createCourse,
  getCourseById,
  getCourses,
  updateCourse,
  deleteCourse
} from '../controllers/courseController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';
import { validateCourseCreation } from '../middleware/validateMiddleware.js';

const router = express.Router();

router.get('/', getCourses);
router.post('/', protect, adminOnly, validateCourseCreation, createCourse);
router.get('/:id', getCourseById);
router.put('/:id', protect, adminOnly, validateCourseCreation, updateCourse);
router.delete('/:id', protect, adminOnly, deleteCourse);

export default router;
