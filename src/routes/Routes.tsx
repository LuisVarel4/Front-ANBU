import { Route, Routes, Navigate } from 'react-router-dom'; 
import AuthPage from '../pages/auth/AuthPage';
import OtpPage from '../pages/auth/OtpPage';
import HomePage from '../pages/HomePage';
import MisionPage from '../pages/mission/MisionPage';
import MisionDetailPage from '../pages/mission/MisionDetailPage';
import CreateAgentPage  from '../pages/agent/CreateAgentPage';
import AgentListPage from '../pages/agent/AgentListPage';
import AgentFormPage from '../pages/agent/AgentFormPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" replace />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/otp" element={<OtpPage />} />
      <Route path="/homepage" element={<HomePage />} />

      <Route path="/mision" element={<MisionPage />} />
      <Route path="/mision-detail" element={<MisionDetailPage />} />
      <Route path="/agent-create" element={<CreateAgentPage />} />
      <Route path="/agent-list" element={<AgentListPage />} />
      <Route path="/agent-edit" element={<AgentFormPage />} />
    </Routes>
  );
};

export default AppRoutes;