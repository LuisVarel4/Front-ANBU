import React from 'react';
import Header from '../../components/Header';
import ItemMisionList from '../../components/ItemMisionList';

const mockMissions = [
  {
    captain: 'Yo',
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
];

const MisionLisScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-black-anbu text-white">
      <Header />

      <div className="text-center py-6">
        <h2 className="text-xl text-red-anbu font-semibold">Listado de misiones</h2>
      </div>

      <div className="overflow-x-auto px-4">
        <table className="w-full bg-gray-900 text-sm rounded">
          <thead className="bg-gray-300 text-black">
            <tr>
              <th className="px-4 py-2">Capitán</th>
              <th className="px-4 py-2">Objetivo</th>
              <th className="px-4 py-2">Fecha Límite</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2">Recompensa</th>
              <th className="px-4 py-2">Chat</th>
            </tr>
          </thead>
          <tbody>
            {mockMissions.map((mision, idx) => (
              <ItemMisionList key={idx} {...mision} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-8">
        <button className="bg-red-anbu text-white px-6 py-2 rounded-md">Volver</button>
      </div>
    </div>
  );
};

export default MisionLisScreen;
