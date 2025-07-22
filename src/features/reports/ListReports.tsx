import React, { useState } from "react";
import { Button, ScrollArea } from "../../components/ui";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CreateReport from "../../features/reports/CreateReports";

interface Report {
  id: number;
  nombre: string;
  fecha: string;
  tipo: "Traidor asesinado" | "Posible traidor";
  estado: "En Proceso" | "Aprobada" | "Rechazada";
}


const initialReports: Report[] = [
  {
    id: 1,
    nombre: "Itachi Uchiha",
    fecha: "09-06-2025",
    tipo: "Traidor asesinado",
    estado: "Aprobada",
  },
  {
    id: 2,
    nombre: "Kakashi Hatake",
    fecha: "14-03-2024",
    tipo: "Posible traidor",
    estado: "En Proceso",
  },
  {
    id: 3,
    nombre: "Orochimaru",
    fecha: "22-11-2023",
    tipo: "Traidor asesinado",
    estado: "Rechazada",
  },
  {
    id: 4,
    nombre: "Kabuto Yakushi",
    fecha: "10-01-2025",
    tipo: "Posible traidor",
    estado: "Aprobada",
  },
  {
    id: 5,
    nombre: "Yamato (Tenzo)",
    fecha: "03-05-2023",
    tipo: "Posible traidor",
    estado: "En Proceso",
  },
  {
    id: 6,
    nombre: "Sasuke Uchiha",
    fecha: "17-07-2022",
    tipo: "Traidor asesinado",
    estado: "Rechazada",
  },
  {
    id: 7,
    nombre: "Deidara",
    fecha: "28-09-2023",
    tipo: "Traidor asesinado",
    estado: "Aprobada",
  },
  {
    id: 8,
    nombre: "Sai (ANBU Root)",
    fecha: "05-04-2025",
    tipo: "Posible traidor",
    estado: "En Proceso",
  },
  {
    id: 9,
    nombre: "Hidan",
    fecha: "11-08-2023",
    tipo: "Traidor asesinado",
    estado: "Aprobada",
  },
  {
    id: 10,
    nombre: "Zabuza Momochi",
    fecha: "30-10-2022",
    tipo: "Traidor asesinado",
    estado: "Rechazada",
  },
  {
    id: 11,
    nombre: "Kisame Hoshigaki",
    fecha: "13-02-2024",
    tipo: "Traidor asesinado",
    estado: "Aprobada",
  },
  {
    id: 12,
    nombre: "Konan",
    fecha: "21-06-2025",
    tipo: "Posible traidor",
    estado: "En Proceso",
  },
  {
    id: 13,
    nombre: "Tobi (Obito Uchiha)",
    fecha: "19-12-2023",
    tipo: "Traidor asesinado",
    estado: "Aprobada",
  },
  {
    id: 14,
    nombre: "Jugo",
    fecha: "08-09-2023",
    tipo: "Posible traidor",
    estado: "Rechazada",
  },
  {
    id: 15,
    nombre: "Kurenai Yuhi",
    fecha: "04-03-2024",
    tipo: "Posible traidor",
    estado: "En Proceso",
  },
];

const ListReports: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();
  const reports = initialReports;
  const [filters, setFilters] = useState({
    nombre: "",
    fecha: "",
    tipo: "",
    estado: "",
  });

  const filteredReports = reports.filter(
    (r) =>
      r.nombre.toLowerCase().includes(filters.nombre.toLowerCase()) &&
      r.fecha.includes(filters.fecha) &&
      r.tipo.toLowerCase().includes(filters.tipo.toLowerCase()) &&
      r.estado.toLowerCase().includes(filters.estado.toLowerCase()),
  );

  const estadoColor = (estado: string) => {
    if (estado === "En Proceso") return "bg-gray-400 text-black";
    if (estado === "Aprobada") return "bg-green-anbu text-white";
    if (estado === "Rechazada") return "bg-red-anbu text-white";
    return "";
  };

  const handleEyeClick = (report: Report) => {
    if (report.tipo === "Traidor asesinado") {
      navigate(`/detalle-asesinado`);
    } else if (report.tipo === "Posible traidor") {
      navigate(`/detalle-posible`);
    }
  };
  return (
    <div className="bg-black-anbu h-full text-white">
      <div className="py-6 text-center">
        <h2 className="text-red-anbu text-xl font-semibold">
          Lista de reportes de traidores
        </h2>
      </div>
      <div className="flex-1 px-2 sm:px-4 md:px-8">
        <div className="mx-auto w-full max-w-full rounded-md bg-gray-800 p-2 sm:p-4 md:max-w-4xl">
          <ScrollArea className="max-h-[50vh] flex-1">
            <table className="bg-grayBlue-anbu w-full rounded text-sm">
              <thead className="sticky top-0 z-10 bg-gray-300 text-black">
                <tr>
                  <th className="px-4 py-2">Nombre Agente</th>
                  <th className="px-4 py-2">Fecha</th>
                  <th className="px-4 py-2">Tipo de reporte</th>
                  <th className="px-4 py-2">Estado</th>
                  <th className="px-4 py-2">Acciones</th>
                </tr>
                <tr className="bg-gray-200">
                  <th>
                    <input
                      type="text"
                      className="text-black-anbu w-full rounded-md p-1 text-center text-xs placeholder:text-center"
                      placeholder="Filtrar"
                      onChange={(e) =>
                        setFilters({ ...filters, nombre: e.target.value })
                      }
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      className="text-black-anbu w-full rounded-md p-1 text-center text-xs placeholder:text-center"
                      placeholder="Filtrar"
                      onChange={(e) =>
                        setFilters({ ...filters, fecha: e.target.value })
                      }
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      className="text-black-anbu w-full rounded-md p-1 text-center text-xs placeholder:text-center"
                      placeholder="Filtrar"
                      onChange={(e) =>
                        setFilters({ ...filters, tipo: e.target.value })
                      }
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      className="text-black-anbu w-full rounded-md p-1 text-center text-xs placeholder:text-center"
                      placeholder="Filtrar"
                      onChange={(e) =>
                        setFilters({ ...filters, estado: e.target.value })
                      }
                    />
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => (
                  <tr key={report.id} className="bg-[#D9E0E6] text-black">
                    <td className="px-4 py-2">{report.nombre}</td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {report.fecha}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <span className="inline-block min-w-[140px] rounded bg-gray-600 px-2 py-1 text-white">
                        {report.tipo}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <span
                        className={`inline-block min-w-[120px] rounded px-2 py-1 ${estadoColor(
                          report.estado,
                        )}`}
                      >
                        {report.estado}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        className="text-red-anbu hover:scale-110"
                        onClick={() => handleEyeClick(report)}
                        type="button"
                        aria-label="Ver detalles"
                      >
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollArea>
        </div>
      </div>
      <div className="mt-6 flex justify-center gap-4">
        <Button
          onClick={() => navigate("/homepage")}
          type="button"
          color="bg-red-anbu"
          className="hover:bg-gray2-anbu"
        >
          Volver
        </Button>

        <Button
          onClick={() => setShowCreateModal(true)}
          type="button"
          color="bg-red-anbu"
          className="hover:bg-gray2-anbu"
        >
          Crear reporte
        </Button>
      </div>
        <CreateReport
      isOpen={showCreateModal}
      onClose={() => setShowCreateModal(false)}
    />
    </div>
  );
};

export default ListReports;
