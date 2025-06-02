// src/routes/Routes.tsx
import { Route, Routes } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import OtpPage from '../pages/OtpPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/otp" element={<OtpPage />} />
      {/* Add other routes here */}
    </Routes>
  );
};

export default AppRoutes;