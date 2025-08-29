import { Router } from 'express';
import userController from '../controllers/userController.js';
import { protectRoute } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(protectRoute); // Apply protectRoute middleware to all routes in this router

router.get('/', userController.getRecommendedUsers);
router.get('/friends', userController.getMyFriends);



router.post("/friend-requests/:id", userController.sendFriendRequest);

router.put("/friend-requests/:id/accept", userController.acceptFriendRequest);

router.get("/friend-requests", userController.getFriendRequests);
router.get("/outgoing-friend-requests", userController.getOutgoingFriendReqs);


export default router; 