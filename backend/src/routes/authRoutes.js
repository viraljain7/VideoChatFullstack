import { Router } from 'express';
import authController from '../controllers/authController.js';
import { protectRoute } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/signup', authController.signup);

router.post('/login',    authController.login);

// POST /api/auth/logout
router.post('/logout', authController.logout);

router.post('/onboarding', protectRoute, authController.onboard );

router.get('/me', protectRoute, (req, res) => {
    res.status(200).json({ success:true, user: req.user });
});



export default router;