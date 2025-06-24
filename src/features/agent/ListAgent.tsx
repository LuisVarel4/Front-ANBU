import React, { useState } from "react";
import { Button } from "../../components/ui";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
        agent.rol.toLowerCase().includes(filters.rol.toLowerCase()),
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
    navigate("/agent-edit", { state: { agenteAEditar: agent } });
  };

  const handleDelete = (id: number) => {
    const confirm = window.confirm(
      "¿Estás seguro que deseas eliminar este agente?",
    );
    if (confirm) {
      setAgents((prev) => prev.filter((agent) => agent.id !== id));
    }
  };

  return (
    <div className="bg-black-anbu min-h-full text-white">
      <div className="py-10 text-center">
        <h2 className="text-red-anbu text-xl font-semibold">
          Listado de Agentes
        </h2>
      </div>

      <div className="overflow-x-auto px-4">
        <table className="w-full rounded bg-gray-900 text-sm">
          <thead className="bg-gray-300 text-black">
            <tr>
              {["nombre", "alias", "correo", "rol", "especialidad"].map(
                (key) => (
                  <th
                    key={key}
                    className="hover:bg-gray3-anbu-200 cursor-pointer px-4 py-2"
                    onClick={() => handleSort(key)}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </th>
                ),
              )}
              <th className="px-4 py-2">Acciones</th>
            </tr>
            <tr className="bg-white">
              <th>
                <input
                  type="text"
                  placeholder="Filtro"
                  className="text-black-anbu w-full p-1 text-xs"
                  onChange={(e) =>
                    setFilters({ ...filters, nombre: e.target.value })
                  }
                />
              </th>
              <th>
                <input
                  type="text"
                  placeholder="Filtro"
                  className="text-black-anbu w-full p-1 text-xs"
                  onChange={(e) =>
                    setFilters({ ...filters, alias: e.target.value })
                  }
                />
              </th>
              <th>
                <input
                  type="text"
                  placeholder="Filtro"
                  className="text-black-anbu w-full p-1 text-xs"
                  onChange={(e) =>
                    setFilters({ ...filters, correo: e.target.value })
                  }
                />
              </th>
              <th>
                <input
                  type="text"
                  placeholder="Filtro"
                  className="text-black-anbu w-full p-1 text-xs"
                  onChange={(e) =>
                    setFilters({ ...filters, rol: e.target.value })
                  }
                />
              </th>
              <th>
                <input
                  type="text"
                  placeholder="Filtro"
                  className="text-black-anbu w-full p-1 text-xs"
                  onChange={(e) =>
                    setFilters({ ...filters, especialidad: e.target.value })
                  }
                />
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredAgents.map((agent) => (
              <tr
                key={agent.id}
                className="border-t border-gray-700 text-center"
              >
                <td className="text-gray3-anbu-300 px-4 py-2">
                  {agent.nombre}
                </td>
                <td className="text-gray3-anbu-300 px-4 py-2">{agent.alias}</td>
                <td className="text-gray3-anbu-300 px-4 py-2 font-bold">
                  {agent.correo}
                </td>
                <td className="text-gray3-anbu-300 px-4 py-2">{agent.rol}</td>
                <td className="text-gray3-anbu-300 px-4 py-2">
                  {agent.especialidad}
                </td>
                <td className="flex justify-center gap-3 px-4 py-2">
                  <button
                    onClick={() => handleEdit(agent)}
                    className="text-yellow-anbu hover:scale-110"
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
          onClick={() => navigate("/agent-create")}
          type="button"
          color="bg-red-anbu"
          className="hover:bg-green-anbu"
        >
          Crear nuevo agente
        </Button>
      </div>
    </div>
  );
};

export default AgentsListScreen;
