import React from 'react';
import Header from '../../components/mission/Header';
import EstadoDropdown from '../../components/mission/DropdownState';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';


const EditMissionForm: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black-anbu text-white">
      <Header />

      <div className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-6 text-red-anbu">Capitán</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Alias</label>
              <input
                type="text"
                value="Culebrita"
                disabled
                className="w-full rounded-md bg-gray-300 text-black px-4 py-2"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Objetivo</label>
              <input
                type="text"
                value="Asesinar a Orochimaru"
                disabled
                className="w-full rounded-md bg-gray-300 text-black px-4 py-2"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Descripción</label>
              <textarea
                disabled
                value="Matar a Orochimaru en el centro Medellín el 31 de diciembre."
                className="w-full rounded-md bg-gray-300 text-black px-4 py-2 h-28 resize-none"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Capitán designado</label>
              <input
                type="text"
                value="Daniel Chanci"
                disabled
                className="w-full rounded-md bg-gray-300 text-black px-4 py-2"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Nivel de Prioridad</label>
              <input
                type="text"
                value="Crítica"
                disabled
                className="w-full rounded-md bg-gray-300 text-black px-4 py-2"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Fecha Límite</label>
              <input
                type="date"
                value="2026-01-05"
                disabled
                className="w-full rounded-md bg-gray-300 text-black px-4 py-2"
              />
            </div>

            <EstadoDropdown />

          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-10 gap-4">
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
