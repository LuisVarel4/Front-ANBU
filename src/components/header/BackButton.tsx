import iconoAtras from '../../assets/icons/arrow_back_anbu.svg';

function BackButton() {
  return (
    <div className="hidden md:block absolute left-5 top-10 -translate-y-1/2 group cursor-pointer">
      <a href="#back">
        <img 
          src={iconoAtras} 
          alt="Cerrar sesión" 
          className="w-11 transition-all duration-300 ease-in-out group-hover:invert group-hover:-translate-x-1" 
        />
      </a>
    </div>
  );
}

export default BackButton; 