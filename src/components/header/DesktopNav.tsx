import logoBlanco from '../../assets/icons/mask_icon.png';
import { Link } from 'react-router-dom';


interface DesktopNavProps {
  textShadow: React.CSSProperties;
}

function DesktopNav({ textShadow }: DesktopNavProps) {
  return (
    <ul className="hidden md:flex justify-center items-center space-x-10">
      <li><a href="#inicio" className="text-xl text-black-anbu block text-center hover:text-red-anbu" style={textShadow}>Inicio</a></li>
      <li><Link to="/mision" className="text-xl text-black-anbu block text-center hover:text-red-anbu" style={textShadow}>Misiones</Link></li>
      <li><img src={logoBlanco} alt="Logo" className="w-16 h-16 md:w-22 md:h-22" /></li>
			<li><Link to="/agent-list" className="text-xl text-black-anbu block text-center hover:text-red-anbu" style={textShadow}> Agentes </Link></li>
      <li><a href="#reportes" className="text-xl text-black-anbu block text-center hover:text-red-anbu" style={textShadow}>Reportes</a></li>
    </ul>
  );
}

export default DesktopNav; 