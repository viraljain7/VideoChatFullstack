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
import { useThemeStore } from "./store/useThemeStore.js";
import MyFriends from "./pages/MyFriends.jsx";

export default function App() {
  const { isLoading, authUser } = useAuthUser();
  const isAuthenticated = Boolean(authUser);
  const isOnboarding = authUser?.isOnboarded;
const {theme}=useThemeStore();


  if (isLoading) return <GlobalLoader />;

  return (
    <div className="h-screen" data-theme={theme}>
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
          path="/chat/:id"
          element={
            isAuthenticated && isOnboarding ? (
              <Layout showSidebar={true}> 
              <ChatPage />
              </Layout>
            ) : (
              <Navigate to={isAuthenticated ? "/onboarding" : "/login"} />
            )
          }
        />
        <Route
          path="/call/:videoId"

          element={
            isAuthenticated && isOnboarding ? (
              <Layout showSidebar={true}> 
              <CallPage />
              </Layout>
            ) : (
              <Navigate to={isAuthenticated ? "/onboarding" : "/login"} />
            )
          }
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
          path="/notifications"
          element={
            isAuthenticated && isOnboarding ? (
              <Layout showSidebar={true}> 
              <NotificationPage />
              </Layout>
            ) : (
              <Navigate to={isAuthenticated ? "/onboarding" : "/login"} />
            )
          }
        />

<Route
          path="/friends"
          element={
            isAuthenticated && isOnboarding ? (
              <Layout showSidebar={true}> 
              <MyFriends />
              </Layout>
            ) : (
              <Navigate to={isAuthenticated ? "/onboarding" : "/login"} />
            )
          }
        />
        <Route path="*" element={isAuthenticated ? <div>404 Not Found</div> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}
