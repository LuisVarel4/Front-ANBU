import React, { useState } from "react";
import maskAnbu from "../../assets/ilustrations/Mascara_png-removebg-preview.png";
import Button from "../../components/ui/button/Button";
import Popup from "../../components/Popup";

interface CreateAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function CreateAgentModal({ isOpen, onClose }: CreateAgentModalProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    alias: "",
    correo: "",
    password: "",
    especialidad: "",
  });
  const [errores, setErrores] = useState<{ [key: string]: string }>({});
  const [modalVisible, setModalVisible] = useState(false);

  const manejarCambio = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrores({ ...errores, [e.target.name]: "" });
  };

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevosErrores: { [key: string]: string } = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (!value) nuevosErrores[key] = "Este campo es obligatorio";
    });

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
      setModalVisible(true);
      setFormData({
        nombre: "",
        alias: "",
        correo: "",
        password: "",
        especialidad: "",
      });
    }
  };

  if (!isOpen) return null;

  type Campo = keyof typeof formData;

  return (
    <>
      {/* Contenido del modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto p-4">
        <div className="bg-grayBlue-anbu w-full max-w-3xl rounded-xl shadow-md">
          <form
            onSubmit={manejarEnvio}
            className="grid gap-6 p-6 md:grid-cols-2"
          >
            <div className="flex items-center justify-center">
              <img src={maskAnbu} alt="ANBU Mask" className="w-74" />
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
                Crear Agente
              </Button>
            </div>
          </form>
        </div>

        <Popup
          isOpen={modalVisible}
          onClose={() => setModalVisible(false)}
          onConfirm={() => {
            setModalVisible(false);
            setFormData({
              nombre: "",
              alias: "",
              correo: "",
              password: "",
              especialidad: "",
            });
            onClose();
          }}
          message="¡Agente creado exitosamente!"
        />
      </div>
    </>
  );
}

export default CreateAgentModal;
