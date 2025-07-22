import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui";
import { useNavigate, useLocation } from "react-router-dom";
import { MissionStatusValues, MissionPriorityValues } from "../../Enums/MissionEnum";
import { missionService } from "../../services/mission/mission.service";
import { userService } from "../../services/user/user.service";
import type { APIMission, UpdateMissionRequest } from "../../services/mission/mission.service";
import type { APIUser } from "../../services/user/user.service";

const EditMissionForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const passedData = location.state;
  const missionId = passedData?.id;
  const editPermission = passedData?.editPermission || "read";
  
  // Form state
  const [missionData, setMissionData] = useState<APIMission | null>(null);
  const [formData, setFormData] = useState({
    codeName: "",
    objective: "",
    description: "",
    captain_id: "",
    deadline: "",
    priority: "",
    status: "",
    assignedAgents: [] as string[]
  });
  
  const [users, setUsers] = useState<APIUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const canEditAll = editPermission === "full"; // kage
  const canEditStatus = editPermission === "status"; // captain
  const isReadOnly = editPermission === "read"; // team member

  // Load mission data and users
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        if (!missionId) {
          setError("ID de misión no encontrado");
          return;
        }

        // Load mission data and users in parallel
        const [mission, usersData] = await Promise.all([
          missionService.getMissionById(missionId),
          userService.getUsers()
        ]);

        setMissionData(mission);
        setUsers(usersData);
        
        // Set form data
        setFormData({
          codeName: mission.codeName,
          objective: mission.objective,
          description: mission.description,
          captain_id: mission.captain.id,
          deadline: mission.deadline.split('T')[0], // Convert to date input format
          priority: mission.priority,
          status: mission.status,
          assignedAgents: mission.participations.map(p => p.user_id)
        });

      } catch (err) {
        console.error("Error loading mission data:", err);
        setError("Error al cargar los datos de la misión");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [missionId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    if (isReadOnly || !missionData) return;
    
    try {
      setSaving(true);
      setError("");

      // Prepare update data based on permissions
      let updateData: UpdateMissionRequest;

      if (canEditAll) {
        // Kage can edit everything
        updateData = {
          codeName: formData.codeName,
          objective: formData.objective,
          description: formData.description,
          captain_id: formData.captain_id,
          deadline: new Date(formData.deadline + 'T23:59:00.000Z').toISOString(),
          priority: formData.priority,
          status: formData.status,
        };
      } else {
        // Captain can only edit status
        updateData = {
          codeName: missionData.codeName,
          objective: missionData.objective,
          description: missionData.description,
          captain_id: missionData.captain.id,
          deadline: missionData.deadline,
          priority: missionData.priority,
          status: formData.status,
        };
      }

      await missionService.updateMission(missionData.id, updateData);
      
      navigate("/mision", { 
        state: { 
          message: "Misión actualizada exitosamente" 
        } 
      });

    } catch (error) {
      console.error("Error updating mission:", error);
      setError("Error al actualizar la misión. Intenta de nuevo.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-black-anbu min-h-screen text-white flex items-center justify-center">
        <p>Cargando datos de la misión...</p>
      </div>
    );
  }

  if (error || !missionData) {
    return (
      <div className="bg-black-anbu min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || "Error al cargar la misión"}</p>
          <Button
            onClick={() => navigate(-1)}
            color="bg-red-anbu"
            textColor="text-white"
          >
            Volver
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black-anbu min-h-screen text-white">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-red-anbu text-2xl font-bold">
            {canEditAll ? "Editar Misión" : canEditStatus ? "Actualizar Estado" : "Detalles de Misión"}
          </h2>
          
          {/* Role indicator */}
          <span className={`px-3 py-1 rounded text-sm ${
            canEditAll ? "bg-yellow-anbu text-black" : 
            canEditStatus ? "bg-green-anbu text-white" : 
            "bg-gray-500 text-white"
          }`}>
            {canEditAll ? "Kage - Control Total" : 
             canEditStatus ? "Capitán - Editar Estado" : 
             "Agente - Solo Lectura"}
          </span>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-500 text-white rounded-md">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="mb-1 block font-medium">Nombre en Código</label>
              <input
                type="text"
                name="codeName"
                value={formData.codeName}
                onChange={handleInputChange}
                disabled={!canEditAll}
                className={`w-full rounded-md px-4 py-2 text-black ${
                  canEditAll ? "bg-white" : "bg-gray-300"
                }`}
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">Objetivo</label>
              <input
                type="text"
                name="objective"
                value={formData.objective}
                onChange={handleInputChange}
                disabled={!canEditAll}
                className={`w-full rounded-md px-4 py-2 text-black ${
                  canEditAll ? "bg-white" : "bg-gray-300"
                }`}
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">Descripción</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                disabled={!canEditAll}
                className={`h-28 w-full resize-none rounded-md px-4 py-2 text-black ${
                  canEditAll ? "bg-white" : "bg-gray-300"
                }`}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="mb-1 block font-medium">Capitán designado</label>
              {canEditAll ? (
                <select
                  name="captain_id"
                  value={formData.captain_id}
                  onChange={handleInputChange}
                  className="w-full rounded-md bg-white px-4 py-2 text-black"
                >
                  <option value="">Selecciona un capitán</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.alias} - {user.fullName}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={missionData.captain.alias}
                  disabled
                  className="w-full rounded-md bg-gray-300 px-4 py-2 text-black"
                />
              )}
            </div>

            <div>
              <label className="mb-1 block font-medium">Nivel de Prioridad</label>
              {canEditAll ? (
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full rounded-md bg-white px-4 py-2 text-black"
                >
                  <option value="">Selecciona prioridad</option>
                  <option value={MissionPriorityValues.Baja}>{MissionPriorityValues.Baja}</option>
                  <option value={MissionPriorityValues.Media}>{MissionPriorityValues.Media}</option>
                  <option value={MissionPriorityValues.Alta}>{MissionPriorityValues.Alta}</option>
                  <option value={MissionPriorityValues.Critica}>{MissionPriorityValues.Critica}</option>
                </select>
              ) : (
                <input
                  type="text"
                  value={formData.priority}
                  disabled
                  className="w-full rounded-md bg-gray-300 px-4 py-2 text-black"
                />
              )}
            </div>

            <div>
              <label className="mb-1 block font-medium">Fecha Límite</label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
                disabled={!canEditAll}
                className={`w-full rounded-md px-4 py-2 text-black ${
                  canEditAll ? "bg-white" : "bg-gray-300"
                }`}
              />
            </div>

            {/* Estado - Editable por Kage y Capitán */}
            <div>
              <label className="mb-1 block font-medium">Estado de la Misión</label>
              {canEditAll || canEditStatus ? (
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full rounded-md bg-white px-4 py-2 text-black"
                >
                  <option value={MissionStatusValues.EnProceso}>En Proceso</option>
                  <option value={MissionStatusValues.Retraso}>Retraso</option>
                  <option value={MissionStatusValues.Fracaso}>Fracaso</option>
                  <option value={MissionStatusValues.Completada}>Completada</option>
                </select>
              ) : (
                <input
                  type="text"
                  value={formData.status}
                  disabled
                  className="w-full rounded-md bg-gray-300 px-4 py-2 text-black"
                />
              )}
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

          <div className="flex gap-4">
            {(canEditAll || canEditStatus) && (
              <Button
                type="button"
                color="bg-red-anbu hover:bg-yellow-anbu"
                textColor="text-white hover:text-black"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Guardando..." : "Guardar Cambios"}
              </Button>
            )}

            <Button
              type="button"
              color="bg-red-anbu hover:bg-yellow-anbu"
              textColor="text-white hover:text-black"
              onClick={() => navigate("/agent-mision-list", {
                state: {
                  missionId: missionData?.id // Make sure to use the correct mission ID
                }
              })}
            >
              Ver Agentes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMissionForm;
