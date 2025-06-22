import { useState } from 'react';
import anbuDecoration from '../assets/logos/logo_blanco.png';
import { traidoresData, traidoresExterminadosData } from '../data/traidores';
import TablaRecompensas from '../components/traitors/TablaRecompensas';
import BotonTraidor from '../components/traitors/BotonTraidor';

function Traitors() {
  const [botonActivo, setBotonActivo] = useState<'profugos' | 'exterminados'>('profugos');

  const datosActuales = botonActivo === 'profugos' ? traidoresData : traidoresExterminadosData;

  return (
    <section className="flex flex-col md:flex-row items-center justify-center bg-black-anbu gap-8 md:gap-30 p-4 md:p-10">
      <div className="text-center md:text-left mt-8 md:mt-0">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-red-anbu hover:text-red-400 transition-colors cursor-pointer">
          LISTA NEGRA ANBU
        </h2>
        <p className="text-base sm:text-lg text-gray2-anbu max-w-md px-4 md:px-0">
          Traidores con mayor nivel de búsqueda dentro de la organización.
          <br />
          Todos deben ser exterminados cuanto antes.
        </p>

        <div className="flex flex-col items-center md:items-start gap-3 mb-6 mt-6">
          <BotonTraidor 
            label="Traidores prófugos" 
            icon={anbuDecoration}
            activo={botonActivo === 'profugos'}
            onClick={() => setBotonActivo('profugos')}
          />
          <BotonTraidor 
            label="Traidores exterminados" 
            icon={anbuDecoration}
            activo={botonActivo === 'exterminados'}
            onClick={() => setBotonActivo('exterminados')}
          />
        </div>
      </div>
      <div className="flex flex-col items-center md:items-start">
        <TablaRecompensas data={datosActuales} />
      </div>
      
    </section>
  );
}

export default Traitors; 