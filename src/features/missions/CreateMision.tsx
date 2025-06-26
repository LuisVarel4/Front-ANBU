import React, { useState } from "react";
import EstadoDropdown from "../../components/mission/DropdownState";
import { Button } from "../../components/ui";
import { useNavigate } from "react-router-dom";
import Popup from "../../components/Popup";
import { MissionPriorityValues } from "../../Enums/MissionEnum"; // Importa el enum

const CreateMissionForm: React.FC = () => {
  const navigate = useNavigate();
  const [alias, setAlias] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [capitan, setCapitan] = useState("");
  const [prioridad, setPrioridad] = useState("");
  const [fechaLimite, setFechaLimite] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);

  const handleSubmit = () => {
    setPopupOpen(true);
  };

  return (
    <div className="bg-black-anbu min-h-screen text-white">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <h2 className="text-red-anbu mb-6 text-2xl font-bold">Crear Misión</h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="mb-1 block font-medium">Alias</label>
              <input
                type="text"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                className="w-full rounded-md bg-gray-300 px-4 py-2 text-black"
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">Objetivo</label>
              <input
                type="text"
                value={objetivo}
                onChange={(e) => setObjetivo(e.target.value)}
                className="w-full rounded-md bg-gray-300 px-4 py-2 text-black"
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">Descripción</label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="h-28 w-full resize-none rounded-md bg-gray-300 px-4 py-2 text-black"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="mb-1 block font-medium">Capitán designado</label>
              <select
                value={capitan}
                onChange={(e) => setCapitan(e.target.value)}
                className="w-full rounded-md bg-gray-300 px-4 py-2 text-black"
              >
                <option value="">Selecciona un capitán</option>
                <option value="Kakashi Hatake">Kakashi Hatake</option>
                <option value="Yamato">Yamato</option>
                <option value="Itachi Uchiha">Itachi Uchiha</option>
                <option value="Shikamaru Nara">Shikamaru Nara</option>
                <option value="Minato Namikaze">Minato Namikaze</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block font-medium">Nivel de Prioridad</label>
              <select
                value={prioridad}
                onChange={(e) => setPrioridad(e.target.value)}
                className="w-full rounded-md bg-gray-300 px-4 py-2 text-black"
              >
                <option value="">Selecciona prioridad</option>
                <option value={MissionPriorityValues.Baja}>{MissionPriorityValues.Baja}</option>
                <option value={MissionPriorityValues.Media}>{MissionPriorityValues.Media}</option>
                <option value={MissionPriorityValues.Alta}>{MissionPriorityValues.Alta}</option>
                <option value={MissionPriorityValues.Critica}>{MissionPriorityValues.Critica}</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block font-medium">Fecha Límite</label>
              <input
                type="date"
                value={fechaLimite}
                onChange={(e) => setFechaLimite(e.target.value)}
                className="w-full rounded-md bg-gray-300 px-4 py-2 text-black"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 md:flex-row">
          <Button
            type="button"
            color="bg-red-anbu hover:bg-yellow-anbu"
            textColor="text-white hover:text-black"
            onClick={() => navigate(-1)}
          >
            Volver
          </Button>

          <Button
            type="button"
            color="bg-red-anbu hover:bg-yellow-anbu"
            textColor="text-white hover:text-black"
            onClick={handleSubmit}
          >
            Crear Misión
          </Button>
        </div>

        <Popup
          isOpen={popupOpen}
          onClose={() => {
            setPopupOpen(false);
            navigate(-1);
          }}
          message="¡Misión creada exitosamente!"
        />
      </div>
    </div>
  );
};

export default CreateMissionForm;
