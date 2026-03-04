import express from 'express';
import { createTest, getTestById, getTests, submitTest } from '../controllers/testController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/', getTests);
router.post('/', protect, adminOnly, createTest);
router.get('/:id', getTestById);
router.post('/submit', protect, submitTest);

export default router;
