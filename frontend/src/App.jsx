import { Route, Routes } from "react-router";
import { CallPage, ChatPage, HomePage, LoginPage, NotificationPage, OnboardingPage, SignupPage } from "./pages/index.jsx";

export default function App() {
  return (
    <div className="h-screen" data-theme="night">
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/chat" element={<ChatPage />} />
  <Route path="/call" element={<CallPage />} />
  <Route path="/signup" element={<SignupPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/onboarding" element={<OnboardingPage />} />
  <Route path="/notification" element={<NotificationPage />} />






</Routes>
    </div>
    
  )


}