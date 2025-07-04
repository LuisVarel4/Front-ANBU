import React from "react";
import anbuLetras from "../../assets/logos/anbu-letras.png";
import maskAnbu from "../../assets/ilustrations/Mascara_png-removebg-preview.png";

const HeaderMision: React.FC = () => {
  return (
    <header className="bg-red-anbu flex items-center justify-between px-6 py-4 text-white">
      <h1 className="text-3xl font-bold">Agente</h1>
      <div className="flex items-center gap-4">
        <img src={maskAnbu} alt="ANBU Mask" className="h-12" />
        <img src={anbuLetras} alt="ANBU logo" className="h-10" />
      </div>
    </header>
  );
};

export default HeaderMision;
