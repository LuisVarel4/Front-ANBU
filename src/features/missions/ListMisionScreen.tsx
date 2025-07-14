import React, { useEffect, useState } from "react";
import { Button, ScrollArea } from "../../components/ui";
import ItemMisionList from "../../components/mission/ItemMisionList";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/auth/context.ts";
import { missionService } from "../../services/mission/mission.service";
import type { APIMission } from "../../services/mission/mission.service";

const MisionLisScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthContext();
  const [missions, setMissions] = useState<APIMission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        setLoading(true);
        setError(""); // Clear previous errors

        if (!user?.id) {
          setError("Usuario no autenticado");
          return;
        }

        let data: APIMission[];

        // If user is Kage, show all missions
        if (user.role === "kage") {
          console.log("Fetching all missions for Kage user");
          data = await missionService.getRegularMissions();
        }
        // If user is Agent or Captain, show only their missions
        else {
          console.log("Fetching missions for agent/captain:", user.id);
          data = await missionService.getMissionsByAgent(user.id);
        }

        console.log("Missions loaded:", data);
        setMissions(data);
      } catch (err: any) {
        console.error("Error loading missions:", err);

        // More specific error handling
        if (err.response?.status === 403) {
          setError("No tienes permisos para ver estas misiones");
        } else if (err.response?.status === 404) {
          setError("No se encontraron misiones");
        } else {
          setError("Error al cargar las misiones");
        }
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated && user) {
      fetchMissions();
    } else {
      setLoading(false);
      setError("Usuario no autenticado");
    }
  }, [user, isAuthenticated]);

  // Transform API data to match ItemMisionList props
  const transformMissionData = (mission: APIMission) => {
    const isKage = user?.role === "kage";
    const isCaptain = user?.id === mission.captain.id;
    const isTeamMember = mission.participations.some(
      (p) => p.user_id === user?.id
    );

    return {
      id: mission.id,
      captain: mission.captain.alias,
      objective: mission.objective,
      deadline: new Date(mission.deadline).toLocaleDateString(),
      level: mission.priority,
      status: mission.status,
      isOwner: isCaptain,
      canEdit: isKage || isCaptain || isTeamMember,
      editPermission:
        isKage ? "full" : isCaptain ? "status" : "read" as "full" | "status" | "read",
    };
  };

  if (loading) {
    return (
      <div className="bg-black-anbu min-h-full text-white flex items-center justify-center">
        <p>Cargando misiones...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black-anbu min-h-full text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
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
    <div className="bg-black-anbu min-h-full text-white">
      <div className="py-6 text-center">
        <h2 className="text-red-anbu text-2xl font-bold">
          Listado de misiones
        </h2>
        <p className="text-gray-300 mt-2">
          {user?.role === "kage"
            ? `Mostrando todas las misiones (${missions.length})`
            : `Mostrando tus misiones (${missions.length})`}
        </p>
        {/* Role indicator */}
        <span
          className={`inline-block mt-2 px-3 py-1 rounded text-sm ${
            user?.role === "kage"
              ? "bg-yellow-anbu text-black"
              : "bg-green-anbu text-black"
          }`}
        >
          {user?.role === "kage"
            ? "Kage - Todas las Misiones"
            : "Agente/Capitán - Mis Misiones"}
        </span>
      </div>

      <div className="px-6">
        <div className="rounded-md bg-gray-800 p-4">
          <div className="w-full overflow-x-auto">
            <ScrollArea className="max-h-[50vh] flex-1">
              <table className="bg-grayBlue-anbu w-full rounded text-sm">
                <thead className="sticky top-0 z-10 bg-gray-300 text-black">
                  <tr className="text-left">
                    <th className="min-w-[100px] px-4 py-2 whitespace-nowrap">
                      Capitán
                    </th>
                    <th className="min-w-[200px] px-4 py-2 whitespace-normal">
                      Objetivo
                    </th>
                    <th className="min-w-[110px] px-4 py-2 whitespace-nowrap">
                      Fecha Límite
                    </th>
                    <th className="min-w-[100px] px-4 py-2 whitespace-nowrap">
                      Prioridad
                    </th>
                    <th className="min-w-[100px] px-4 py-2 whitespace-nowrap">
                      Estado
                    </th>
                    <th className="min-w-[80px] px-4 py-2 whitespace-nowrap">
                      Acciones
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y-4 divide-gray-700 text-center">
                  {missions.length > 0 ? (
                    missions.map((mission) => (
                      <ItemMisionList
                        key={mission.id}
                        {...transformMissionData(mission)}
                      />
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-8 text-center text-gray-400"
                      >
                        {user?.role === "kage"
                          ? "No hay misiones creadas en el sistema"
                          : "No tienes misiones asignadas"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </ScrollArea>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <Button
            type="submit"
            color="bg-red-anbu hover:bg-yellow-anbu"
            textColor="text-white hover:text-black"
            onClick={() => navigate(-1)}
            className="px-6 py-2"
          >
            Volver
          </Button>

          {/* Show Create Mission button only for kage */}
          {user?.role === "kage" && (
            <Button
              type="submit"
              color="bg-red-anbu hover:bg-yellow-anbu"
              textColor="text-white hover:text-black"
              className="px-6 py-2"
              onClick={() => navigate("/mision-create")}
            >
              Crear Misión
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MisionLisScreen;
