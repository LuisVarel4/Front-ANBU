import { useNavigate } from 'react-router-dom';
import {Button} from '../../components/ui';
import ClipIcon from '../../assets/icons/clip-svgrepo-com.svg';
import React, { useState } from 'react';
import Popup from '../../components/Popup';
import CloseButton from '../../components/CloseButton';

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

  const [showMissionPopup, setShowMissionPopup] = useState(false);

  function TraitorCaptainPopup({ isOpen, onClose, missions }: { isOpen: boolean; onClose: () => void; missions: string[] }) {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 bg-opacity-20 backdrop-blur-md z-30"></div>
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-yellow-anbu border-2 border-yellow-anbu rounded-xl shadow-lg text-center w-96 flex flex-col items-center relative p-4">
          <CloseButton onClick={onClose} />
          <h2 className="text-xl font-bold text-[#960014] mb-2">Traidor identificado como capitán</h2>
          <hr className="border-[#960014] w-full mb-3" />
          <p className="text-black-anbu mb-2">
            El traidor ha sido identificado como capitán en las siguientes misiones:
          </p>
          <div className="bg-gray2-anbu rounded-lg p-2 w-full mb-3 flex flex-col items-start">
            {missions.map((mission, idx) => (
              <div key={idx} className="flex items-center w-full mb-1 last:mb-0">
                <img src="/src/assets/logos/anbuDecoration.svg" alt="icon" className="w-4 h-4 mr-2" />
                <span className="text-red-anbu font-semibold">{mission}</span>
              </div>
            ))}
            {/* Espacios vacíos para igualar el diseño */}
            {[...Array(4 - missions.length)].map((_, idx) => (
              <div key={idx} className="h-6 w-full border-b border-gray-400 opacity-50"></div>
            ))}
          </div>
          <p className="text-black-anbu text-sm mb-4 font-semibold">
            Nota: Se asignarán capitanes aleatorios
          </p>
          <Button
              type="button"
              color="bg-black-anbu"
              className="w-full md:w-auto"
              onClick={() => {
              onClose();
              showPopup('Petición aceptada')
            }}
            >
          Aceptar
        </Button>
        </div>
      </div>
    </>
  );
}

const [showTraitorPopup, setShowTraitorPopup] = useState(false);

// Ejemplo de misiones donde el traidor fue capitán
const traitorMissions = [
  "Recuperar panamá",
  "Defender el catatumbo"
];


  function MissionPopup({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <>
  <div className="fixed inset-0 bg-opacity-20 backdrop-blur-md z-30"></div>
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-yellow-anbu p-4 rounded-xl shadow-lg text-center w-80 flex flex-col items-center relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#960014] text-2xl font-bold"
          aria-label="Cerrar"
        >
          ×
        </button>
        <h2 className="text-xl font-bold text-[#960014] mb-2 text-center">Crear misión caza recompensa</h2>
        <hr className="border-[#960014] w-full mb-4" />
        <label className="w-full text-left text-black-anbu font-semibold mb-1">Agente reportado</label>
        <input
          className="w-full mb-3 px-3 py-2 rounded bg-[#D9DCE1] text-black-anbu"
          disabled
          value="Luis Varela"
        />
        <label className="w-full text-left text-black-anbu font-semibold mb-1">Precio por su cabeza</label>
        <div className="relative w-full mb-4">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black-anbu text-lg pointer-events-none">¥</span>
          <input
            className="w-full px-7 py-2 rounded bg-[#D9DCE1] text-black-anbu"
            placeholder="Ingrese su valor 😈🤑"
            type="number"
            min="0"
          />
        </div>
        <Button
              type="button"
              color="bg-black-anbu"
              className="w-full md:w-auto"
              onClick={() => {
              onClose();
              setShowTraitorPopup(true);
              }}
            >
          Crear
        </Button>
      </div>
    </div>
    </>
  );
}

  return (
    <div className="min-h-screen bg-black-anbu text-white">
      <div className="flex flex-col items-center w-full">
        {/* POPUP */}
        <Popup isOpen={popup.open} onClose={closePopup} message={popup.message} />
        <TraitorCaptainPopup
        isOpen={showTraitorPopup}
        onClose={() => setShowTraitorPopup(false)}
        missions={traitorMissions}
        />
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
              onClick={() => setShowMissionPopup(true)}
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
      <MissionPopup isOpen={showMissionPopup} onClose={() => setShowMissionPopup(false)} />  
      </div>
      <MissionPopup isOpen={showMissionPopup} onClose={() => setShowMissionPopup(false)} />
    </div>
  );
};

export default ReportsForm;