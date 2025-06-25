import { Link } from "react-router-dom";
import React from "react";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6 text-gray-800">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-xl">Página no encontrada</p>
      <p className="mt-2 text-gray-600">
        La ruta que intentaste acceder no existe.
      </p>
      <Link
        to="/homepage"
        className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFoundPage;
