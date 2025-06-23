import React from "react";
import Header from "../../components/mission/Header";
import EstadoDropdown from "../../components/mission/DropdownState";
import { Button } from "../../components/ui";
import { useNavigate } from "react-router-dom";


const EditMissionForm: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black-anbu min-h-screen text-white">
      <Header />

      <div className="mx-auto max-w-5xl px-6 py-10">
        <h2 className="text-red-anbu mb-6 text-2xl font-bold">Capitán</h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="mb-1 block font-medium">Alias</label>
              <input
                type="text"
                value="Culebrita"
                disabled
                className="w-full rounded-md bg-gray-300 px-4 py-2 text-black"
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">Objetivo</label>
              <input
                type="text"
                value="Asesinar a Orochimaru"
                disabled
                className="w-full rounded-md bg-gray-300 px-4 py-2 text-black"
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">Descripción</label>
              <textarea
                disabled
                value="Matar a Orochimaru en el centro Medellín el 31 de diciembre."
                className="h-28 w-full resize-none rounded-md bg-gray-300 px-4 py-2 text-black"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="mb-1 block font-medium">
                Capitán designado
              </label>
              <input
                type="text"
                value="Daniel Chanci"
                disabled
                className="w-full rounded-md bg-gray-300 px-4 py-2 text-black"
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">
                Nivel de Prioridad
              </label>
              <input
                type="text"
                value="Crítica"
                disabled
                className="w-full rounded-md bg-gray-300 px-4 py-2 text-black"
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">Fecha Límite</label>
              <input
                type="date"
                value="2026-01-05"
                disabled
                className="w-full rounded-md bg-gray-300 px-4 py-2 text-black"
              />
            </div>

            <EstadoDropdown />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 md:flex-row">
          <Button
            type="button"
            color="bg-red-anbu hover:bg-yellow-anbu"
            textColor="text-white hover:text-black"
            onClick={() => navigate(-1)}
          >
            Volver
          </Button>

          <Button
            type="button"
            color="bg-red-anbu hover:bg-yellow-anbu"
            textColor="text-white hover:text-black"
            onClick={() => navigate('/agent-mision-list')}  
          >
            Ver Agentes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditMissionForm;
