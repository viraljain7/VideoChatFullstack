import { axiosInstance } from "./axios";

export const signup= async (signupData) => {
    const res = await axiosInstance.post("/auth/signup", signupData);
    return res.data;
  }
  export const login= async (loginData) => {
    const res = await axiosInstance.post("/auth/login", loginData);
    return res.data;
  }
  export const logout= async () => {
    const res = await axiosInstance.post("/auth/logout"); // corrected endpoint for logout
    return res.data;
  }

  export const getAuthUser = async () => {
  try {
      const res = await axiosInstance.get("/auth/me"); 
      return res.data;
  } catch (error) {
      console.error("Error fetching authenticated user:", error); // added error handling 
      return null; // return null if there's an error
  }
  };

  export const onboarding = async (onboardingData) => {
    const res = await axiosInstance.post("/auth/onboarding", onboardingData);
    return res.data;
  }

  export const getRecommendedFriend = async () => {
    const res = await axiosInstance.get("/user");
    return res.data.recommendedUsers;
  }

  export const getUserFriends = async () => {
    const res = await axiosInstance.get("/user/friends"); // corrected endpoint for getUserFriends
    return res.data.friends;
  }

  
  export const getOutgoingFriendRequest = async () => {
    const res = await axiosInstance.get("/user/outgoing-friend-requests"); // corrected endpoint for outgoing friend requests
    return res.data;
  }

  export const sendFriendRequest = async (userId) => {
    const res = await axiosInstance.post(`/user/friend-requests/${userId}`); // corrected endpoint for outgoing friend requests
    return res.data;
  }


export async function getFriendRequests() {
  const response = await axiosInstance.get("/user/friend-requests");
  return response.data;
}

export async function acceptFriendRequest(requestId) {
  const response = await axiosInstance.put(`/user/friend-requests/${requestId}/accept`);
  return response.data;
}

export async function getStreamToken() {
  const response = await axiosInstance.get("/chat/token");
  return response.data;
}