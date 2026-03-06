import express from 'express';
import {
  createVideo,
  getVideos,
  getVideoById,
  updateVideo,
  deleteVideo
} from '../controllers/videoController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getVideos);
router.post('/', protect, adminOnly, createVideo);
router.get('/:id', getVideoById);
router.put('/:id', protect, adminOnly, updateVideo);
router.delete('/:id', protect, adminOnly, deleteVideo);

export default router;
