import { Navigate, Route, Routes } from "react-router";
import {
  CallPage,
  ChatPage,
  HomePage,
  LoginPage,
  NotificationPage,
  OnboardingPage,
  SignupPage,
} from "./pages/index.jsx";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios.js";

export default function App() {
  const fetchUsers = async () => {
    const res = await axiosInstance.get("/auth/me"); // dummy API
    console.log("a",res);
    return res.data;
  };
  const { data:authData, isLoading, error } = useQuery({
    queryKey: ["authUser"],
    queryFn: fetchUsers,
    // retry: false,
  });
const authUser = authData?.user;

  return (
    <div className="h-screen" data-theme="night">
      <Routes>
        <Route path="/" element={authUser?<HomePage />:<Navigate to="/login" />} />
        <Route path="/signup" element={!authUser?<SignupPage />:<Navigate to="/"  />} />
        <Route path="/login" element={!authUser?<LoginPage />:<Navigate to="/" />} />
        <Route path="/chat" element={authUser?<ChatPage />:<Navigate to="/login" />} />
        <Route path="/call" element={authUser?<CallPage />:<Navigate to="/login" />} />
        <Route path="/onboarding" element={authUser?<OnboardingPage />:<Navigate to="/login" />} />
        <Route path="/notification" element={authUser?<NotificationPage />:<Navigate to="/login" />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </div>
  );
}
