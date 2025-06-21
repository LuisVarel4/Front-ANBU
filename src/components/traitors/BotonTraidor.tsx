interface BotonTraidorProps {
  label: string;
  icon: string;
  activo?: boolean;
  onClick?: () => void;
}

function BotonTraidor({ label, icon, activo = false, onClick }: BotonTraidorProps) {
  const baseClasses = "flex items-center justify-between w-full sm:w-80 md:w-96 border-2 font-semibold text-base sm:text-lg rounded-xl py-2 sm:py-3 px-4 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl";
  
  const activeClasses = activo 
    ? "bg-transparent border-red-anbu text-red-anbu shadow-red-500/50" 
    : "bg-red-anbu border-red-anbu text-gray3-anbu hover:-translate-y-1 active:translate-y-0";

  return (
    <button 
      className={`${baseClasses} ${activeClasses}`}
      onClick={onClick}
    >
      <span className="text-xl mr-2">
        <img src={icon} alt="decoración anbu" width={24} height={24} className={activo ? "invert" : ""} />
      </span>
      {label}
      <span className="text-xl ml-2">
        <img src={icon} alt="decoración anbu" width={24} height={24} className={activo ? "invert" : ""} />
      </span>
    </button>
  );
}

export default BotonTraidor; 