import { useState } from "react";
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

  const especialidades = ["Asesino", "Torturador", "Espía"];

  const manejarCambio = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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

  return (
    <>
      {/* Contenido del modal */}
      <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-3xl bg-grayBlue-anbu p-6 rounded-xl shadow-lg">
        <form onSubmit={manejarEnvio} className="grid md:grid-cols-2 gap-6">
          <div className="flex justify-center items-center">
            <img src={maskAnbu} alt="ANBU Mask" className="w-74 h-74" />
          </div>

          <div className="flex flex-col gap-4">
            {["nombre", "alias", "correo", "password"].map((campo) => (
              <div key={campo}>
                <label className="block mb-1 capitalize">{campo}</label>
                <input
                  name={campo}
                  type={
                    campo === "correo"
                      ? "email"
                      : campo === "password"
                      ? "password"
                      : "text"
                  }
                  value={(formData as any)[campo]}
                  onChange={manejarCambio}
                  className="w-full px-3 py-2 rounded bg-gray-100 text-black-anbu"
                />
                {errores[campo] && (
                  <p className="text-red-400 text-sm">{errores[campo]}</p>
                )}
              </div>
            ))}

            <div>
              <label className="block mb-1">Especialidad</label>
              <select
                name="especialidad"
                value={formData.especialidad}
                onChange={manejarCambio}
                className="w-full px-3 py-2 rounded bg-gray-100 text-black-anbu"
              >
                <option value="">Selecciona una opción</option>
                {especialidades.map((esp) => (
                  <option key={esp} value={esp}>
                    {esp}
                  </option>
                ))}
              </select>
              {errores.especialidad && (
                <p className="text-red-400 text-sm">{errores.especialidad}</p>
              )}
            </div>
          </div>

          <div className="col-span-2 flex justify-center gap-4 mt-4">
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

        <Popup
          isOpen={modalVisible}
          onClose={() => setModalVisible(false)}
          message="¡Creación exitosa!"
        />
      </div>
    </>
  );
}

export default CreateAgentModal;
