import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import maskAnbu from '../../assets/ilustrations/Mascara_png-removebg-preview.png';
import Popup from '../../components/Popup';
import Button from '../../components/Button';
import Header from '../../components/mission/Header';

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
  

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    <div className="min-h-screen bg-black-anbu text-white flex flex-col items-center p-4">
      <div className="w-full max-w-3xl bg-grayBlue-anbu rounded-xl shadow-md">
        <Header />

        <form onSubmit={manejarEnvio} className="p-6 grid md:grid-cols-2 gap-6">
          <div className="flex justify-center items-center">
            <img src={maskAnbu} alt="ANBU Mask" className="w-60 h-60" />
          </div>

          <div className="flex flex-col gap-4">
            {/* Campos */}
            {["nombre", "alias", "correo", "password"].map((campo) => (
              <div key={campo}>
                <label className="block mb-1 capitalize">{campo}</label>
                <input
                  name={campo}
                  type={campo === "correo" ? "email" : campo === "password" ? "password" : "text"}
                  value={(formData as any)[campo]}
                  onChange={manejarCambio}
                  className="w-full px-3 py-2 rounded bg-gray-100 text-black-anbu"
                />
                {errores[campo] && <p className="text-red-400 text-sm">{errores[campo]}</p>}
              </div>
            ))}

            <div>
              <label className="block mb-1">Especialidad</label>
              <select
                name="especialidad"
                value={formData.especialidad}
                onChange={manejarCambio}
                className="w-full px-3 py-2 rounded bg-gray-100 text-black-anbu">
                <option value="">Selecciona una opción</option>
                {especialidades.map((esp) => (
                  <option key={esp} value={esp}>{esp}</option>
                ))}
              </select>
              {errores.especialidad && <p className="text-red-400 text-sm">{errores.especialidad}</p>}
            </div>

            <div>
              <label className="block mb-1">Rol</label>
              <select
                name="rol"
                value={formData.rol}
                onChange={manejarCambio}
                className="w-full px-3 py-2 rounded bg-gray-100 text-black-anbu">
                <option value="">Selecciona un rol</option>
                {roles.map((rol) => (
                  <option key={rol} value={rol}>{rol}</option>
                ))}
              </select>
              {errores.rol && <p className="text-red-400 text-sm">{errores.rol}</p>}
            </div>
          </div>

          <div className="col-span-2 flex justify-center gap-4 mt-4">
            <Button
              onClick={() => navigate('/homepage')}
              type="button"
              color="bg-red-anbu"
              className="hover:bg-gray2-anbu">
              Volver
            </Button>

            <Button
              type="submit"
              color="bg-red-anbu"
              className="hover:bg-green-anbu">
              Guardar
            </Button>

            <Button
              type="button"
              color="bg-red-anbu"
              className="hover:bg-gray2-anbu">
              Eliminar
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
  );
};

export default AgentForm;
