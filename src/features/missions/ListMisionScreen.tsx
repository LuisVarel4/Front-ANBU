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
        const data = await missionService.getRegularMissions();
        setMissions(data);
      } catch (err) {
        setError("Error al cargar las misiones");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMissions();
  }, []);

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
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-black-anbu min-h-full text-white">
      <div className="py-6 text-center">
        <h2 className="text-red-anbu text-2xl font-bold">
          Listado de misiones
        </h2>
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
                  {missions.map((mission) => (
                    <ItemMisionList
                      key={mission.id}
                      {...transformMissionData(mission)}
                    />
                  ))}
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
