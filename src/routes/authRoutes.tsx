// routes/authRoutes.tsx
import AuthPage from "../pages/auth/AuthPage";
import OtpPage from "../pages/auth/OtpPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import EmailNotificationPage from "../pages/auth/EmailNotificationPage";

export const authRoutes = [
  { path: "auth", element: <AuthPage /> },
  { path: "otp", element: <OtpPage /> },
  { path: "reset-password", element: <ResetPasswordPage /> },
  { path: "email-notification", element: <EmailNotificationPage /> },
];
