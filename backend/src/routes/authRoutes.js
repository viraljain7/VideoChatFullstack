import { Router } from 'express';
import authController from '../controllers/authController.js';

const router = Router();

router.post('/signup', authController.signup);

// GET /api/auth/login (login demo - usually POST in real apps)
router.get('/login',    authController.login);

// POST /api/auth/logout
router.post('/logout', authController.logout);

export default router;