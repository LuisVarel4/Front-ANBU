// src/routes/index.ts
import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthPage from "../pages/auth/AuthPage";
import OtpPage from "../pages/auth/OtpPage";
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

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/auth" replace /> },
  { path: "/auth", element: <AuthPage /> },
  { path: "/otp", element: <OtpPage /> },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "homepage", element: <HomePage /> },
      { path: "mision", element: <MisionPage /> },
      { path: "mision-detail", element: <MisionDetailPage /> },
      { path: "agent-create", element: <CreateAgentPage /> },
      { path: "agent-list", element: <AgentListPage /> },
      { path: "agent-edit", element: <AgentFormPage /> },
      { path: "mission/chat", element: <ChatPage /> },
      { path: "/agent-mision-list", element: <MisionAgentListPage /> },
      { path: "/agent-request", element: <AgentRequestPage /> },
    ],
  },
]);
