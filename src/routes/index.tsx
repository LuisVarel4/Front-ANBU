// routes/index.ts
import { createBrowserRouter, Navigate } from "react-router-dom";
import { mainRoutes } from "./mainRoutes";
import AuthGuard from "../middleware/AuthGuard";
import GhostGuard from "../middleware/GhostGuard";
import MainLayout from "../layouts/MainLayout";
import { HOME_PATH } from "../constants/app.constant";
import { RootErrorBoundary } from "./RootErrorBoundary";
import NotFoundPage from "../pages/errors/404NotFound";
import { authRoutes } from "./authRoutes.tsx";

export const router = createBrowserRouter([
  {
    ErrorBoundary: RootErrorBoundary,
    children: [
      { index: true, element: <Navigate to={HOME_PATH} replace /> },

      {
        path: "/",
        element: <GhostGuard />,
        children: authRoutes,
      },

      {
        path: "/",
        element: <AuthGuard />,
        children: [
          {
            path: "/",
            element: <MainLayout />,
            children: [...mainRoutes],
          },
        ],
      },

      // catch-all
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
