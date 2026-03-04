import express from 'express';
import { createMaterial, getMaterials } from '../controllers/materialController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getMaterials);
router.post('/', protect, adminOnly, createMaterial);

export default router;
