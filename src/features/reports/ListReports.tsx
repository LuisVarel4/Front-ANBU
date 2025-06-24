import React, { useState } from 'react';
import Header from '../../components/mission/Header';
import {Button} from '../../components/ui';
import { FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface Report {
  id: number;
  nombre: string;
  fecha: string;
  tipo: 'Traidor asesinado' | 'Posible traidor';
  estado: 'En Proceso' | 'Aprobada' | 'Rechazada';
}

const initialReports: Report[] = [
  { id: 1, nombre: 'Pedro', fecha: '27-10-2023', tipo: 'Traidor asesinado', estado: 'En Proceso' },
  { id: 2, nombre: 'Muhammed al aviv', fecha: '30-06-2025 ', tipo: 'Posible traidor', estado: 'Aprobada' },
  { id: 3, nombre: 'Osama Bin Laden - San', fecha: '02-05-2011', tipo: 'Traidor asesinado', estado: 'Rechazada' },
];

const ListReports: React.FC = () => {
  const navigate = useNavigate();
  const reports = initialReports;
  const [filters, setFilters] = useState({ nombre: '', fecha: '', tipo: '', estado: '' });

  const filteredReports = reports.filter(r =>
    r.nombre.toLowerCase().includes(filters.nombre.toLowerCase()) &&
    r.fecha.includes(filters.fecha) &&
    r.tipo.toLowerCase().includes(filters.tipo.toLowerCase()) &&
    r.estado.toLowerCase().includes(filters.estado.toLowerCase())
  );

  const estadoColor = (estado: string) => {
    if (estado === 'En Proceso') return 'bg-gray-400 text-black';
    if (estado === 'Aprobada') return 'bg-green-anbu text-white';
    if (estado === 'Rechazada') return 'bg-red-anbu text-white';
    return '';
  };

  const handleEyeClick = (report: Report) => {
    if (report.tipo === "Traidor asesinado") {
      navigate(`/detalle-asesinado`);
    } else if (report.tipo === "Posible traidor") {
      navigate(`/detalle-posible`);
    } 
  };
  return (
    <div className="min-h-screen bg-black-anbu text-white">
      <Header />
      <div className="text-center py-6">
        <h2 className="text-xl text-red-anbu font-semibold">Lista de reportes de traidores</h2>
      </div>
      <div className="flex justify-center p-2 sm:p-4 md:p-8">
        <div className="bg-gray-800 rounded-md p-2 sm:p-4 w-full max-w-full md:max-w-4xl">
          <table className="w-full text-sm rounded-md overflow-hidden">
            <thead className="bg-gray-300 text-black">
              <tr>
                <th className="px-4 py-2">Nombre Agente</th>
                <th className="px-4 py-2">Fecha</th>
                <th className="px-4 py-2">Tipo de reporte</th>
                <th className="px-4 py-2">Estado</th>
                <th className="px-4 py-2"></th>
              </tr>
              <tr className="bg-gray-200">
                <th>
                  <input
                    type="text"
                    className="w-full p-1 text-xs text-black-anbu rounded-md text-center placeholder:text-center"
                    placeholder="Filtrar"
                    onChange={e => setFilters({ ...filters, nombre: e.target.value })}
                  />
                </th>
                <th>
                  <input
                    type="text"
                    className="w-full p-1 text-xs text-black-anbu rounded-md text-center placeholder:text-center"
                    placeholder="Filtrar"
                    onChange={e => setFilters({ ...filters, fecha: e.target.value })}
                  />
                </th>
                <th>
                  <input
                    type="text"
                    className="w-full p-1 text-xs text-black-anbu rounded-md text-center placeholder:text-center"
                    placeholder="Filtrar"
                    onChange={e => setFilters({ ...filters, tipo: e.target.value })}
                  />
                </th>
                <th>
                  <input
                    type="text"
                    className="w-full p-1 text-xs text-black-anbu rounded-md text-center placeholder:text-center"
                    placeholder="Filtrar"
                    onChange={e => setFilters({ ...filters, estado: e.target.value })}
                  />
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
             {filteredReports.map(report => (
                <tr key={report.id}>
                <td colSpan={5} className="px-0 py-2">
                    <div className="flex items-center rounded-md bg-[#D9E0E6] px-4 py-2 gap-2">
                        <div className="flex-1 text-black">{report.nombre}</div>
                        <div className="flex-1 text-black text-center">{report.fecha}</div>
                        <div className="flex-1 flex justify-center">
                        <span className="bg-gray-600 text-white px-2 py-1 rounded min-w-[140px] inline-block text-center">
                            {report.tipo}
                        </span>
                        </div>
                        <div className="flex-1 flex justify-center">
                        <span className={`px-2 py-1 rounded min-w-[120px] inline-block text-center ${estadoColor(report.estado)}`}>
                            {report.estado}
                        </span>
                        </div>
                        <div className="flex items-center justify-center">
                        <button
                            className="text-red-anbu hover:scale-110"
                            onClick={() => handleEyeClick(report)}
                            type="button"
                            aria-label="Ver detalles"
                        >
                            <FaEye />
                        </button>
                        </div>
                    </div>
                    </td>
                </tr>
            ))}
            </tbody>
          </table>
          </div>
        </div>
        <div className="flex justify-center mt-6">
            <Button
              onClick={() => navigate('/homepage')}
              type="button"
              color="bg-red-anbu"
              className="hover:bg-gray2-anbu"
            >
              Volver
            </Button>
          </div>
    </div>
  );
};

export default ListReports;
