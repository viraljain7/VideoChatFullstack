import { axiosInstance } from "./axios";

export const signup= async (signupData) => {
    const res = await axiosInstance.post("/auth/signup", signupData);
    return res.data;
  }

  export const getAuthUser = async () => {
    const res = await axiosInstance.get("/auth/me"); // dummy API
    return res.data;
  };

  export const onboarding = async (onboardingData) => {
    const res = await axiosInstance.post("/auth/onboarding", onboardingData);
    return res.data;
  }