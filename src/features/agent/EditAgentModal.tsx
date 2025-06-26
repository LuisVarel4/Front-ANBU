// src/features/agent/EditAgentModal.tsx
import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui";
import maskAnbu from "../../assets/ilustrations/Mascara_png-removebg-preview.png";
import Popup from "../../components/Popup";

interface EditAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  agent: {
    id: number;
    nombre: string;
    alias: string;
    correo: string;
    especialidad: string;
    rol: string;
  } | null;
  onSave: (updatedAgent: any) => void;
}

const EditAgentModal: React.FC<EditAgentModalProps> = ({
  isOpen,
  onClose,
  agent,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    nombre: "",
    alias: "",
    correo: "",
    password: "",
    especialidad: "",
    rol: "",
  });

  const [errores, setErrores] = useState<{ [key: string]: string }>({});
  const [modalVisible, setModalVisible] = useState(false);

  const roles = ["Kage", "Agente"];

  useEffect(() => {
    if (agent) {
      setFormData({
        nombre: agent.nombre,
        alias: agent.alias,
        correo: agent.correo,
        password: "",
        especialidad: agent.especialidad,
        rol: agent.rol,
      });
    }
  }, [agent]);

  const manejarCambio = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: "" });
  };

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault();

    const nuevosErrores: { [key: string]: string } = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value && key !== "password")
        nuevosErrores[key] = "Este campo es obligatorio";
    });

    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length === 0 && agent) {
      onSave({ ...agent, ...formData });
      setModalVisible(true);
    }
  };

  if (!isOpen || !agent) return null;

  type Campo = keyof typeof formData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto p-4">
      <div className="bg-grayBlue-anbu w-full max-w-3xl rounded-xl shadow-md">
        <form onSubmit={manejarEnvio} className="grid gap-6 p-6 md:grid-cols-2">
          <div className="flex items-center justify-center">
            <img src={maskAnbu} alt="ANBU Mask" className="w-60" />
          </div>

          <div className="flex flex-col gap-4">
            {(["nombre", "alias", "correo", "password"] as Campo[]).map(
              (campo) => (
                <div key={campo}>
                  <label className="mb-1 block capitalize">{campo}</label>
                  <input
                    name={campo}
                    type={
                      campo === "correo"
                        ? "email"
                        : campo === "password"
                          ? "password"
                          : "text"
                    }
                    value={formData[campo]}
                    onChange={manejarCambio}
                    className="text-black-anbu w-full rounded bg-gray-100 px-3 py-2"
                  />
                  {errores[campo] && (
                    <p className="text-sm text-red-400">{errores[campo]}</p>
                  )}
                </div>
              ),
            )}

            <div>
              <label className="mb-1 block">Rol</label>
              <select
                name="rol"
                value={formData.rol}
                onChange={manejarCambio}
                className="text-black-anbu w-full rounded bg-gray-100 px-3 py-2"
              >
                <option value="">Selecciona un rol</option>
                {roles.map((rol) => (
                  <option key={rol} value={rol}>
                    {rol}
                  </option>
                ))}
              </select>
              {errores.rol && (
                <p className="text-sm text-red-400">{errores.rol}</p>
              )}
            </div>
          </div>

          <div className="col-span-2 mt-4 flex justify-center gap-4">
            <Button
              onClick={onClose}
              type="button"
              color="bg-red-anbu"
              className="hover:bg-gray2-anbu"
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              color="bg-red-anbu"
              className="hover:bg-green-anbu"
            >
              Guardar
            </Button>
          </div>
        </form>
      </div>

      <Popup
        isOpen={modalVisible}
        onClose={() => {
          setModalVisible(false);
          onClose();
        }}
        message="¡Cambios guardados!"
      />
    </div>
  );
};

export default EditAgentModal;
