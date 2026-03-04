import express from 'express';
import { createMaterial, createVideo, getMaterials, getVideos } from '../controllers/contentController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/materials', getMaterials);
router.post('/materials', protect, adminOnly, createMaterial);
router.get('/videos', getVideos);
router.post('/videos', protect, adminOnly, createVideo);

export default router;
