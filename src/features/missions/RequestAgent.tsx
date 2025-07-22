import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import maskAnbu from '../../assets/ilustrations/Mascara_png-removebg-preview.png';
import Popup from '../../components/Popup';
import { Button } from '../../components/ui';
import { userService } from '../../services/user/user.service';
import { missionService } from '../../services/mission/mission.service';
import type { APIUser } from '../../services/user/user.service';
import type { APIMission } from '../../services/mission/mission.service';

function RequestAgent() {
  const navigate = useNavigate();
  const location = useLocation();


  // Get mission data from navigation state
  const missionId = location.state?.missionId;
  const missionName = location.state?.missionName;

  const [formData, setFormData] = useState({
    selectedAgent: '',
  });
  const [availableAgents, setAvailableAgents] = useState<APIUser[]>([]);
  const [mission, setMission] = useState<APIMission | null>(null);
  const [loading, setLoading] = useState(true);
  const [errores, setErrores] = useState<{ [key: string]: string }>({});
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        if (!missionId) {
          setErrores({ general: 'ID de misión no encontrado' });
          return;
        }

        // Load mission data and all users in parallel
        const [missionData, allUsers] = await Promise.all([
          missionService.getMissionById(missionId),
          userService.getUsers(),
        ]);

        setMission(missionData);

        // Get IDs of agents already in the mission (including captain)
        const assignedAgentIds = new Set([
          missionData.captain.id,
          ...missionData.participations.map(p => p.user_id || p.user?.id),
        ]);

        // Filter out agents already assigned to the mission
        const available = allUsers.filter(user =>
          !assignedAgentIds.has(user.id) &&
          (user.role === 'agente' || user.role === 'kage'),
        );

        setAvailableAgents(available);

      } catch (err: any) {
        console.error('Error loading data:', err);
        setErrores({ general: 'Error al cargar los datos' });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [missionId]);

  const manejarCambio = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrores({ ...errores, [e.target.name]: '' });
  };

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    const nuevosErrores: { [key: string]: string } = {};

    if (!formData.selectedAgent) {
      nuevosErrores.selectedAgent = 'Debe seleccionar un agente';
    }

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
      // TODO: Send request to selected agent
      try {
        await missionService.requestAgent({
          missionId,
          agentId: formData.selectedAgent,
          requestBy: 'captain',  // ← clave
          isReinforcement: true,           // ← clave
        });

        setModalVisible(true);
        setFormData({ selectedAgent: '' });
      } catch (error) {
        console.error('Error al enviar solicitud:', error);
        setErrores({
          general: 'No se pudo enviar la solicitud. Intenta nuevamente.',
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-black-anbu flex min-h-screen items-center justify-center text-white">
        <p>Cargando agentes disponibles...</p>
      </div>
    );
  }

  if (errores.general) {
    return (
      <div className="bg-black-anbu flex min-h-screen items-center justify-center text-white">
        <div className="text-center">
          <p className="text-red-500 mb-4">{errores.general}</p>
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
    <div className="bg-black-anbu flex min-h-screen flex-col items-center p-4 text-white">
      <div className="bg-grayBlue-anbu w-full max-w-2xl rounded-xl shadow-md">
        <form onSubmit={manejarEnvio} className="grid gap-6 p-6 md:grid-cols-2">
          <div className="flex items-center justify-center">
            <img src={maskAnbu} alt="ANBU Mask" className="w-70" />
          </div>

          <div className="flex flex-col gap-4">
            <div className="mb-4">
              <h3 className="text-red-anbu text-lg font-bold mb-2">
                Solicitar Agente
              </h3>
              <p className="text-gray-300 text-sm">
                Misión: {missionName || 'N/A'}
              </p>
              {mission && (
                <p className="text-gray-400 text-xs mt-1">
                  Miembros actuales: {mission.participations.length + 1}
                </p>
              )}
            </div>

            {/* Agent Selection Dropdown */}
            <div>
              <label className="mb-2 block font-medium">
                Seleccionar Agente *
              </label>
              <select
                name="selectedAgent"
                value={formData.selectedAgent}
                onChange={manejarCambio}
                className={`w-full rounded px-3 py-2 text-black ${
                  errores.selectedAgent ? 'bg-red-100 border-red-500' : 'bg-gray-100'
                }`}
              >
                <option value="">
                  {availableAgents.length > 0
                    ? 'Selecciona un agente'
                    : 'No hay agentes disponibles'
                  }
                </option>
                {availableAgents.map((agent) => (
                  <option key={agent.id} value={agent.id}>
                    {agent.alias} - {agent.fullName}
                  </option>
                ))}
              </select>

              {errores.selectedAgent && (
                <p className="text-sm text-red-400 mt-1">{errores.selectedAgent}</p>
              )}

              {availableAgents.length === 0 && (
                <p className="text-gray-400 text-xs mt-1">
                  Todos los agentes ya están asignados a esta misión
                </p>
              )}
            </div>
          </div>

          <div className="col-span-2 mt-4 flex justify-center gap-4">
            <Button
              onClick={() => navigate(-1)}
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
              disabled={availableAgents.length === 0}
            >
              Enviar Solicitud
            </Button>
          </div>
        </form>
      </div>

      {/* Modal de éxito */}
      <Popup
        isOpen={modalVisible}
        onClose={() => {
          setModalVisible(false);
          navigate(-1); // Go back after successful request
        }}
        message="¡Solicitud enviada exitosamente!"
      />
    </div>
  );
}

export default RequestAgent;
