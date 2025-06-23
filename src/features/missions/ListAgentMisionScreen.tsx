import React from "react";
import Header from "../../components/mission/Header";
import { Button } from "../../components/ui";
import { useNavigate } from "react-router-dom";
import { mockAgentes } from "../../data/agentes";
import { FaFilter } from "react-icons/fa";
import ItemAgentMisionList from "../../components/mission/ItemAgentMisionList"; // Ajusta la ruta si es necesario
const agents = mockAgentes; // Suponiendo que tienes una lista de agentes en un archivo de datos

const ListAgentMisionScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black-anbu min-h-screen text-white">
      <Header />
      <div className="py-6 text-center">
        <h2 className="text-red-anbu text-2xl font-bold">Listado de Agentes</h2>
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
                    <FaFilter /> <span>Correo</span>
                  </div>
                </th>
                <th className="px-4 py-2 text-left">
                  <div className="flex items-center gap-2">
                    <FaFilter /> <span>Especialidad</span>
                  </div>
                </th>
                <th className="px-4 py-2 text-left">Chat</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <ItemAgentMisionList
                  alias={agent.alias}
                  correo={agent.correo}
                  especialidad={agent.especialidad}
                />
              ))}
            </tbody>
          </table>
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
          <Button
            type="button"
            color="bg-red-anbu hover:bg-yellow-anbu"
            textColor="text-white hover:text-black"
            onClick={() => navigate("/agent-request")}
            className="w-32"
          >
            Agregar
          </Button>
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
