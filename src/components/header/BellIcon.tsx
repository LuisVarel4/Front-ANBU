import iconoCampana from '../../assets/icons/campana.png';

function BellIcon() {
  return (
    <div className="hidden md:block absolute right-5 top-0 group cursor-pointer">
      <img 
        src={iconoCampana} 
        alt="Campana" 
        className="h-35 origin-top transition-transform duration-200 ease-in-out group-hover:rotate-6 group-hover:scale-105" 
      />
    </div>
  );
}

export default BellIcon; 