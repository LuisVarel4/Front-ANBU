import { useRef, useState } from "react";
import anbuDecoration from "../assets/logos/logo_blanco.png";
import { traidoresData, traidoresExterminadosData } from "../data/traidores";
import TablaRecompensas from "../components/traitors/TablaRecompensas";
import BotonTraidor from "../components/traitors/BotonTraidor";
import { motion, useInView } from "framer-motion";

function Traitors() {
  const [botonActivo, setBotonActivo] = useState<"profugos" | "exterminados">(
    "profugos",
  );

  const datosActuales =
    botonActivo === "profugos" ? traidoresData : traidoresExterminadosData;

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.5 });

  return (
    <section className="bg-black-anbu flex flex-col items-center justify-center gap-8 p-4 md:flex-row md:gap-30 md:p-10">
      <div className="mt-8 text-center md:mt-0 md:text-left">
        <h2 className="text-red-anbu mb-2 cursor-pointer text-2xl font-bold transition-colors hover:text-red-400 sm:text-3xl md:text-4xl">
          LISTA NEGRA ANBU
        </h2>
        <p className="text-gray2-anbu max-w-md px-4 text-base sm:text-lg md:px-0">
          Traidores con mayor nivel de búsqueda dentro de la organización.
          <br />
          Todos deben ser exterminados cuanto antes.
        </p>

        <motion.section
          ref={sectionRef}
          initial={{ opacity: 0, x: -80 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-black-anbu flex flex-col items-center justify-center gap-8 p-4 md:flex-row md:gap-30 md:p-10"
        >
          <div className="mt-6 mb-6 flex flex-col items-center gap-3 md:items-start">
            <BotonTraidor
              label="Traidores prófugos"
              icon={anbuDecoration}
              activo={botonActivo === "profugos"}
              onClick={() => setBotonActivo("profugos")}
            />
            <BotonTraidor
              label="Traidores exterminados"
              icon={anbuDecoration}
              activo={botonActivo === "exterminados"}
              onClick={() => setBotonActivo("exterminados")}
            />
          </div>
        </motion.section>
      </div>
      <div className="flex flex-col items-center md:items-start">
        <TablaRecompensas data={datosActuales} />
      </div>
    </section>
  );
}

export default Traitors;
