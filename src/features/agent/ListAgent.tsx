import React, { useState } from 'react';
import Header from '../../components/mission/Header';
import Button from '../../components/Button';
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';



const mockAgents = [
  {
    nombre: 'Pablo Escobar',
    alias: 'Orichimaru',
    correo: 'Orichimaru@anbu.com.co',
    especialidad: 'Asesino',
    rol: 'Kage',
  },
  {
    nombre: 'Gustavo Petro',
    alias: 'Loco',
    correo: 'Loco@anbu.com.co',
    especialidad: 'Torturador',
    rol: 'Capitan',
  },
];

const AgentsListScreen: React.FC = () => {
    
  const navigate = useNavigate(); 
    
  const [filters, setFilters] = useState({
    nombre: '',
    alias: '',
    correo: '',
    especialidad: '',
    rol: '',
  });
  const [sortField, setSortField] = useState<string>('');
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const filteredAgents = mockAgents
    .filter(agent =>
      agent.nombre.toLowerCase().includes(filters.nombre.toLowerCase()) &&
      agent.alias.toLowerCase().includes(filters.alias.toLowerCase()) &&
      agent.correo.toLowerCase().includes(filters.correo.toLowerCase()) &&
      agent.especialidad.toLowerCase().includes(filters.especialidad.toLowerCase()) &&
      agent.rol.toLowerCase().includes(filters.rol.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      const valA = a[sortField as keyof typeof a];
      const valB = b[sortField as keyof typeof b];
      return sortAsc
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });

  return (
    <div className="min-h-screen bg-black-anbu text-white">
      <Header />

      <div className="text-center py-10">
        <h2 className="text-xl text-red-anbu font-semibold">Listado de Agentes</h2>
      </div>

      <div className="overflow-x-auto px-4">
        <table className="w-full bg-gray-900 text-sm rounded">
          <thead className="bg-gray-300 text-black">
            <tr>
              {['nombre', 'alias', 'correo', 'rol', 'especialidad'].map((key) => (
                <th
                  key={key}
                  className="px-4 py-2 cursor-pointer hover:bg-gray3-anbu-200"
                  onClick={() => handleSort(key)}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </th>
              ))}
              <th className="px-4 py-2">Editar</th>
            </tr>
            <tr className="bg-white">
              <th><input type="text" placeholder="Filtro" className="w-full p-1 text-xs text-black-anbu" onChange={(e) => setFilters({ ...filters, nombre: e.target.value })} /></th>
              <th><input type="text" placeholder="Filtro" className="w-full p-1 text-xs text-black-anbu" onChange={(e) => setFilters({ ...filters, alias: e.target.value })} /></th>
              <th><input type="text" placeholder="Filtro" className="w-full p-1 text-xs text-black-anbu" onChange={(e) => setFilters({ ...filters, correo: e.target.value })} /></th>
              <th><input type="text" placeholder="Filtro" className="w-full p-1 text-xs text-black-anbu" onChange={(e) => setFilters({ ...filters, rol: e.target.value })} /></th>
              <th><input type="text" placeholder="Filtro" className="w-full p-1 text-xs text-black-anbu" onChange={(e) => setFilters({ ...filters, especialidad: e.target.value })} /></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredAgents.map((agent, index) => (
              <tr key={index} className="border-t border-gray-700 text-center">
                <td className="px-4 py-2 text-gray3-anbu-300">{agent.nombre}</td>
                <td className="px-4 py-2 text-gray3-anbu-300">{agent.alias}</td>
                <td className="px-4 py-2 text-gray3-anbu-300 font-bold">{agent.correo}</td>
                <td className="px-4 py-2 text-gray3-anbu-300">{agent.rol}</td>
                <td className="px-4 py-2 text-gray3-anbu-300">{agent.especialidad}</td>
                <td className="px-4 py-2">
                  <button
                    className="text-red-anbu hover:underline cursor-pointer"
                    onClick={() => navigate('/create-agent')}>
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between px-6 mt-8">
        <Button
          onClick={() =>  navigate('/homepage')}
          type="button"
          color="bg-red-anbu"
          className="hover:bg-gray2-anbu">
          Volver
        </Button>
        <Button

            onClick={() =>  navigate('/create-agent')}
          type="button"
          color="bg-red-anbu"
          className="hover:bg-green-anbu">
          Crear nuevo agente
        </Button>
      </div>
    </div>
  );
};

export default AgentsListScreen;
