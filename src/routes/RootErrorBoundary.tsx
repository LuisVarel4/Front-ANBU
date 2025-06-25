import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { type FC, lazy, type LazyExoticComponent, Suspense } from "react";

const app: Record<number, LazyExoticComponent<FC>> = {
  404: lazy(() => import("../pages/errors/404NotFound.tsx")),
  500: lazy(() => import("../pages/errors/Error500Page.tsx")),
};

export const RootErrorBoundary = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    const ErrorComponent = app[error.status] ?? app[500];
    return (
      <Suspense fallback={<div>Cargando error...</div>}>
        <ErrorComponent />
      </Suspense>
    );
  }

  return <div>Algo salió mal</div>;
};
