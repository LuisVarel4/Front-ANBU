import { useNavigate } from 'react-router-dom';
import {Button} from '../../components/ui';
import ClipIcon from '../../assets/icons/clip-svgrepo-com.svg';
import React, { useState } from 'react';
import Popup from '../../components/Popup';

const ReportsForm: React.FC = () => {
  const navigate = useNavigate();
  const [popup, setPopup] = useState<{ open: boolean; message: string }>({ open: false, message: '' });

  // Datos de ejemplo, puedes reemplazar por props o datos reales
  const data = {
    tipo: "Posible traidor",
    fecha: "25/06/2025",
    agente: "Luis Varela",
    evidencia: "evidencia.jpg",
    descripcion: "Más falso que moneda de 300 pesos"
  };

  // Función para mostrar el popup
  const showPopup = (message: string) => {
    setPopup({ open: true, message });
  };

  // Función para cerrar el popup
  const closePopup = () => {
    setPopup({ open: false, message: '' });
  };
  return (
    <div className="min-h-screen bg-black-anbu text-white">
      <div className="flex flex-col items-center w-full">
        {/* POPUP */}
        <Popup isOpen={popup.open} onClose={closePopup} message={popup.message} />

        <h2 className="text-center text-xl font-semibold my-6 w-full max-w-5xl mx-auto">
          Vista detallada de reporte
        </h2>
        <form className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 px-0 md:px-8 pb-8 mx-auto">
          {/* Columna izquierda */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block mb-1 font-semibold">Tipo de reporte</label>
              <input
                value={data.tipo}
                disabled
                className="w-full px-3 py-2 rounded bg-gray-200 text-black-anbu font-semibold"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Agente reportado</label>
              <input
                value={data.agente}
                disabled
                className="w-full px-3 py-2 rounded bg-gray-200 text-black-anbu"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-1 font-semibold">Descripción detallada de la situación</label>
              <textarea
                value={data.descripcion}
                disabled
                rows={4}
                className="w-full px-3 py-2 rounded bg-gray-200 text-black-anbu resize-none"
              />
            </div>
          </div>
          {/* Columna derecha */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block mb-1 font-semibold">Fecha</label>
              <div className="relative">
                <input
                  value={data.fecha}
                  disabled
                  className="w-full px-3 py-2 rounded bg-gray-200 text-black-anbu font-semibold pr-10"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-black-anbu">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M7 2v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7Zm12 6v12H5V8h14Zm-7 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/></svg>
                </span>
              </div>
            </div>
            <div>
              <label className="block mb-1 font-semibold">Evidencia</label>
              <div className="relative">
                <input
                  value={data.evidencia}
                  disabled
                  className="w-full px-3 py-2 rounded bg-gray-200 text-black-anbu pr-10"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-black-anbu">
                   <img src={ClipIcon} alt="clip" className="w-5 h-5" />
                </span>
              </div>
            </div>
          </div>
          {/* Botones */}
          <div className="md:col-span-2 flex flex-col md:flex-row gap-4 justify-center mt-4">
            <Button
              type="button"
              color="bg-[#960014]"
              className="w-full md:w-auto"
              onClick={() => showPopup('Petición rechazada')}
            >
              Rechazar petición
            </Button>
            <Button
              type="button"
              color="bg-[#960014]"
              className="w-full md:w-auto"
              onClick={() => showPopup('Traidor creado')}
            >
              Crear traidor
            </Button>
          </div>
          <div className="md:col-span-2 flex justify-center mt-2">
            <Button
              onClick={() => navigate('/reports')}
              type="button"
              color="bg-[#960014]"
              className="w-full md:w-40"
            >
              Volver
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportsForm;