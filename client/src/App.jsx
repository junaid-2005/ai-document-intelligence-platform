import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Suspense } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import IntroAnimation from "./components/IntroAnimation";
import ScrollToTop from "./components/ScrollToTop";
import LoadingSkeleton from "./components/LoadingSkeleton";

import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";

import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import UploadDocument from "./pages/UploadDocument";
import AIWorkspace from "./pages/AIWorkspace";
import AIChat from "./pages/AIChat";
import Search from "./pages/Search";
import History from "./pages/History";
import Settings from "./pages/Settings";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./routes/ProtectedRoute";

function AppContent() {
  const location = useLocation();

  const guestRoutes = ["/", "/login", "/register", "/verify-email"];

  const showNavbar = guestRoutes.includes(location.pathname);
  const showFooter = guestRoutes.includes(location.pathname);

  return (
    <>
      <ScrollToTop />

      <IntroAnimation />

      {showNavbar && <Navbar />}

      <Suspense fallback={<LoadingSkeleton />}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/verify-email" element={<VerifyEmail />} />

          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/documents"
            element={
              <ProtectedRoute>
                <Documents />
              </ProtectedRoute>
            }
          />

          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <UploadDocument />
              </ProtectedRoute>
            }
          />

          <Route
            path="/workspace"
            element={
              <ProtectedRoute>
                <AIWorkspace />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chat/:documentId"
            element={
              <ProtectedRoute>
                <AIChat />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ai-chat/:documentId"
            element={
              <ProtectedRoute>
                <AIChat />
              </ProtectedRoute>
            }
          />

          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            }
          />

          <Route
            path="/search/:documentId"
            element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            }
          />

          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      {showFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
