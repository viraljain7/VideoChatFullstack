import { Router } from 'express';
import userController from '../controllers/userController.js';
import { protectRoute } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(protectRoute); // Apply protectRoute middleware to all routes in this router

router.get('/friends', userController.getMyFriends);
router.get('/', userController.getRecommendedUsers);



export default router; 