// src/routes/Routes.tsx
import { Route, Routes, Navigate } from 'react-router-dom'; 
import AuthPage from '../pages/auth/AuthPage';
import OtpPage from '../pages/auth/OtpPage';
import HomePage from '../pages/HomePage';
import MisionPage from '../pages/mission/MisionPage';
import MisionDetailPage from '../pages/mission/MisionDetailPage';
import MisionAgentListPage from '../pages/mission/MisionAgentListPage';
import AgentRequestPage from '../pages/mission/AgentRequestPage';
import CreateAgentPage  from '../pages/agent/CreateAgentPage';
import AgentListPage from '../features/agent/ListAgent';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" replace />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/otp" element={<OtpPage />} />
      <Route path="/homepage" element={<HomePage />} />

      <Route path="/mision" element={<MisionPage />} />
      <Route path="/mision-detail" element={<MisionDetailPage />} />
      <Route path="/agent-mision-list" element={<MisionAgentListPage />} />
      <Route path="/agent-request" element={<AgentRequestPage />} />

      <Route path="/agent-create" element={<CreateAgentPage />} />
      <Route path="/agent-list" element={<AgentListPage />} />
    </Routes>
  );
};

export default AppRoutes;