import express from 'express';
import { createVideo, getVideos } from '../controllers/videoController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getVideos);
router.post('/', protect, adminOnly, createVideo);

export default router;
