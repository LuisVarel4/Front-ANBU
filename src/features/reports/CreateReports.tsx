import React, { useState } from "react";
import maskAnbu from "../../assets/ilustrations/Mascara_png-removebg-preview.png";
import Button from "../../components/ui/button/Button";
import Popup from "../../components/Popup";

interface CreateReportProps {
  isOpen: boolean;
  onClose: () => void;
}

function CreateReport({ isOpen, onClose }: CreateReportProps) {
  const [formData, setFormData] = useState({
    razon: "",
    agenteAcusado: "",
    fecha: "",
    descripcion: "",
    evidencia: null as File | null,
  });

  const [errores, setErrores] = useState<{ [key: string]: string }>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [enviando, setEnviando] = useState(false);

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

    if (!formData.razon) nuevosErrores.razon = "La razón es obligatoria";
    if (!formData.agenteAcusado.trim()) nuevosErrores.agenteAcusado = "El agente acusado es obligatorio";
    if (!formData.fecha) nuevosErrores.fecha = "La fecha es obligatoria";
    if (!formData.descripcion.trim()) nuevosErrores.descripcion = "La descripción es obligatoria";
    if (!formData.evidencia) nuevosErrores.evidencia = "Debe subir una imagen como evidencia";

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
      try {
        setEnviando(true);

        // Acá puedes hacer tu POST al backend con formData

        console.log("Enviando reporte:", formData);

        setModalVisible(true);
        setFormData({
          razon: "",
          agenteAcusado: "",
          fecha: "",
          descripcion: "",
          evidencia: null,
        });
      } catch (err) {
        console.error("Error enviando reporte:", err);
        setErrores({ general: "Error al enviar el reporte. Intenta de nuevo." });
      } finally {
        setEnviando(false);
      }
    }
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

              {/* RAZÓN */}
              <div>
                <label className="mb-1 block text-white">Razón de Reporte</label>
                <select
                  name="razon"
                  value={formData.razon}
                  onChange={manejarCambio}
                  className="text-black-anbu w-full rounded bg-gray-100 px-3 py-2"
                >
                  <option value="">Selecciona una razón</option>
                  <option value="Posible traidor">Posible traidor</option>
                  <option value="Traidor eliminado">Traidor eliminado</option>
                </select>
                {errores.razon && (
                  <p className="text-sm text-red-400">{errores.razon}</p>
                )}
              </div>

              {/* AGENTE ACUSADO */}
              <div>
                <label className="mb-1 block text-white">Agente Acusado</label>
                <input
                  name="agenteAcusado"
                  type="text"
                  value={formData.agenteAcusado}
                  onChange={manejarCambio}
                  className="text-black-anbu w-full rounded bg-gray-100 px-3 py-2"
                />
                {errores.agenteAcusado && (
                  <p className="text-sm text-red-400">{errores.agenteAcusado}</p>
                )}
              </div>

              {/* FECHA */}
              <div>
                <label className="mb-1 block text-white">Fecha del Reporte</label>
                <input
                  name="fecha"
                  type="date"
                  value={formData.fecha}
                  onChange={manejarCambio}
                  className="text-black-anbu w-full rounded bg-gray-100 px-3 py-2"
                />
                {errores.fecha && (
                  <p className="text-sm text-red-400">{errores.fecha}</p>
                )}
              </div>

              {/* DESCRIPCIÓN */}
              <div className="md:col-span-2">
                <label className="mb-1 block text-white">Descripción</label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={manejarCambio}
                  className="text-black-anbu w-full rounded bg-gray-100 px-3 py-2"
                  rows={4}
                />
                {errores.descripcion && (
                  <p className="text-sm text-red-400">{errores.descripcion}</p>
                )}
              </div>

              {/* EVIDENCIA */}
              <div className="flex flex-col gap-2">
                <label htmlFor="evidencia" className="text-white">
                    Evidencia (imagen)
                </label>

                <input
                    id="evidencia"
                    type="file"
                    accept="image/*"
                    onChange={manejarArchivo}
                    className="hidden"
                />

                <label
                    htmlFor="evidencia"
                    className="cursor-pointer rounded bg-gray-100 px-3 py-2 text-black-anbu text-center hover:bg-gray-200"
                >
                    {formData.evidencia ? "Cambiar imagen" : "Subir imagen"}
                </label>

                {formData.evidencia && (
                    <img
                    src={URL.createObjectURL(formData.evidencia)}
                    alt="Vista previa"
                    className="mt-2 h-32 w-auto rounded border border-gray-300 object-contain"
                    />
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
                    razon: "",
                    agenteAcusado: "",
                    fecha: "",
                    descripcion: "",
                    evidencia: null
                    });
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
          onClose={() => {
            setModalVisible(false);
            onClose();
          }}
          message="¡Reporte creado exitosamente!"
        />
      </div>
    </>
  );
}

export default CreateReport;
