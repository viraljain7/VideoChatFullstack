import { Router } from 'express';
import chatController from '../controllers/chatController.js';
import { protectRoute } from '../middlewares/authMiddleware.js';

const router = Router();


router.use(protectRoute)

router.get('/token', chatController.getStreamToken);

export default router;  