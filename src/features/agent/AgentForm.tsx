import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import maskAnbu from "../../assets/ilustrations/Mascara_png-removebg-preview.png";
import Popup from "../../components/Popup";
import { Button } from "../../components/ui";

const AgentForm: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    alias: "",
    correo: "",
    password: "",
    especialidad: "",
    rol: "",
  });

  const navigate = useNavigate();
  const [errores, setErrores] = useState<{ [key: string]: string }>({});
  const [modalVisible, setModalVisible] = useState(false);
  const especialidades = ["Asesino", "Torturador", "Espía"];
  const roles = ["Kage", "Capitan", "Agente"];

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
      // Mostrar éxito y limpiar formulario
      setModalVisible(true);
      setFormData({
        nombre: "",
        alias: "",
        correo: "",
        password: "",
        especialidad: "",
        rol: "",
      });
    }
  };

  return (
    <div className="h-full">
      <div className="bg-black-anbu flex min-h-screen flex-col items-center p-4 text-white">
        <div className="bg-grayBlue-anbu w-full max-w-3xl rounded-xl shadow-md">
          <form
            onSubmit={manejarEnvio}
            className="grid gap-6 p-6 md:grid-cols-2"
          >
            <div className="flex items-center justify-center">
              <img src={maskAnbu} alt="ANBU Mask" className="h-60 w-60" />
            </div>

            <div className="flex flex-col gap-4">
              {/* Campos */}
              {["nombre", "alias", "correo", "password"].map((campo) => (
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
                    value={(formData as any)[campo]}
                    onChange={manejarCambio}
                    className="text-black-anbu w-full rounded bg-gray-100 px-3 py-2"
                  />
                  {errores[campo] && (
                    <p className="text-sm text-red-400">{errores[campo]}</p>
                  )}
                </div>
              ))}

              <div>
                <label className="mb-1 block">Especialidad</label>
                <select
                  name="especialidad"
                  value={formData.especialidad}
                  onChange={manejarCambio}
                  className="text-black-anbu w-full rounded bg-gray-100 px-3 py-2"
                >
                  <option value="">Selecciona una opción</option>
                  {especialidades.map((esp) => (
                    <option key={esp} value={esp}>
                      {esp}
                    </option>
                  ))}
                </select>
                {errores.especialidad && (
                  <p className="text-sm text-red-400">{errores.especialidad}</p>
                )}
              </div>

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
                onClick={() => navigate("/agent-list")}
                type="button"
                color="bg-red-anbu"
                className="hover:bg-gray2-anbu"
              >
                Volver
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
          onClose={() => setModalVisible(false)}
          message="¡Agente guardado exitosamente!"
        />
      </div>
    </div>
  );
};

export default AgentForm;
