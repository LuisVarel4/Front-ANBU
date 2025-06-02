// src/routes/Routes.tsx
import { Route, Routes, Navigate } from 'react-router-dom'; 
import AuthPage from '../pages/AuthPage';
import OtpPage from '../pages/OtpPage';
import HomePage from '../pages/HomePage';
import MisionLisScreen from '../features/missions/ListMisionScreen';
import MisionPage from '../pages/MisionPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" replace />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/otp" element={<OtpPage />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/mision" element={<MisionPage />} />
      {/* Add other routes here */}
    </Routes>
  );
};

export default AppRoutes;