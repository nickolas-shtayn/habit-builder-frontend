import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import SignUp from "./SignUp";
import Login from "./Login";
import Onboarding from "./onboarding/Onboarding";
import ForgotPassword from "./ForgotPassword";
import Dashboard from "./Dashboard";
import CreateHabit from "./CreateHabit";
import Unauthorized from "./Unauthorized";
import VerifyForgotPassword from "./VerifyForgotPassword";
import ResetPassword from "./ResetPassword";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route
          path="/forgot-password-verify"
          element={<VerifyForgotPassword />}
        />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* Require Auth */}
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute>
              <Onboarding />
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
          path="/create-habit"
          element={
            <ProtectedRoute>
              <CreateHabit />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
