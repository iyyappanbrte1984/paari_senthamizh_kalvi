import express from 'express';
import {
  createTest,
  getLeaderboard,
  getTestById,
  getTests,
  submitTest
} from '../controllers/testController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getTests);
router.post('/', protect, adminOnly, createTest);
router.post('/submit', protect, submitTest);
router.get('/leaderboard/:testId', getLeaderboard);
router.get('/:id', getTestById);

export default router;
