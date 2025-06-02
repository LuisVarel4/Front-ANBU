import { useState } from "react";
import maskAnbu from '../assets/ilustrations/Mascara_png-removebg-preview.png'
import logoAnbu from '../assets/logos/imagen_2025-04-13_231517876-Photoroom.png'

function CreateAgent() {
  const [formData, setFormData] = useState({
    nombre: "",
    alias: "",
    correo: "",
    contraseña: "",
    especialidad: "",
  });

  const [errores, setErrores] = useState<{ [key: string]: string }>({});
  const [exito, setExito] = useState(false);

  const especialidades = ["Asesino", "Torturador", "Espía"];

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

    // Validar campos vacíos
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) nuevosErrores[key] = "Este campo es obligatorio";
    });

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
      setExito(true);
      // Limpia formulario
      setFormData({
        nombre: "",
        alias: "",
        correo: "",
        contraseña: "",
        especialidad: "",
      });
    } else {
      setExito(false);
    }
  };

  return (
    <div className="min-h-screen bg-black-anbu text-white flex flex-col items-center p-4">
      <div className="w-full max-w-3xl bg-grayBlue-anbu rounded-xl shadow-md">
        <div className="bg-red-anbu px-6 py-4 flex justify-between items-center rounded-t-xl">
          <h1 className="text-2xl font-bold">Kage</h1>
          <div className="flex items-end-safe gap-2">
            <span className="text-lg font-bold"> </span>
            
            <img src={logoAnbu} alt="Logo" className="w-14 h-14" />
            <img src={maskAnbu} alt="ANBU Mask" className="w-12 h-12" />
          
          </div>
        </div>

        <form onSubmit={manejarEnvio} className="p-6 grid md:grid-cols-2 gap-6">
          <div className="flex justify-center items-center">
            <img src={maskAnbu} alt="ANBU Mask" className="w-70 h-70" />
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block mb-1">Nombre completo</label>
              <input
                name="nombre"
                value={formData.nombre}
                onChange={manejarCambio}
                className="w-full px-3 py-2 rounded bg-gray-100 text-black-anbu"
              />
              {errores.nombre && <p className="text-red-400 text-sm">{errores.nombre}</p>}
            </div>

            <div>
              <label className="block mb-1">Alias</label>
              <input
                name="alias"
                value={formData.alias}
                onChange={manejarCambio}
                className="w-full px-3 py-2 rounded bg-gray-100 text-black-anbu"
              />
              {errores.alias && <p className="text-red-400 text-sm">{errores.alias}</p>}
            </div>

            <div>
              <label className="block mb-1">Correo</label>
              <input
                name="correo"
                type="email"
                value={formData.correo}
                onChange={manejarCambio}
                className="w-full px-3 py-2 rounded bg-gray-100 text-black-anbu"
              />
              {errores.correo && <p className="text-red-400 text-sm">{errores.correo}</p>}
            </div>

            <div>
              <label className="block mb-1">Contraseña</label>
              <input
                name="contraseña"
                type="password"
                value={formData.contraseña}
                onChange={manejarCambio}
                className="w-full px-3 py-2 rounded bg-gray-100 text-black-anbu"
              />
              {errores.contraseña && <p className="text-red-400 text-sm">{errores.contraseña}</p>}
            </div>

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
            <button type="button" className="bg-red-anbu px-6 py-2 rounded hover:bg-gray2-anbu">
              Volver
            </button>
            <button type="submit" className="bg-red-anbu px-6 py-2 rounded hover:bg-green-anbu">
              Guardar
            </button>
            <button type="button" className="bg-red-anbu px-6 py-2 rounded hover:bg-gray2-anbu">
              Eliminar
            </button>
          </div>

          {exito && (
            // completar 
            <div className="col-span-2 text-center text-green-400 font-semibold">
              ¡Agente creado con éxito!
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default CreateAgent;
