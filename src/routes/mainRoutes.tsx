// routes/mainRoutes.tsx
import HomePage from "../pages/HomePage";
import AgentListPage from "../pages/agent/AgentListPage";
import ReportsPage from "../pages/report/ReportsPage";
import MisionPage from "../pages/mission/MisionPage";
import MisionDetailPage from "../pages/mission/MisionDetailPage";
import ChatPage from "../pages/mission/ChatPage";
import MisionAgentListPage from "../pages/mission/MisionAgentListPage";
import AgentRequestPage from "../pages/mission/AgentRequestPage";
import PosibleTraitorPage from "../pages/report/PosibleTraitorPage";
import TraitorKilledPage from "../pages/report/TraitorKilledPage";
import { HOME_PATH } from "../constants/app.constant";
import RoleGuard from "../middleware/RoleGuard.tsx";

export const mainRoutes = [
  { path: HOME_PATH, element: <HomePage /> },

  {
    element: <RoleGuard allowedRoles={["kage"]} />,
    children: [],
  },
  {
    element: <RoleGuard allowedRoles={["kage", "agente"]} />,
    children: [
      // Agentes
      { path: "agent-list", element: <AgentListPage /> },
      { path: "agent-mision-list", element: <MisionAgentListPage /> },
      { path: "agent-request", element: <AgentRequestPage /> },

      // Misiones
      { path: "mision", element: <MisionPage /> },
      { path: "mision-detail", element: <MisionDetailPage /> },
      { path: "mission/chat", element: <ChatPage /> },

      // Reportes
      { path: "reports", element: <ReportsPage /> },
      { path: "detalle-posible", element: <PosibleTraitorPage /> },
      { path: "detalle-asesinado", element: <TraitorKilledPage /> },
    ],
  },
];
