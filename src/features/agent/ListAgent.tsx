import React, { useState } from "react";
import { Button } from "../../components/ui";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CreateAgentModal from "../../features/agent/CreateAgentModal";
import EditAgentModal from "../../features/agent/EditAgentModal";

interface Agent {
  id: number;
  nombre: string;
  alias: string;
  correo: string;
  especialidad: string;
  rol: string;
}

const initialAgents: Agent[] = [
  {
    id: 1,
    nombre: "Pablo Escobar",
    alias: "Orichimaru",
    correo: "Orichimaru@anbu.com.co",
    especialidad: "Asesino",
    rol: "Kage",
  },
  {
    id: 2,
    nombre: "Gustavo Petro",
    alias: "Loco",
    correo: "Loco@anbu.com.co",
    especialidad: "Torturador",
    rol: "Capitan",
  },
  {
    id: 3,
    nombre: "Rosario tijeras",
    alias: "Imparable",
    correo: "Imparable@anbu.com.co",
    especialidad: "Asesino",
    rol: "Agente",
  },
  {
    id: 4,
    nombre: "Alvaro Uribe",
    alias: "El Patrón",
    correo: "Elpatron@anbu.com.co",
    especialidad: "Torturador",
    rol: "Capitan",
  },
  {
    id: 5,
    nombre: "Valentina Ríos",
    alias: "Sombra",
    correo: "sombra@anbu.com.co",
    especialidad: "Infiltradora",
    rol: "Agente",
  },
  {
    id: 6,
    nombre: "Camilo Andrade",
    alias: "Cicatriz",
    correo: "cicatriz@anbu.com.co",
    especialidad: "Explosivos",
    rol: "Agente",
  },
  {
    id: 7,
    nombre: "Lucía Márquez",
    alias: "Medusa",
    correo: "medusa@anbu.com.co",
    especialidad: "Psicológica",
    rol: "Capitan",
  },
  {
    id: 8,
    nombre: "Diego Salazar",
    alias: "Cuervo",
    correo: "cuervo@anbu.com.co",
    especialidad: "Francotirador",
    rol: "Agente",
  },
];


const AgentsListScreen: React.FC = () => {
  const navigate = useNavigate();

  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [filters, setFilters] = useState({
    nombre: "",
    alias: "",
    correo: "",
    especialidad: "",
    rol: "",
  });
  const [sortField, setSortField] = useState<string>("");
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [agentToEdit, setAgentToEdit] = useState<Agent | null>(null);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const filteredAgents = agents
    .filter(
      (agent) =>
        agent.nombre.toLowerCase().includes(filters.nombre.toLowerCase()) &&
        agent.alias.toLowerCase().includes(filters.alias.toLowerCase()) &&
        agent.correo.toLowerCase().includes(filters.correo.toLowerCase()) &&
        agent.especialidad
          .toLowerCase()
          .includes(filters.especialidad.toLowerCase()) &&
        agent.rol.toLowerCase().includes(filters.rol.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      const valA = a[sortField as keyof Agent];
      const valB = b[sortField as keyof Agent];
      return sortAsc
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });

  const handleEdit = (agent: Agent) => {
    setAgentToEdit(agent);
    setShowEditModal(true);
  };

  const handleDelete = (id: number) => {
    const confirm = window.confirm("¿Estás seguro que deseas eliminar este agente?");
    if (confirm) {
      setAgents((prev) => prev.filter((agent) => agent.id !== id));
    }
  };

  const handleUpdateAgent = (updatedAgent: Agent) => {
    setAgents((prevAgents) =>
      prevAgents.map((agent) =>
        agent.id === updatedAgent.id ? updatedAgent : agent
      )
    );
  };

  return (
    <div className="min-h-full bg-black-anbu text-white">
      {(showCreateModal || showEditModal) && (
        <div className="fixed inset-0 bg-opacity-10 backdrop-blur-sm z-40"></div>
      )}

      <div className="relative z-30">
        <div className="py-10 text-center">
          <h2 className="text-red-anbu text-xl font-semibold">
            Listado de Agentes
          </h2>
        </div>

        <div className="overflow-x-auto px-4">

          <div className="rounded-md bg-gray-800 p-4">
            <table className="w-full rounded bg-grayBlue-anbu text-sm">
              <thead className="rounded-md bg-gray-300 text-black">
                <tr>
                  {"nombre alias correo rol especialidad".split(" ").map((key) => (
                    <th
                      key={key}
                      className="hover:bg-gray3-anbu-200 cursor-pointer px-4 py-2"
                      onClick={() => handleSort(key)}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
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
                        className="text-black-anbu w-full p-1 text-xs"
                        onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
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
                    className="border-t bg-gray-300 text-center">
                    <td className="text-black-anbu px-4 py-2">{agent.nombre}</td>
                    <td className="text-black-anbu px-4 py-2">{agent.alias}</td>
                    <td className="text-black-anbu px-4 py-2">{agent.correo}</td>
                    <td className="text-black-anbu px-4 py-2">{agent.rol}</td>
                    <td className="text-black-anbu px-4 py-2">{agent.especialidad}</td>
                    <td className="flex justify-center gap-3 px-4 py-2">
                      <button
                        onClick={() => handleEdit(agent)}
                        className="text-black-anbu hover:scale-110"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(agent.id)}
                        className="text-red-anbu hover:scale-110"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 flex justify-between px-6">
          <Button
            onClick={() => navigate("/homepage")}
            type="button"
            color="bg-red-anbu"
            className="hover:bg-gray2-anbu"
          >
            Volver
          </Button>

          <Button
            onClick={() => setShowCreateModal(true)}
            type="button"
            color="bg-red-anbu"
            className="hover:bg-green-anbu"
          >
            Crear nuevo agente
          </Button>
        </div>
      </div>

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
    </div>
  );
};

export default AgentsListScreen;
