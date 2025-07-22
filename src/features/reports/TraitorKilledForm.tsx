import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../../components/ui';
import ClipIcon from '../../assets/icons/clip-svgrepo-com.svg';
import React, { useState, useEffect } from 'react';
import Popup from '../../components/Popup';
import { reportService } from '../../services/report/report.service';
import type { APIReport } from '../../services/report/report.service';

const ReportsForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [popup, setPopup] = useState<{ open: boolean; message: string }>({ open: false, message: '' });
  const [report, setReport] = useState<APIReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  // Get report ID from navigation state
  const reportId = location.state?.reportId;

  useEffect(() => {
    const fetchReportDetails = async () => {
      try {
        setLoading(true);
        setError("");

        if (!reportId) {
          setError("ID de reporte no encontrado");
          return;
        }

        console.log("Loading report with ID:", reportId); // Debug log
        const reportData = await reportService.getReportById(reportId);
        console.log("Report data loaded:", reportData); // Debug log
        setReport(reportData);

      } catch (err: any) {
        console.error("Error loading report details:", err);
        if (err.response?.status === 404) {
          setError("Reporte no encontrado");
        } else if (err.response?.status === 403) {
          setError("No tienes permisos para ver este reporte");
        } else {
          setError("Error al cargar los datos del reporte");
        }
      } finally {
        setLoading(false);
      }
    };

    if (reportId) {
      fetchReportDetails();
    } else {
      setLoading(false);
      setError("ID de reporte no proporcionado");
    }
  }, [reportId]);

  // Function to approve report
  const handleApproveReport = async () => {
    try {
      if (!report) return;

      await reportService.approveReport(report.id);
      showPopup('Reporte aprobado exitosamente');
    } catch (err: any) {
      console.error("Error approving report:", err);
      showPopup('Error al aprobar el reporte');
    }
  };

  // Function to reject report
  const handleRejectReport = async () => {
    try {
      if (!report) return;

      await reportService.rejectReport(report.id);
      showPopup('Reporte rechazado');
    } catch (err: any) {
      console.error("Error rejecting report:", err);
      showPopup('Error al rechazar el reporte');
    }
  };

  // Función para mostrar el popup
  const showPopup = (message: string) => {
    setPopup({ open: true, message });
  };

  // Función para cerrar el popup
  const closePopup = () => {
    setPopup({ open: false, message: '' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black-anbu text-white flex items-center justify-center">
        <p>Cargando detalles del reporte...</p>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-black-anbu text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || "Error al cargar el reporte"}</p>
          <Button
            onClick={() => navigate('/reports')}
            color="bg-red-anbu"
            textColor="text-white"
            className="mt-4"
          >
            Volver a Reportes
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black-anbu text-white">
      <div className="flex flex-col items-center w-full">
        {/* POPUP */}
        <Popup isOpen={popup.open} onClose={closePopup} message={popup.message} />

        <h2 className="text-center text-xl font-semibold my-6 w-full max-w-5xl mx-auto">
          Vista detallada de reporte
        </h2>
        <form className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 px-0 md:px-8 pb-8 mx-auto">
          {/* Columna izquierda */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block mb-1 font-semibold">Tipo de reporte</label>
              <input
                value={report.typeReport === 'asesinato' ? 'Asesinato' : 'Posible traidor'}
                disabled
                className="w-full px-3 py-2 rounded bg-gray-200 text-black-anbu font-semibold"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Agente asesinado</label>
              <input
                value={report.traidor?.alias || 'N/A'}
                disabled
                className="w-full px-3 py-2 rounded bg-gray-200 text-black-anbu"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-1 font-semibold">Descripción detallada de la situación</label>
              <textarea
                value={report.description}
                disabled
                rows={4}
                className="w-full px-3 py-2 rounded bg-gray-200 text-black-anbu resize-none"
              />
            </div>
          </div>
          {/* Columna derecha */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block mb-1 font-semibold">Fecha</label>
              <div className="relative">
                <input
                  value={new Date(report.createdAt).toLocaleDateString('es-ES')}
                  disabled
                  className="w-full px-3 py-2 rounded bg-gray-200 text-black-anbu font-semibold pr-10"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-black-anbu">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M7 2v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7Zm12 6v12H5V8h14Zm-7 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/></svg>
                </span>
              </div>
            </div>
            <div>
              <label className="block mb-1 font-semibold">Evidencia</label>
              <div className="relative">
                <input
                  value={report.fileUrl ? report.fileUrl.split('/').pop() || 'evidencia.jpg' : 'Sin evidencia'}
                  disabled
                  className="w-full px-3 py-2 rounded bg-gray-200 text-black-anbu pr-10"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-black-anbu">
                  <img src={ClipIcon} alt="clip" className="w-5 h-5" />
                </span>
              </div>
              {report.fileUrl && (
                <div className="mt-2">
                  <a 
                    href={report.fileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm underline"
                  >
                    Ver evidencia
                  </a>
                </div>
              )}
            </div>
            <div>
              <label className="block mb-1 font-semibold">Reportado por</label>
              <input
                value={report.user?.alias || 'N/A'}
                disabled
                className="w-full px-3 py-2 rounded bg-gray-200 text-black-anbu"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Estado actual</label>
              <input
                value={report.state === 'en_proceso' ? 'En Proceso' : 
                       report.state === 'aprobado' ? 'Aprobado' : 'Rechazado'}
                disabled
                className={`w-full px-3 py-2 rounded font-semibold ${
                  report.state === 'aprobado' ? 'bg-green-200 text-green-800' :
                  report.state === 'rechazado' ? 'bg-red-200 text-red-800' :
                  'bg-gray-200 text-black-anbu'
                }`}
              />
            </div>
          </div>
          {/* Botones */}
          {report.state === 'en_proceso' && (
            <div className="md:col-span-2 flex flex-col md:flex-row gap-4 justify-center mt-4">
              <Button
                type="button"
                color="bg-[#960014]"
                className="w-full md:w-auto"
                onClick={handleRejectReport}
              >
                Rechazar petición
              </Button>
              <Button
                type="button"
                color="bg-[#960014]"
                className="w-full md:w-auto"
                onClick={handleApproveReport}
              >
                Aceptar petición
              </Button>
            </div>
          )}
          <div className="md:col-span-2 flex justify-center mt-2">
            <Button
              onClick={() => navigate('/reports')}
              type="button"
              color="bg-[#960014]"
              className="w-full md:w-40"
            >
              Volver
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportsForm;