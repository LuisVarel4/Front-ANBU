import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import maskAnbu from "../../assets/ilustrations/Mascara_png-removebg-preview.png";
import Button from "../../components/ui/button/Button";
import Popup from "../../components/Popup";
import { reportService } from "../../services/report/report.service";
import { userService } from "../../services/user/user.service";
import { useAuthContext } from "../../context/auth/context";
import type { APIUser } from "../../services/user/user.service";

interface CreateReportProps {
  isOpen: boolean;
  onClose: () => void;
}

function CreateReport({ isOpen, onClose }: CreateReportProps) {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  
  const [formData, setFormData] = useState({
    typeReport: "",
    traidorId: "",
    description: "",
    evidencia: null as File | null,
  });

  const [availableAgents, setAvailableAgents] = useState<APIUser[]>([]);
  const [errores, setErrores] = useState<{ [key: string]: string }>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [enviando, setEnviando] = useState(false);

  // Load available agents when modal opens
  useEffect(() => {
    const loadAgents = async () => {
      if (isOpen) {
        try {
          const users = await userService.getUsers();
          // Filter out the current user and only show agents/kages
          const agents = users.filter(u => 
            u.id !== user?.id && 
            (u.role === 'agente' || u.role === 'kage')
          );
          setAvailableAgents(agents);
        } catch (error) {
          console.error("Error loading agents:", error);
        }
      }
    };

    loadAgents();
  }, [isOpen, user?.id]);

  const manejarCambio = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrores({ ...errores, [name]: "" });
  };

  const manejarArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, evidencia: file });
    setErrores({ ...errores, evidencia: "" });
  };

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();

    const nuevosErrores: { [key: string]: string } = {};

    if (!formData.typeReport) nuevosErrores.typeReport = "El tipo de reporte es obligatorio";
    if (!formData.traidorId) nuevosErrores.traidorId = "El agente acusado es obligatorio";
    if (!formData.description.trim()) nuevosErrores.description = "La descripción es obligatoria";
    if (!formData.evidencia) nuevosErrores.evidencia = "Debe subir un archivo como evidencia";
    if (!user?.id) nuevosErrores.general = "Usuario no autenticado";

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0 && user?.id) {
      try {
        setEnviando(true);

        // Map form data to API format
        const reportData = {
          userId: user.id,
          traidorId: formData.traidorId,
          typeReport: formData.typeReport as 'posible_traidor' | 'asesinato',
          description: formData.description,
        };

        // Always use upload endpoint since evidence is required
        if (formData.evidencia) {
          await reportService.uploadReport(reportData, formData.evidencia);
        } else {
          throw new Error("Debe subir un archivo como evidencia");
        }

        console.log("Reporte creado exitosamente");

        setModalVisible(true);
        setFormData({
          typeReport: "",
          traidorId: "",
          description: "",
          evidencia: null,
        });
      } catch (err: any) {
        console.error("Error enviando reporte:", err);
        setErrores({ 
          general: err.response?.data?.message || "Error al enviar el reporte. Intenta de nuevo." 
        });
      } finally {
        setEnviando(false);
      }
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    onClose();
    // Redirect to reports list
    navigate("/reports");
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto p-4 bg-opacity-50 backdrop-blur-sm">
        <div className="bg-grayBlue-anbu w-full max-w-3xl rounded-xl shadow-md overflow-y-auto max-h-screen">
          <form
            onSubmit={manejarEnvio}
            className="grid gap-6 p-6 md:grid-cols-2"
          >
            <div className="flex items-center justify-center">
              <img src={maskAnbu} alt="ANBU Mask" className="w-64" />
            </div>

            <div className="flex flex-col gap-4">
              {errores.general && (
                <div className="col-span-2 p-3 bg-red-500 text-white rounded">
                  {errores.general}
                </div>
              )}

              {/* TIPO DE REPORTE */}
              <div>
                <label className="mb-1 block text-white">Tipo de Reporte *</label>
                <select
                  name="typeReport"
                  value={formData.typeReport}
                  onChange={manejarCambio}
                  className="text-black-anbu w-full rounded bg-gray-100 px-3 py-2"
                >
                  <option value="">Selecciona un tipo</option>
                  <option value="posible_traidor">Posible traidor</option>
                  <option value="asesinato">Asesinato</option>
                </select>
                {errores.typeReport && (
                  <p className="text-sm text-red-400">{errores.typeReport}</p>
                )}
              </div>

              {/* AGENTE ACUSADO */}
              <div>
                <label className="mb-1 block text-white">Agente Acusado *</label>
                <select
                  name="traidorId"
                  value={formData.traidorId}
                  onChange={manejarCambio}
                  className="text-black-anbu w-full rounded bg-gray-100 px-3 py-2"
                >
                  <option value="">Selecciona un agente</option>
                  {availableAgents.map((agent) => (
                    <option key={agent.id} value={agent.id}>
                      {agent.alias} - {agent.fullName}
                    </option>
                  ))}
                </select>
                {errores.traidorId && (
                  <p className="text-sm text-red-400">{errores.traidorId}</p>
                )}
              </div>

              {/* DESCRIPCIÓN */}
              <div className="md:col-span-2">
                <label className="mb-1 block text-white">Descripción *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={manejarCambio}
                  className="text-black-anbu w-full rounded bg-gray-100 px-3 py-2"
                  rows={6}
                  maxLength={1000}
                  placeholder="Describe detalladamente la situación reportada (máximo 1000 caracteres)"
                />
                <div className="flex justify-between items-center mt-1">
                  {errores.description && (
                    <p className="text-sm text-red-400">{errores.description}</p>
                  )}
                  <span className="text-xs text-gray-300 ml-auto">
                    {formData.description.length}/1000
                  </span>
                </div>
              </div>

              {/* EVIDENCIA */}
              <div className="flex flex-col gap-2">
                <label htmlFor="evidencia" className="text-white">
                  Evidencia * (imagen, video o PDF)
                </label>

                <input
                  id="evidencia"
                  type="file"
                  accept="image/*,video/*,application/pdf"
                  onChange={manejarArchivo}
                  className="hidden"
                />

                <label
                  htmlFor="evidencia"
                  className="cursor-pointer rounded bg-gray-100 px-3 py-2 text-black-anbu text-center hover:bg-gray-200"
                >
                  {formData.evidencia ? "Cambiar archivo" : "Subir evidencia"}
                </label>

                {formData.evidencia && (
                  <div className="mt-2">
                    <p className="text-white text-sm mb-2">
                      Archivo seleccionado: {formData.evidencia.name}
                    </p>
                    {formData.evidencia.type.startsWith('image/') && (
                      <img
                        src={URL.createObjectURL(formData.evidencia)}
                        alt="Vista previa"
                        className="h-32 w-auto rounded border border-gray-300 object-contain"
                      />
                    )}
                  </div>
                )}

                {errores.evidencia && (
                  <p className="text-sm text-red-400">{errores.evidencia}</p>
                )}
              </div>

              {/* BOTONES */}
              <div className="col-span-2 mt-4 flex justify-center gap-4">
                <Button
                  onClick={() => {
                    setFormData({
                      typeReport: "",
                      traidorId: "",
                      description: "",
                      evidencia: null
                    });
                    setErrores({});
                    onClose();
                  }}
                  type="button"
                  color="bg-red-anbu"
                  className="hover:bg-gray2-anbu"
                  disabled={enviando}
                >
                  Cancelar
                </Button>

                <Button
                  type="submit"
                  color="bg-red-anbu"
                  className="hover:bg-green-anbu"
                  disabled={enviando}
                >
                  {enviando ? "Enviando..." : "Crear Reporte"}
                </Button>
              </div>
            </div>
          </form>
        </div>

        <Popup
          isOpen={modalVisible}
          onClose={handleModalClose}
          message="¡Reporte creado exitosamente!"
        />
      </div>
    </>
  );
}

export default CreateReport;
