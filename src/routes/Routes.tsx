// src/routes/Routes.tsx
import { Route, Routes } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      {/* Add other routes here */}
    </Routes>
  );
};

export default AppRoutes;