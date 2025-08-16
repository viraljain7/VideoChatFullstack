// userController.js

import User from "../models/userModal.js";
const userController = {

  getMyFriends: async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select('friends').populate('friends', 'fullName profilePic nativeLanguage learningLanguage');
      
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
          { _id: { $ne: currentUserId } }, // Exclude current user
          { _id: { $nin: currentUser.friends } }, // Exclude friends
          { isOnboarded: true } // Only include onboarded users
        ]
      }).select("-password");

      res.status(200).json({ success: true,  recommendedUsers });
    } catch (error) {
      console.error("Error in recommended users userController:", error);
      res.status(500).json({ message: "Server error." });
    }
  }




};

export default userController;
