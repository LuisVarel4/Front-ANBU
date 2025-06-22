// src/routes/Routes.tsx
import { Route, Routes, Navigate } from 'react-router-dom'; 
import AuthPage from '../pages/AuthPage';
import OtpPage from '../pages/OtpPage';
import HomePage from '../pages/HomePage';
import MisionPage from '../pages/mission/MisionPage';
import MisionDetailPage from '../pages/mission/MisionDetailPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" replace />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/otp" element={<OtpPage />} />
      <Route path="/homepage" element={<HomePage />} />

      <Route path="/mision" element={<MisionPage />} />
      <Route path="/misionDetail" element={<MisionDetailPage />} />
    </Routes>
  );
};

export default AppRoutes;