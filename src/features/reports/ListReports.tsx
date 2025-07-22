import React, { useState, useEffect } from "react";
import { Button, ScrollArea } from "../../components/ui";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CreateReport from "../../features/reports/CreateReports";
import { reportService } from "../../services/report/report.service";
import type { APIReport } from "../../services/report/report.service";
import { useAuthContext } from "../../context/auth/context";

interface Report {
  id: string;
  nombre: string;
  fecha: string;
  tipo: "posible_traidor" | "asesinato";
  estado: "en_proceso" | "aprobado" | "rechazado";
  description: string;
  reporter: string;
  traidor?: string;
}

const ListReports: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthContext();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [filters, setFilters] = useState({
    nombre: "",
    fecha: "",
    tipo: "",
    estado: "",
  });

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        setError("");

        if (!user?.id) {
          setError("Usuario no autenticado");
          return;
        }

        // Only fetch reports if user is kage
        if (user.role === "kage") {
          console.log("Fetching reports..."); // Debug log
          const apiReports = await reportService.getAllReports();
          console.log("API Reports received:", apiReports); // Debug log
          
          // Transform API data to match component interface
          const transformedReports: Report[] = apiReports.map((report: APIReport) => ({
            id: report.id,
            nombre: report.traidor?.alias || report.user?.alias || 'N/A',
            fecha: new Date(report.createdAt).toLocaleDateString('es-ES'),
            tipo: report.typeReport,
            estado: report.state,
            description: report.description,
            reporter: report.user?.alias || 'N/A',
            traidor: report.traidor?.alias,
          }));

          console.log("Transformed reports:", transformedReports); // Debug log
          setReports(transformedReports);
        } else {
          // For non-kage users, don't fetch reports but don't show error
          setReports([]);
        }
      } catch (err: any) {
        console.error("Error loading reports:", err);
        if (err.response?.status === 403) {
          setError("No tienes permisos para ver estos reportes");
        } else if (err.response?.status === 404) {
          setError("No se encontraron reportes");
        } else {
          setError(err.response?.data?.message || "Error al cargar los reportes");
        }
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated && user) {
      fetchReports();
    } else {
      setLoading(false);
      setError("Usuario no autenticado");
    }
  }, [user, isAuthenticated]);

  // Refresh reports when modal closes (after creating a new report)
  const handleCreateModalClose = () => {
    setShowCreateModal(false);
    
    // Only refresh if user is kage, otherwise redirect agents to homepage
    if (user?.role === "kage") {
      // Refresh the reports list for kage
      const fetchReports = async () => {
        try {
          const apiReports = await reportService.getAllReports();
          const transformedReports: Report[] = apiReports.map((report: APIReport) => ({
            id: report.id,
            nombre: report.traidor?.alias || report.user?.alias || 'N/A',
            fecha: new Date(report.createdAt).toLocaleDateString('es-ES'),
            tipo: report.typeReport,
            estado: report.state,
            description: report.description,
            reporter: report.user?.alias || 'N/A',
            traidor: report.traidor?.alias,
          }));
          setReports(transformedReports);
        } catch (err) {
          console.error("Error refreshing reports:", err);
        }
      };
      fetchReports();
    } else {
      // For agents/captains, redirect to reports page after creating report
      navigate("/reports");
    }
  };

  const filteredReports = reports.filter(
    (r) =>
      r.nombre.toLowerCase().includes(filters.nombre.toLowerCase()) &&
      r.fecha.includes(filters.fecha) &&
      r.tipo.toLowerCase().includes(filters.tipo.toLowerCase()) &&
      r.estado.toLowerCase().includes(filters.estado.toLowerCase()),
  );

  const estadoColor = (estado: string) => {
    if (estado === "en_proceso") return "bg-gray-400 text-black";
    if (estado === "aprobado") return "bg-green-anbu text-white";
    if (estado === "rechazado") return "bg-red-anbu text-white";
    return "";
  };

  const tipoDisplay = (tipo: string) => {
    switch (tipo) {
      case "posible_traidor":
        return "Posible traidor";
      case "asesinato":
        return "Asesinato";
      default:
        return tipo;
    }
  };

  const estadoDisplay = (estado: string) => {
    switch (estado) {
      case "en_proceso":
        return "En Proceso";
      case "aprobado":
        return "Aprobado";
      case "rechazado":
        return "Rechazado";
      default:
        return estado;
    }
  };

  const handleEyeClick = (report: Report) => {
    if (report.tipo === "posible_traidor") {
      navigate(`/detalle-posible`, { 
        state: { 
          reportId: report.id,
          reportData: report 
        } 
      });
    } else {
      navigate(`/detalle-asesinado`, { 
        state: { 
          reportId: report.id,
          reportData: report 
        } 
      });
    }
  };

  if (loading) {
    return (
      <div className="bg-black-anbu h-full text-white flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    );
  }

  if (error && user?.role === "kage") {
    return (
      <div className="bg-black-anbu h-full text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button
            onClick={() => navigate("/homepage")}
            color="bg-red-anbu"
            textColor="text-white"
          >
            Volver
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black-anbu h-full text-white">
      <div className="py-6 text-center">
        <h2 className="text-red-anbu text-2xl font-bold">
          {user?.role === "kage" ? "Lista de reportes de traidores" : "Reportes de traidores"}
        </h2>
        {user?.role === "kage" && reports.length > 0 && (
          <p className="text-gray-300 text-sm mt-2">
            Mostrando todos los reportes ({reports.length})
          </p>
        )}
        {/* Role indicator */}
        <span
          className={`inline-block mt-2 px-3 py-1 rounded text-sm ${
            user?.role === "kage"
              ? "bg-yellow-anbu text-black"
              : "bg-gray2-anbu text-white"
          }`}
        >
          {user?.role === "kage"
            ? "Kage - Gestión de Reportes"
            : `${user?.role === "agente" ? "Agente" : "Capitán"} - Creación de reportes`}
        </span>
      </div>

      {/* Only show table if user is kage */}
      {user?.role === "kage" && (
        <div className="flex-1 px-2 sm:px-4 md:px-8">
          <div className="mx-auto w-full max-w-full rounded-md bg-gray-800 p-2 sm:p-4 md:max-w-4xl">
            <ScrollArea className="max-h-[50vh] flex-1">
              <table className="bg-grayBlue-anbu w-full rounded text-sm">
                <thead className="sticky top-0 z-10 bg-gray-300 text-black">
                  <tr>
                    <th className="px-4 py-2">Nombre Agente</th>
                    <th className="px-4 py-2">Fecha</th>
                    <th className="px-4 py-2">Tipo de reporte</th>
                    <th className="px-4 py-2">Estado</th>
                    <th className="px-4 py-2">Acciones</th>
                  </tr>
                  <tr className="bg-gray-200">
                    <th>
                      <input
                        type="text"
                        className="text-black-anbu w-full rounded-md p-1 text-center text-xs placeholder:text-center"
                        placeholder="Filtrar"
                        onChange={(e) =>
                          setFilters({ ...filters, nombre: e.target.value })
                        }
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        className="text-black-anbu w-full rounded-md p-1 text-center text-xs placeholder:text-center"
                        placeholder="Filtrar"
                        onChange={(e) =>
                          setFilters({ ...filters, fecha: e.target.value })
                        }
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        className="text-black-anbu w-full rounded-md p-1 text-center text-xs placeholder:text-center"
                        placeholder="Filtrar"
                        onChange={(e) =>
                          setFilters({ ...filters, tipo: e.target.value })
                        }
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        className="text-black-anbu w-full rounded-md p-1 text-center text-xs placeholder:text-center"
                        placeholder="Filtrar"
                        onChange={(e) =>
                          setFilters({ ...filters, estado: e.target.value })
                        }
                      />
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.length > 0 ? (
                    filteredReports.map((report) => (
                      <tr key={report.id} className="bg-[#D9E0E6] text-black">
                        <td className="px-4 py-2">{report.nombre}</td>
                        <td className="px-4 py-2 text-center whitespace-nowrap">
                          {report.fecha}
                        </td>
                        <td className="px-4 py-2 text-center">
                          <span className="inline-block min-w-[140px] rounded bg-gray-600 px-2 py-1 text-white">
                            {tipoDisplay(report.tipo)}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-center">
                          <span
                            className={`inline-block min-w-[120px] rounded px-2 py-1 ${estadoColor(
                              report.estado,
                            )}`}
                          >
                            {estadoDisplay(report.estado)}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-center">
                          <button
                            className="text-red-anbu hover:scale-110"
                            onClick={() => handleEyeClick(report)}
                            type="button"
                            aria-label="Ver detalles"
                          >
                            <FaEye />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                        {loading ? "Cargando reportes..." : "No se encontraron reportes"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </ScrollArea>
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-center gap-4">
        <Button
          onClick={() => navigate("/homepage")}
          type="button"
          color="bg-red-anbu"
          className="hover:bg-gray2-anbu"
        >
          Volver
        </Button>

        <Button
          onClick={() => setShowCreateModal(true)}
          type="button"
          color="bg-red-anbu"
          className="hover:bg-gray2-anbu"
        >
          Crear reporte
        </Button>
      </div>
      
      <CreateReport
        isOpen={showCreateModal}
        onClose={handleCreateModalClose}
      />
    </div>
  );
};

export default ListReports;
