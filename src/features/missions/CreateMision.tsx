import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui";
import { useNavigate } from "react-router-dom";
import Popup from "../../components/Popup";
import { MissionPriorityValues } from "../../Enums/MissionEnum";
import { userService } from "../../services/user/user.service";
import { missionService } from "../../services/mission/mission.service";
import type { APIUser } from "../../services/user/user.service";
import type { CreateMissionRequest } from "../../services/mission/mission.service";

const CreateMissionForm: React.FC = () => {
  const navigate = useNavigate();
  const [alias, setAlias] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [capitan, setCapitan] = useState("");
  const [prioridad, setPrioridad] = useState("");
  const [fechaLimite, setFechaLimite] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  
  const [users, setUsers] = useState<APIUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoadingUsers(true);
        const userData = await userService.getUsers();
        // Filter users by role if needed (e.g., only captains or exclude certain roles)
        const eligibleCaptains = userData.filter(user => 
          user.role === 'agente' // Adjust roles as needed
        );
        setUsers(eligibleCaptains);
      } catch (error) {
        console.error('Error fetching users:', error);
        setUsers([]);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async () => {
    setError("");

    // Validation
    if (!alias.trim()) {
      setError("El alias es requerido");
      return;
    }
    if (!objetivo.trim()) {
      setError("El objetivo es requerido");
      return;
    }
    if (!descripcion.trim()) {
      setError("La descripción es requerida");
      return;
    }
    if (!capitan) {
      setError("Debe seleccionar un capitán");
      return;
    }
    if (!prioridad) {
      setError("Debe seleccionar una prioridad");
      return;
    }
    if (!fechaLimite) {
      setError("La fecha límite es requerida");
      return;
    }

    try {
      setCreating(true);

      // Format the deadline to ISO string
      const deadlineISO = new Date(fechaLimite + 'T23:59:00.000Z').toISOString();

      const missionData: CreateMissionRequest = {
        codeName: alias,
        objective: objetivo,
        description: descripcion,
        captain_id: capitan,
        priority: prioridad,
        deadline: deadlineISO,
        status: "en proceso",
        assignedAgents: [] // Empty for now, you can add agent selection later
      };

      await missionService.createMission(missionData);
      setPopupOpen(true);

    } catch (error) {
      console.error('Error creating mission:', error);
      setError("Error al crear la misión. Por favor, intenta de nuevo.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="bg-black-anbu min-h-screen text-white">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <h2 className="text-red-anbu mb-6 text-2xl font-bold">Crear Misión</h2>

        {error && (
          <div className="mb-4 p-4 bg-red-500 text-white rounded-md">
            {error}
          </div>
        )}

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
                placeholder="Ej: MISION-ALFA-2025"
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">Objetivo</label>
              <input
                type="text"
                value={objetivo}
                onChange={(e) => setObjetivo(e.target.value)}
                className="w-full rounded-md bg-gray-300 px-4 py-2 text-black"
                placeholder="Descripción del objetivo principal"
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">Descripción</label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="h-28 w-full resize-none rounded-md bg-gray-300 px-4 py-2 text-black"
                placeholder="Descripción detallada de la misión"
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
                disabled={loadingUsers}
              >
                <option value="">
                  {loadingUsers ? "Cargando capitanes..." : "Selecciona un capitán"}
                </option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.alias} - {user.fullName}
                  </option>
                ))}
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
                min={new Date().toISOString().split('T')[0]} // Prevent past dates
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
            disabled={creating}
          >
            Volver
          </Button>

          <Button
            type="button"
            color="bg-red-anbu hover:bg-yellow-anbu"
            textColor="text-white hover:text-black"
            onClick={handleSubmit}
            disabled={creating}
          >
            {creating ? "Creando..." : "Crear Misión"}
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
