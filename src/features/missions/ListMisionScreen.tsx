import React from "react";
import { Button, ScrollArea } from "../../components/ui";
import ItemMisionList from "../../components/mission/ItemMisionList";
import { mockMissions } from "../../data/misiones";
import { useNavigate } from "react-router-dom";
import CreateMision from "./CreateMision";

const MisionLisScreen: React.FC = () => {
  const navigate = useNavigate();

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
                      Chat
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y-4 divide-gray-700 text-center">
                  {mockMissions.map((mision, idx) => (
                    <ItemMisionList key={idx} {...mision} />
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
          <Button
            type="submit"
            color="bg-red-anbu hover:bg-yellow-anbu"
            textColor="text-white hover:text-black"
            className="px-6 py-2"
            onClick={() => navigate('/mision-create')} 
          >
            Crear Misión
          </Button>
        </div>

      </div>
    </div>
  );
};

export default MisionLisScreen;
