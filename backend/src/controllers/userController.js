// userController.js

import FriendRequest from "../models/FriendRequest.js";
import User from "../models/userModal.js";
const userController = {
  getMyFriends: async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId)
        .select("friends")
        .populate(
          "friends",
          "fullName profilePic nativeLanguage learningLanguage",
        );

      res.status(200).json({ success: true, friends: user.friends });
    } catch (error) {
      console.error("Error in getMyFriends Controller:", error);
      res.status(500).json({ message: "Server error." });
    }
  },

  getRecommendedUsers: async (req, res) => {
    try {
      const currentUserId = req.user.id;
      const currentUser = req.user;

      // Find users who are not friends and not the current user
      const recommendedUsers = await User.find({
        $and: [
          // Combine conditions with $and
          { _id: { $ne: currentUserId } }, // Exclude current user  (not equal to current user ID)
          { _id: { $nin: currentUser.friends } }, // Exclude friends (not in current user's friends)
          { isOnboarded: true }, // Only include onboarded users
        ],
      }).select("-password");

      res.status(200).json({ success: true, recommendedUsers });
    } catch (error) {
      console.error("Error in recommended users userController:", error);
      res.status(500).json({ message: "Server error." });
    }
  },

  sendFriendRequest: async (req, res) => {
    try {

      const myId= req.user.id;
      // const recipientId = req.params.id;
      const {id:recipientId} = req.params;
      if (myId === recipientId) {
        return res.status(400).json({ message: "You cannot send a friend request to yourself." });
      }

      const recipient = await User.findById(recipientId);
      if (!recipient) {
        return res.status(404).json({ message: "Recipient not found." });
      }

      if(recipient.friends.includes(myId)){
        return res.status(400).json({ message: "You are already friends with this user." });
      } 
      // Check if a friend request already exists
      const existingRequest = await FriendRequest.findOne({
        $or: [
          { sender: myId, recipient: recipientId },
          { sender: recipientId, recipient: myId },
        ],    
      });

      if (existingRequest) {
        return res.status(400)
        .json({ message: "Friend request already exists b/w you and this user." });
      } 

      const newFriendRequest = await FriendRequest.create({
        sender: myId,
        recipient: recipientId,
      });

      res.status(201).json({ message: "Friend request sent successfully.", success: true, newFriendRequest });
 
    } catch (error) {
      console.error("Error in sendFriendRequest Controller:", error);
      res.status(500).json({ message: "Server error." });
    }
  },
};

export default userController;
