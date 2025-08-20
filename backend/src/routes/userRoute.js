import { Router } from 'express';
import userController from '../controllers/userController.js';
import { protectRoute } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(protectRoute); // Apply protectRoute middleware to all routes in this router

router.get('/', userController.getRecommendedUsers);
router.get('/friends', userController.getMyFriends);



router.post("/friend-request/:id", userController.sendFriendRequest);
// router.put("/friend-request/:id/accept", acceptFriendRequest);

// router.get("/friend-requests", getFriendRequests);
// router.get("/outgoing-friend-requests", getOutgoingFriendReqs);


export default router; 