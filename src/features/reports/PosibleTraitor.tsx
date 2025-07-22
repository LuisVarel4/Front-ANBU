import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../../components/ui';
import ClipIcon from '../../assets/icons/clip-svgrepo-com.svg';
import React, { useState, useEffect } from 'react';
import Popup from '../../components/Popup';
import CloseButton from '../../components/CloseButton';
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

  const [showMissionPopup, setShowMissionPopup] = useState(false);
  const [showTraitorPopup, setShowTraitorPopup] = useState(false);
  const [reward, setReward] = useState<string>('');

  // Function to approve report with reward (bounty hunter mission)
  const handleApproveWithReward = async () => {
    try {
      if (!report || !reward || reward.trim() === '' || parseFloat(reward) <= 0) {
        showPopup('Por favor ingrese un valor de recompensa válido');
        return;
      }

      // Approve with reward - backend will create bounty hunter mission
      const result = await reportService.approveReport(report.id, { 
        reward: reward 
      });
      
      // Update local report state
      setReport(prev => prev ? { ...prev, state: 'aprobado' } : null);
      
      // Check if there are reassigned missions (traitor was a captain)
      if (result.reassignedMissions && result.reassignedMissions.length > 0) {
        setTraitorMissions(result.reassignedMissions.map(m => m.missionCodeName));
        setShowTraitorPopup(true);
      } else {
        showPopup('Misión caza recompensa creada exitosamente');
      }

      // Close mission popup and reset reward
      setShowMissionPopup(false);
      setReward('');
    } catch (err: any) {
      console.error("Error creating bounty mission:", err);
      showPopup('Error al crear la misión caza recompensa');
    }
  };

  // Function to reject report
  const handleRejectReport = async () => {
    try {
      if (!report) return;

      await reportService.rejectReport(report.id);
      
      // Update local report state
      setReport(prev => prev ? { ...prev, state: 'rechazado' } : null);
      
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

  // State for missions where traitor was captain
  const [traitorMissions, setTraitorMissions] = useState<string[]>([]);

  function TraitorCaptainPopup({ isOpen, onClose, missions }: { isOpen: boolean; onClose: () => void; missions: string[] }) {
    if (!isOpen) return null;
    return (
      <>
        <div className="fixed inset-0 bg-opacity-20 backdrop-blur-md z-30"></div>
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-yellow-anbu border-2 border-yellow-anbu rounded-xl shadow-lg text-center w-96 flex flex-col items-center relative p-4">
            <CloseButton onClick={onClose} />
            <h2 className="text-xl font-bold text-[#960014] mb-2">Traidor identificado como capitán</h2>
            <hr className="border-[#960014] w-full mb-3" />
            <p className="text-black-anbu mb-2">
              El traidor ha sido identificado como capitán en las siguientes misiones:
            </p>
            <div className="bg-gray2-anbu rounded-lg p-2 w-full mb-3 flex flex-col items-start">
              {missions.map((mission, idx) => (
                <div key={idx} className="flex items-center w-full mb-1 last:mb-0">
                  <img src="/src/assets/logos/anbuDecoration.svg" alt="icon" className="w-4 h-4 mr-2" />
                  <span className="text-red-anbu font-semibold">{mission}</span>
                </div>
              ))}
              {/* Espacios vacíos para igualar el diseño */}
              {[...Array(Math.max(0, 4 - missions.length))].map((_, idx) => (
                <div key={idx} className="h-6 w-full border-b border-gray-400 opacity-50"></div>
              ))}
            </div>
            <p className="text-black-anbu text-sm mb-4 font-semibold">
              Nota: Se asignarán capitanes aleatorios
            </p>
            <Button
              type="button"
              color="bg-black-anbu"
              className="w-full md:w-auto"
              onClick={() => {
                onClose();
                showPopup('Petición aceptada - Misiones reasignadas');
              }}
            >
              Aceptar
            </Button>
          </div>
        </div>
      </>
    );
  }

  function MissionPopup({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    if (!isOpen) return null;
    
    return (
      <>
        <div className="fixed inset-0 bg-opacity-20 backdrop-blur-md z-30"></div>
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-yellow-anbu p-4 rounded-xl shadow-lg text-center w-80 flex flex-col items-center relative">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-[#960014] text-2xl font-bold"
              aria-label="Cerrar"
            >
              ×
            </button>
            <h2 className="text-xl font-bold text-[#960014] mb-2 text-center">Crear misión caza recompensa</h2>
            <hr className="border-[#960014] w-full mb-4" />
            <label className="w-full text-left text-black-anbu font-semibold mb-1">Agente reportado</label>
            <input
              className="w-full mb-3 px-3 py-2 rounded bg-[#D9DCE1] text-black-anbu"
              disabled
              value={report?.traidor?.alias || 'N/A'}
            />
            <label className="w-full text-left text-black-anbu font-semibold mb-1">Precio por su cabeza</label>
            <div className="relative w-full mb-4">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black-anbu text-lg pointer-events-none">¥</span>
              <input
                className="w-full px-7 py-2 rounded bg-[#D9DCE1] text-black-anbu"
                placeholder="Ingrese su valor 😈🤑"
                type="number"
                min="1"
                step="1"
                value={reward}
                onChange={(e) => setReward(e.target.value)}
                onKeyDown={(e) => {
                  // Allow: backspace, delete, tab, escape, enter
                  if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
                    // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                    (e.keyCode === 65 && e.ctrlKey === true) || 
                    (e.keyCode === 67 && e.ctrlKey === true) || 
                    (e.keyCode === 86 && e.ctrlKey === true) ||
                    (e.keyCode === 88 && e.ctrlKey === true) ||
                    // Allow: home, end, left, right
                    (e.keyCode >= 35 && e.keyCode <= 39)) {
                    return;
                  }
                  // Ensure that it is a number and stop the keypress
                  if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                    e.preventDefault();
                  }
                }}
                autoComplete="off"
              />
            </div>
            <div className="flex gap-2 w-full">
              <Button
                type="button"
                color="bg-gray-500"
                className="flex-1"
                onClick={() => {
                  onClose();
                  setReward(''); // Reset reward when closing
                }}
              >
                Cancelar
              </Button>
              <Button
                type="button"
                color="bg-black-anbu"
                className="flex-1"
                onClick={handleApproveWithReward}
              >
                Crear
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

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
        <TraitorCaptainPopup
          isOpen={showTraitorPopup}
          onClose={() => setShowTraitorPopup(false)}
          missions={traitorMissions}
        />
        <h2 className="text-center text-xl font-semibold my-6 w-full max-w-5xl mx-auto">
          Vista detallada de reporte
        </h2>
        <form className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 px-0 md:px-8 pb-8 mx-auto">
          {/* Columna izquierda */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block mb-1 font-semibold">Tipo de reporte</label>
              <input
                value={report.typeReport === 'posible_traidor' ? 'Posible traidor' : 'Asesinato'}
                disabled
                className="w-full px-3 py-2 rounded bg-gray-200 text-black-anbu font-semibold"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Agente reportado</label>
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
          
          {/* Botones - Only show if state is 'en_proceso' */}
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
                onClick={() => setShowMissionPopup(true)}
              >
                Crear caza recompensa
              </Button>
            </div>
          )}
          
          {/* Show status message for processed reports */}
          {report.state !== 'en_proceso' && (
            <div className="md:col-span-2 text-center mt-4">
              <p className={`text-lg font-semibold ${
                report.state === 'aprobado' ? 'text-green-400' : 'text-red-400'
              }`}>
                {report.state === 'aprobado' ? '✅ Reporte ya fue aprobado' : '❌ Reporte ya fue rechazado'}
              </p>
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
        <MissionPopup isOpen={showMissionPopup} onClose={() => setShowMissionPopup(false)} />  
      </div>
    </div>
  );
};

export default ReportsForm;