// src/routes/index.ts
import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthPage from "../pages/auth/AuthPage";
import OtpPage from "../pages/auth/OtpPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage.tsx";
import EmailNotificationPage from "../pages/auth/EmailNotificationPage.tsx";
import HomePage from "../pages/HomePage";
import MisionPage from "../pages/mission/MisionPage";
import MisionDetailPage from "../pages/mission/MisionDetailPage";
import CreateAgentPage from "../pages/agent/CreateAgentPage";
import AgentListPage from "../pages/agent/AgentListPage";
import AgentFormPage from "../pages/agent/AgentFormPage";
import ChatPage from "../pages/mission/ChatPage";
import MainLayout from "../layouts/MainLayout";
import MisionAgentListPage from "../pages/mission/MisionAgentListPage.tsx";
import AgentRequestPage from "../pages/mission/AgentRequestPage.tsx";
import ReportsPage from '../pages/report/ReportsPage';
import PosibleTraitorPage from '../pages/report/PosibleTraitorPage';
import TraitorKilledPage from '../pages/report/TraitorKilledPage';

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/auth" replace /> },
  { path: "/auth", element: <AuthPage /> },
  { path: "/otp", element: <OtpPage /> },
  { path: "/reset-password", element: <ResetPasswordPage /> },
  { path: "/email-notification", element: <EmailNotificationPage /> },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "homepage", element: <HomePage /> },

      { path: "agent-create", element: <CreateAgentPage /> },
      { path: "agent-list", element: <AgentListPage /> },
      { path: "agent-edit", element: <AgentFormPage /> },

      { path: "mision", element: <MisionPage /> },
      { path: "mision-detail", element: <MisionDetailPage /> },
      { path: "mission/chat", element: <ChatPage /> },
      { path: "/agent-mision-list", element: <MisionAgentListPage /> },
      { path: "/agent-request", element: <AgentRequestPage /> },

      { path: "/reports", element: <ReportsPage />},
      { path: "/detalle-posible", element: <PosibleTraitorPage />},
      { path: "/detalle-asesinado", element: <TraitorKilledPage />} 
    ],
  },
]);
