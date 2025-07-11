import React, { useState } from "react";
import { Button, ScrollArea } from "../../components/ui";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CreateAgentModal from "../../features/agent/CreateAgentModal";
import EditAgentModal from "../../features/agent/EditAgentModal";
import Popup from "../../components/Popup.tsx";

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
    correo: "orichimaru@anbu.com.co",
    especialidad: "Asesino",
    rol: "Kage",
  },
  {
    id: 2,
    nombre: "Gustavo Petro",
    alias: "Loco",
    correo: "loco@anbu.com.co",
    especialidad: "Torturador",
    rol: "Capitan",
  },
  {
    id: 3,
    nombre: "Rosario Tijeras",
    alias: "Imparable",
    correo: "imparable@anbu.com.co",
    especialidad: "Asesino",
    rol: "Agente",
  },
  {
    id: 4,
    nombre: "Álvaro Uribe",
    alias: "El Patrón",
    correo: "elpatron@anbu.com.co",
    especialidad: "Torturador",
    rol: "Capitan",
  },
  {
    id: 5,
    nombre: "Valentina Ríos",
    alias: "Sombra",
    correo: "sombra@anbu.com.co",
    especialidad: "Espía",
    rol: "Agente",
  },
  {
    id: 6,
    nombre: "Camilo Andrade",
    alias: "Cicatriz",
    correo: "cicatriz@anbu.com.co",
    especialidad: "Asesino",
    rol: "Agente",
  },
  {
    id: 7,
    nombre: "Lucía Márquez",
    alias: "Medusa",
    correo: "medusa@anbu.com.co",
    especialidad: "Espía",
    rol: "Capitan",
  },
  {
    id: 8,
    nombre: "Diego Salazar",
    alias: "Cuervo",
    correo: "cuervo@anbu.com.co",
    especialidad: "Asesino",
    rol: "Agente",
  },
  {
    id: 9,
    nombre: "Itachi Uchiha",
    alias: "Cuervo Negro",
    correo: "itachi@anbu.com.co",
    especialidad: "Espía",
    rol: "Agente",
  },
  {
    id: 10,
    nombre: "Kakashi Hatake",
    alias: "Lobo Blanco",
    correo: "kakashi@anbu.com.co",
    especialidad: "Asesino",
    rol: "Capitan",
  },
  {
    id: 11,
    nombre: "Yamato",
    alias: "Madera",
    correo: "yamato@anbu.com.co",
    especialidad: "Espía",
    rol: "Agente",
  },
  {
    id: 12,
    nombre: "Sai",
    alias: "Pincel",
    correo: "sai@anbu.com.co",
    especialidad: "Espía",
    rol: "Agente",
  },
  {
    id: 13,
    nombre: "Konan",
    alias: "Ángel de la Muerte",
    correo: "konan@akatsuki.com",
    especialidad: "Torturador",
    rol: "Capitan",
  },
  {
    id: 14,
    nombre: "Kisame Hoshigaki",
    alias: "Tiburón Sangriento",
    correo: "kisame@akatsuki.com",
    especialidad: "Asesino",
    rol: "Agente",
  },
  {
    id: 15,
    nombre: "Zabuza Momochi",
    alias: "Demonio Oculto",
    correo: "zabuza@anbu.com.co",
    especialidad: "Asesino",
    rol: "Capitan",
  },
  {
    id: 16,
    nombre: "Shisui Uchiha",
    alias: "Parpadeo",
    correo: "shisui@anbu.com.co",
    especialidad: "Espía",
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

  const [popupOpen, setPopupOpen] = useState(false);
  const [agentToDelete, setAgentToDelete] = useState<Agent | null>(null);

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
        (!filters.nombre ||
          agent.nombre.toLowerCase().includes(filters.nombre.toLowerCase())) &&
        (!filters.alias ||
          agent.alias.toLowerCase().includes(filters.alias.toLowerCase())) &&
        (!filters.correo ||
          agent.correo.toLowerCase().includes(filters.correo.toLowerCase())) &&
        (!filters.especialidad ||
          agent.especialidad
            .toLowerCase()
            .includes(filters.especialidad.toLowerCase())) &&
        (!filters.rol ||
          agent.rol.toLowerCase().includes(filters.rol.toLowerCase()))
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
    setAgentToEdit(agent);
    setShowEditModal(true);
  };

  const handleDelete = (id: number) => {
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

  const confirmDelete = () => {
    if (agentToDelete) {
      setAgents((prev) =>
        prev.filter((agent) => agent.id !== agentToDelete.id),
      );
      setAgentToDelete(null);
      setPopupOpen(false);
    }
  };

  return (
    <div className="bg-black-anbu h-full text-white">
      {(showCreateModal || showEditModal) && (
        <div className="bg-opacity-10 fixed inset-0 z-40 backdrop-blur-sm"></div>
      )}
      <div className="py-6 text-center">
        <h2 className="text-red-anbu text-xl font-semibold">
          Listado de Agentes
        </h2>
      </div>

      <div className="flex-1 px-2 sm:px-4 md:px-8">
        <div className="mx-auto w-full max-w-full rounded-md bg-gray-800 p-2 sm:p-4 md:max-w-4xl">
          <ScrollArea className="max-h-[50vh] flex-1">
            <table className="bg-grayBlue-anbu w-full rounded text-sm">
              <thead className="sticky top-0 z-10 bg-gray-300 text-black">
                <tr>
                  {"nombre alias correo rol especialidad"
                    .split(" ")
                    .map((key) => (
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
                      {agent.nombre}
                    </td>
                    <td className="text-black-anbu px-4 py-2">{agent.alias}</td>
                    <td className="text-black-anbu px-4 py-2">
                      {agent.correo}
                    </td>
                    <td className="text-black-anbu px-4 py-2">{agent.rol}</td>
                    <td className="text-black-anbu px-4 py-2">
                      {agent.especialidad}
                    </td>
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

        <Button
          onClick={() => setShowCreateModal(true)}
          type="button"
          color="bg-red-anbu"
          className="hover:bg-green-anbu mx-2"
        >
          Crear nuevo agente
        </Button>
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

      <Popup
        isOpen={popupOpen}
        onClose={() => {
          setPopupOpen(false);
          setAgentToDelete(null);
        }}
        onConfirm={confirmDelete}
        message="¿Estás seguro que deseas eliminar este agente?"
      />
    </div>
  );
};

export default AgentsListScreen;
