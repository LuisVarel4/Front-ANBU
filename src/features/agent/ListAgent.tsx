import React, { useState, useEffect } from "react";
import { Button, ScrollArea } from "../../components/ui";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CreateAgentModal from "../../features/agent/CreateAgentModal";
import EditAgentModal from "../../features/agent/EditAgentModal";
import Popup from "../../components/Popup.tsx";
import { userService } from "../../services/user/user.service";
import { useAuthContext } from "../../context/auth/context.ts";
import type { APIUser } from "../../services/user/user.service";

// Update the interface to match API response
interface Agent {
  id: string; 
  fullName: string; 
  alias: string;
  email: string; 
  role: string; 
}

const AgentsListScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [filters, setFilters] = useState({
    fullName: "",
    alias: "",
    email: "",
    role: "",
  });
  const [sortField, setSortField] = useState<string>("");
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [agentToEdit, setAgentToEdit] = useState<Agent | null>(null);

  const [popupOpen, setPopupOpen] = useState(false);
  const [agentToDelete, setAgentToDelete] = useState<Agent | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Check if user is Kage
  const isKage = user?.role === "kage";

  // Fetch agents from API
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoading(true);
        const userData = await userService.getUsers();
        // Transform API data to match local interface
        const transformedAgents: Agent[] = userData.map((user: APIUser) => ({
          id: user.id,
          fullName: user.fullName,
          alias: user.alias,
          email: user.email,
          role: user.role,
        }));
        setAgents(transformedAgents);
      } catch (err) {
        setError("Error al cargar los agentes");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const filteredAgents = agents
    .filter((agent) => {
      return (
        (!filters.fullName ||
          agent.fullName.toLowerCase().includes(filters.fullName.toLowerCase())) &&
        (!filters.alias ||
          agent.alias.toLowerCase().includes(filters.alias.toLowerCase())) &&
        (!filters.email ||
          agent.email.toLowerCase().includes(filters.email.toLowerCase())) &&
        (!filters.role ||
          agent.role.toLowerCase().includes(filters.role.toLowerCase()))
      );
    })
    .sort((a, b) => {
      if (!sortField) return 0;
      const valA = a[sortField as keyof Agent];
      const valB = b[sortField as keyof Agent];
      return sortAsc
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });

  const handleEdit = (agent: Agent) => {
    if (!isKage) return; // Prevent non-kage users from editing
    setAgentToEdit(agent);
    setShowEditModal(true);
  };

  const handleDelete = (id: string) => {
    if (!isKage) return; // Prevent non-kage users from deleting
    const agent = agents.find((a) => a.id === id);
    if (agent) {
      setAgentToDelete(agent);
      setPopupOpen(true);
    }
  };

  const handleUpdateAgent = (updatedAgent: Agent) => {
    setAgents((prevAgents) =>
      prevAgents.map((agent) =>
        agent.id === updatedAgent.id ? updatedAgent : agent,
      ),
    );
  };

  const confirmDelete = async () => {
    if (agentToDelete) {
      try {
        setDeleting(true);
        
        // Make API call to delete user
        await userService.deleteUser(agentToDelete.id);
        
        // Update local state only after successful API call
        setAgents((prev) =>
          prev.filter((agent) => agent.id !== agentToDelete.id),
        );
        
        setAgentToDelete(null);
        setPopupOpen(false);
      } catch (error) {
        console.error('Error deleting user:', error);
        setError("Error al eliminar el usuario. Intenta de nuevo.");
      } finally {
        setDeleting(false);
      }
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-black-anbu h-full text-white flex items-center justify-center">
        <p>Cargando agentes...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-black-anbu h-full text-white flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-black-anbu h-full text-white">
      {(showCreateModal || showEditModal) && (
        <div className="bg-opacity-10 fixed inset-0 z-40 backdrop-blur-sm"></div>
      )}
      
      <div className="py-6 text-center">
        <h2 className="text-red-anbu text-xl font-semibold">
          Listado de Agentes
        </h2>
        <p className="text-gray-300 mt-2">
          {isKage 
            ? `Mostrando todos los agentes (${agents.length})` 
            : `Vista de agentes (${agents.length})`
          }
        </p>
        
        {/* Role indicator */}
        <span
          className={`inline-block mt-2 px-3 py-1 rounded text-sm ${
            isKage
              ? "bg-yellow-anbu text-black"
              : "bg-green-anbu text-black"
          }`}
        >
          {isKage
            ? "Kage - Control Total de Agentes"
            : "Agente - Vista Solo Lectura"}
        </span>
      </div>

      {error && (
        <div className="mx-4 mb-4 p-3 bg-red-500 text-white rounded">
          {error}
          <button 
            onClick={() => setError("")}
            className="ml-2 text-white hover:text-gray-200"
          >
            ×
          </button>
        </div>
      )}

      <div className="flex-1 px-2 sm:px-4 md:px-8">
        <div className="mx-auto w-full max-w-full rounded-md bg-gray-800 p-2 sm:p-4 md:max-w-4xl">
          <ScrollArea className="max-h-[50vh] flex-1">
            <table className="bg-grayBlue-anbu w-full rounded text-sm">
              <thead className="sticky top-0 z-10 bg-gray-300 text-black">
                <tr>
                  {["fullName", "alias", "email", "role"].map((key) => (
                    <th
                      key={key}
                      className="hover:bg-gray3-anbu-200 cursor-pointer px-4 py-2"
                      onClick={() => handleSort(key)}
                    >
                      {key === "fullName" ? "Nombre" : 
                       key === "email" ? "Correo" :
                       key === "role" ? "Rol" :
                       key.charAt(0).toUpperCase() + key.slice(1)}
                    </th>
                  ))}
                  <th className="px-4 py-2">Acciones</th>
                </tr>
                <tr className="bg-white">
                  {Object.keys(filters).map((key) => (
                    <th key={key}>
                      <input
                        type="text"
                        placeholder="Filtro"
                        className="text-black-anbu w-full p-1 text-center text-xs"
                        onChange={(e) =>
                          setFilters({ ...filters, [key]: e.target.value })
                        }
                      />
                    </th>
                  ))}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredAgents.map((agent) => (
                  <tr
                    key={agent.id}
                    className="border-t bg-gray-300 text-center"
                  >
                    <td className="text-black-anbu px-4 py-2">
                      {agent.fullName}
                    </td>
                    <td className="text-black-anbu px-4 py-2">{agent.alias}</td>
                    <td className="text-black-anbu px-4 py-2">
                      {agent.email}
                    </td>
                    <td className="text-black-anbu px-4 py-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        agent.role === "kage" ? "bg-yellow-anbu text-black" :
                        agent.role === "agente" ? "bg-green-anbu text-white" :
                        "bg-gray-500 text-white"
                      }`}>
                        {agent.role}
                      </span>
                    </td>
                    <td className="flex justify-center gap-3 px-4 py-2">
                      {/* Edit button - only enabled for Kage */}
                      <button
                        onClick={() => handleEdit(agent)}
                        className={`${
                          isKage 
                            ? "text-black-anbu hover:scale-110 cursor-pointer" 
                            : "text-gray-400 cursor-not-allowed"
                        }`}
                        disabled={!isKage || deleting}
                        title={isKage ? "Editar agente" : "Solo Kage puede editar"}
                      >
                        <FaEdit />
                      </button>
                      
                      {/* Delete button - only enabled for Kage */}
                      <button
                        onClick={() => handleDelete(agent.id)}
                        className={`${
                          isKage 
                            ? "text-red-anbu hover:scale-110 cursor-pointer" 
                            : "text-gray-400 cursor-not-allowed"
                        }`}
                        disabled={!isKage || deleting}
                        title={isKage ? "Eliminar agente" : "Solo Kage puede eliminar"}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollArea>
        </div>
      </div>

      <div className="my-4 flex justify-center">
        <Button
          onClick={() => navigate("/homepage")}
          type="button"
          color="bg-red-anbu"
          className="hover:bg-gray2-anbu mx-2"
        >
          Volver
        </Button>

        {/* Create Agent button - only show for Kage */}
        {isKage && (
          <Button
            onClick={() => setShowCreateModal(true)}
            type="button"
            color="bg-red-anbu"
            className="hover:bg-green-anbu mx-2"
          >
            Crear nuevo agente
          </Button>
        )}
      </div>

      {/* Show different message based on role */}
      {!isKage && (
        <div className="text-center text-gray-400 text-sm mb-4">
          <p>Solo el Kage puede crear, editar o eliminar agentes</p>
        </div>
      )}

      {/* Modals - only render for Kage */}
      {isKage && (
        <>
          <CreateAgentModal
            isOpen={showCreateModal}
            onClose={() => setShowCreateModal(false)}
          />

          <EditAgentModal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            agent={agentToEdit}
            onSave={handleUpdateAgent}
          />
        </>
      )}

      <Popup
        isOpen={popupOpen}
        onClose={() => {
          setPopupOpen(false);
          setAgentToDelete(null);
        }}
        onConfirm={confirmDelete}
        message={`¿Estás seguro que deseas eliminar a ${agentToDelete?.fullName || 'este agente'}?`}
      />
    </div>
  );
};

export default AgentsListScreen;
