import express from 'express';
import { loginUser, registerUser } from '../controllers/authController.js';
import { validateRequiredFields } from '../middleware/validateMiddleware.js';

const router = express.Router();

router.post('/register', validateRequiredFields(['name', 'email', 'phone', 'password']), registerUser);
router.post('/login', validateRequiredFields(['email', 'password']), loginUser);

export default router;
