import React from "react";
import Header from "../../components/header/Header";
import { Button } from "../../components/ui";
import ItemMisionList from "../../components/mission/ItemMisionList";
import { mockMissions } from "../../data/misiones";
import { useNavigate } from "react-router-dom";

const MisionLisScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Header color="bg-red-anbu/90" />

      <div className="py-6 text-center">
        <h2 className="text-red-anbu text-2xl font-bold">
          Listado de misiones
        </h2>
      </div>

      <div className="px-6">
        <div className="rounded-md bg-gray-800 p-4">
          <table className="w-full overflow-hidden rounded-md text-sm">
            <thead className="rounded-md bg-gray-300 text-black">
              <tr className="text-left">
                <th className="px-4 py-2">Capitán</th>
                <th className="px-4 py-2">Objetivo</th>
                <th className="px-4 py-2">Fecha Límite</th>
                <th className="px-4 py-2">Prioridad</th>
                <th className="px-4 py-2">Estado</th>
                <th className="px-4 py-2">Chat</th>
              </tr>
            </thead>

            <tbody className="divide-y-4 divide-gray-700">
              {mockMissions.map((mision, idx) => (
                <ItemMisionList key={idx} {...mision} />
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            type="submit"
            color="bg-red-anbu hover:bg-yellow-anbu"
            textColor="text-white hover:text-black"
            onClick={() => navigate(-1)}
            className="px-6 py-2"
          >
            Volver
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MisionLisScreen;
