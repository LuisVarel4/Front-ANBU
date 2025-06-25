import React from "react";
import { Link } from "react-router-dom";

const Error500Page: React.FC = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 p-6 text-center">
      <h1 className="mb-4 text-5xl font-bold text-red-600">500</h1>
      <h2 className="mb-2 text-2xl font-semibold">
        Error interno del servidor
      </h2>
      <p className="mb-6 text-gray-600">
        Algo salió mal en nuestro lado. Intenta de nuevo más tarde.
      </p>
      <Link
        to="/homepage"
        className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default Error500Page;
