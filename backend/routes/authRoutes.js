import express from 'express';
import {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
  getProfile,
  updateProfile
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateRequiredFields, validateUserRegistration } from '../middleware/validateMiddleware.js';

const router = express.Router();

router.post('/register', validateUserRegistration, registerUser);
router.post('/login', validateRequiredFields(['email', 'password']), loginUser);
router.post('/forgot-password', validateRequiredFields(['email']), forgotPassword);
router.post('/reset-password', validateRequiredFields(['token', 'password']), resetPassword);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

export default router;
