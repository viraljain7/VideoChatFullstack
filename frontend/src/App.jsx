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
import GlobalLoader from "./components/Loader.jsx";
import { useAuthUser } from "./hooks/useAuthUser.js";
import Layout from "./components/Layout.jsx";

export default function App() {
  const { isLoading, authUser } = useAuthUser();
  const isAuthenticated = Boolean(authUser);
  const isOnboarding = authUser?.isOnboarded;

  if (isLoading) return <GlobalLoader />;

  return (
    <div className="h-screen" data-theme="night">
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && isOnboarding ? (
              <Layout showSidebar={true}> 
              <HomePage />
              </Layout>
            ) : (
              <Navigate to={isAuthenticated ? "/onboarding" : "/login"} />
            )
          }
        />
        <Route
          path="/signup"
          element={!isAuthenticated ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage /> : (isOnboarding ? <Navigate to="/" /> : <Navigate to="/onboarding" />)} 
        />
        <Route
          path="/chat"
          element={isAuthenticated ?   <Layout showSidebar={true}> 
          
          <ChatPage />
          </Layout> : <Navigate to="/login" />}
        />
        <Route
          path="/call"
          element={isAuthenticated ? <CallPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/onboarding"
          element={
            isAuthenticated && !isOnboarding ? (
              <OnboardingPage />
            ) : (
              <Navigate to={isAuthenticated ? "/" : "/login"} />
            )
          }
        />
        <Route
          path="/notification"
          element={
            isAuthenticated ? <NotificationPage /> : <Navigate to="/login" />
          }
        />
        <Route path="*" element={isAuthenticated ? <div>404 Not Found</div> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}
