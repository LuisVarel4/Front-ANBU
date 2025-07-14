import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui";
import { useNavigate, useLocation } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import ItemAgentMisionList from "../../components/mission/ItemAgentMisionList";
import { useAuthContext } from "../../context/auth/context.ts";
import { missionService } from "../../services/mission/mission.service";
import type { APIMission } from "../../services/mission/mission.service";

const ListAgentMisionScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthContext();
  
  const [mission, setMission] = useState<APIMission | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get mission ID from location state or params
  const missionId = location.state?.missionId;

  console.log('Mission ID from location:', missionId); // Debug log
  console.log('Location state:', location.state); // Debug log

  // Check user permissions
  const isKage = user?.role === "kage";
  const isCaptain = mission?.captain?.id === user?.id;
  const canAddAgents = isKage || isCaptain;

  useEffect(() => {
    const loadMissionData = async () => {
      try {
        setLoading(true);
        setError(""); // Clear previous errors
        
        console.log('Loading mission with ID:', missionId); // Debug log
        
        if (!missionId) {
          setError("ID de misión no encontrado en la navegación");
          return;
        }

        const missionData = await missionService.getMissionById(missionId);
        console.log('Mission data loaded:', missionData); // Debug log
        setMission(missionData);

      } catch (err: any) {
        console.error("Error loading mission data:", err);
        if (err.response?.status === 404) {
          setError("Misión no encontrada");
        } else if (err.response?.status === 403) {
          setError("No tienes permisos para ver esta misión");
        } else {
          setError("Error al cargar los datos de la misión");
        }
      } finally {
        setLoading(false);
      }
    };

    if (missionId) {
      loadMissionData();
    } else {
      setLoading(false);
      setError("ID de misión no proporcionado");
    }
  }, [missionId]);

  const handleAddAgent = () => {
    navigate("/agent-request", {
      state: {
        missionId: mission?.id,
        missionName: mission?.codeName
      }
    });
  };

  if (loading) {
    return (
      <div className="bg-black-anbu min-h-screen text-white flex items-center justify-center">
        <p>Cargando agentes de la misión...</p>
      </div>
    );
  }

  if (error || !mission) {
    return (
      <div className="bg-black-anbu min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || "Error al cargar la misión"}</p>
          <div className="space-y-2">
            <p className="text-gray-400 text-sm">Debug info:</p>
            <p className="text-gray-400 text-xs">Mission ID: {missionId || 'undefined'}</p>
            <p className="text-gray-400 text-xs">Location state: {JSON.stringify(location.state)}</p>
          </div>
          <Button
            onClick={() => navigate(-1)}
            color="bg-red-anbu"
            textColor="text-white"
            className="mt-4"
          >
            Volver
          </Button>
        </div>
      </div>
    );
  }

  // Safely get participants
  const participants = mission.participations || [];
  const totalAgents = participants.length + 1; // +1 for captain

  return (
    <div className="bg-black-anbu min-h-screen text-white">
      <div className="py-6 text-center">
        <h2 className="text-red-anbu text-2xl font-bold">
          Agentes de la Misión: {mission.codeName}
        </h2>
        <p className="text-gray-300 mt-2">
          Capitán: {mission.captain?.alias || 'N/A'} | Total de miembros: {totalAgents}
        </p>
      </div>

      <div className="px-6">
        <div className="bg-grayBlue-anbu overflow-x-auto rounded-md p-4">
          <table className="w-full rounded-md text-sm">
            <thead className="bg-gray3-anbu text-black">
              <tr>
                <th className="px-4 py-2 text-left">
                  <div className="flex items-center gap-2">
                    <FaFilter /> <span>Alias</span>
                  </div>
                </th>
                <th className="px-4 py-2 text-left">
                  <div className="flex items-center gap-2">
                    <FaFilter /> <span>Nombre Completo</span>
                  </div>
                </th>
                <th className="px-4 py-2 text-left">
                  <div className="flex items-center gap-2">
                    <FaFilter /> <span>Correo</span>
                  </div>
                </th>
                <th className="px-4 py-2 text-left">
                  <div className="flex items-center gap-2">
                    <FaFilter /> <span>Rol</span>
                  </div>
                </th>
                <th className="px-4 py-2 text-left">Chat</th>
              </tr>
            </thead>
            <tbody>
              {/* Show Captain first - with null checks */}
              {mission.captain && (
                <ItemAgentMisionList
                  key={`captain-${mission.captain.id}`}
                  id={mission.captain.id}
                  alias={mission.captain.alias}
                  fullName={mission.captain.fullName}
                  email={mission.captain.email}
                  role="Capitán"
                  isCaptain={true}
                  canRemove={false}
                  onRemove={() => {}}
                />
              )}
              
              {/* Show Participants - with null checks */}
              {participants.map((participation) => (
                <ItemAgentMisionList
                  key={participation.id}
                  id={participation.user?.id || participation.user_id}
                  alias={participation.user?.alias || 'N/A'}
                  fullName={participation.user?.fullName || 'N/A'}
                  email={participation.user?.email || 'N/A'}
                  role={participation.user?.role || 'agente'}
                  isCaptain={false}
                  canRemove={canAddAgents}
                  onRemove={(agentId) => {
                    // TODO: Implement remove agent functionality
                    console.log('Remove agent:', agentId);
                  }}
                />
              ))}
            </tbody>
          </table>

          {participants.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <p>No hay agentes asignados a esta misión.</p>
              <p className="text-sm mt-1">Solo el capitán está asignado.</p>
              {canAddAgents && (
                <p className="text-sm mt-2">
                  Usa el botón "Agregar" para asignar agentes.
                </p>
              )}
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-6 md:justify-between">
          <Button
            type="button"
            color="bg-red-anbu hover:bg-yellow-anbu"
            textColor="text-white hover:text-black"
            onClick={() => navigate(-1)}
            className="w-32"
          >
            Volver
          </Button>
          
          {/* Show Agregar button only for Kage or Captain */}
          {canAddAgents && (
            <Button
              type="button"
              color="bg-red-anbu hover:bg-yellow-anbu"
              textColor="text-white hover:text-black"
              onClick={handleAddAgent}
              className="w-32"
            >
              Agregar
            </Button>
          )}

          <Button
            type="button"
            color="bg-red-anbu hover:bg-yellow-anbu"
            textColor="text-white hover:text-black"
            onClick={() => navigate("/homepage")}
            className="w-32"
          >
            Inicio
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ListAgentMisionScreen;
