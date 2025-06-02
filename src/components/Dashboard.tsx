import logoBlanco from '../assets/logos/logo_blanco.png'
import fondo from '../assets/ilustrations/dashboard_bg.jpg'
import iconoAtras from '../assets/icons/arrow_back.svg'
import iconoCampana from '../assets/icons/campana.png'
import { Link } from 'react-router-dom';

function Dashboard() {

	const textShadow = { textShadow: '1px 1px 4px rgba(0, 0, 0, 0.7)' };

	return (
			<div
				className="relative w-full h-screen bg-cover bg-center"
				style={{ backgroundImage: `url(${fondo})` }}
			>
				<header className="absolute top-0 w-full">
					<nav className="relative flex justify-center items-center">

						<div className="absolute left-5 top-10 -translate-y-1/2">
							<a href="#back">
								<img src={iconoAtras} alt="Regresar" className="w-8 h-8" />
							</a>
						</div>

						{/* Menú de Navegación Central */}
						<ul className="flex justify-center items-center space-x-4">
							<li><a href="#inicio" className="block text-center px-4 py-2 hover:text-red-anbu " style={textShadow}>Inicio</a></li>
							<li>  <Link to="/mision" className="block text-center px-4 py-2 hover:text-red-anbu" style={textShadow}> Misiones </Link></li>
							<li><img src={logoBlanco} alt="Logo" className="w-16 h-16 md:w-20 md:h-20 invert" /></li>
							<li><a href="#agentes" className="block text-center px-4 py-2 hover:text-red-anbu" style={textShadow}>Agentes</a></li>
							<li><a href="#reportes" className="block text-center px-4 py-2   hover:text-red-anbu" style={textShadow}>Reportes</a></li>
						</ul>

						<div className="absolute right-5 top-0 ">
							<img src={iconoCampana} alt="Campana" className="h-45 hover:scale-105 transition-transform duration-300 " />
						</div>
					</nav>
				</header>

				<main className="w-full h-full flex items-center justify-center z-0">
					<section className="absolute bottom-10 left-10 md:bottom-20 md:left-20">
						<h1
							className="text-4xl md:text-6xl font-bold text-red-anbu"
							style={textShadow}
						>
							Bienvenido de nuevo,
							<br />
							Agente.
						</h1>
					</section>
				</main>
			</div>
	);
}

export default Dashboard;