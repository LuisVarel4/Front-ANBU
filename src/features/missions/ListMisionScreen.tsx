import React from 'react';
import Header from '../../components/mission/Header';
import Button from '../../components/Button';
import ItemMisionList from '../../components/mission/ItemMisionList';

const mockMissions = [
  {
    captain: 'Agente Anbu',
    objective: 'Asesinar al líder O',
    deadline: '27-10-2023',
    level: 'Baja',
    status: 'En Proceso',
    isOwner: true,
  },
  {
    captain: 'Carlos Quijano',
    objective: 'Asesinar al líder O',
    deadline: '27-10-2023',
    level: 'Baja',
    status: 'En Proceso',
    isOwner: false,
  },
  {
    captain: 'Emmanuel',
    objective: 'Emboscada',
    deadline: '29-10-2025',
    level: 'Baja',
    status: 'En Proceso',
    isOwner: false,
  },
  {
    captain: 'María Fernanda',
    objective: 'Rescatar al rehén',
    deadline: '03-11-2024',
    level: 'Media',
    status: 'Retraso',
    isOwner: false,
  },
  {
    captain: 'Juan Pérez',
    objective: 'Infiltrar base enemiga',
    deadline: '15-08-2025',
    level: 'Alta',
    status: 'Completada',
    isOwner: false,
  },
  {
    captain: 'Tatiana Ruiz',
    objective: 'Recolectar información',
    deadline: '12-07-2025',
    level: 'Media',
    status: 'En Proceso',
    isOwner: false,
  },
  {
    captain: 'Agente Anbu',
    objective: 'Interceptar convoy',
    deadline: '01-09-2025',
    level: 'Crítica',
    status: 'Retraso',
    isOwner: true,
  },
  {
    captain: 'Ana Torres',
    objective: 'Sabotear comunicaciones',
    deadline: '28-06-2025',
    level: 'Crítica',
    status: 'Fracaso',
    isOwner: false,
  },
  {
    captain: 'Santiago Rivera',
    objective: 'Desactivar bomba',
    deadline: '30-06-2025',
    level: 'Alta',
    status: 'Completada',
    isOwner: false,
  },
  {
    captain: 'Daniela Martínez',
    objective: 'Vigilar zona frontera',
    deadline: '10-07-2025',
    level: 'Media',
    status: 'En Proceso',
    isOwner: false,
  },
];


const MisionLisScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Header />

      <div className="text-center py-6">
        <h2 className="text-2xl text-red-anbu font-bold">Listado de misiones</h2>
      </div>

      <div className="px-6">
      <div className="bg-gray-800 rounded-md p-4">
        <table className="w-full text-sm rounded-md overflow-hidden">
          <thead className="bg-gray-300 text-black rounded-md">
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

      <div className="flex justify-center mt-8">
        <Button
          type="submit"
          color="bg-red-anbu hover:bg-yellow-anbu"
          textColor="text-white hover:text-black"
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
