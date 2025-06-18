import { useState } from 'react'
import logoBlanco from '../assets/logos/logo_blanco.png'
import fondo from '../assets/ilustrations/itachi_bg.svg'
import iconoAtras from '../assets/icons/arrow_back_anbu.svg'
import iconoCampana from '../assets/icons/campana.png'
import { Menu, X } from 'lucide-react'

function Dashboard() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const textShadow = { textShadow: '1px 1px 4px rgba(0, 0, 0, 0.7)' };
    return (
        <div
            className="relative w-full h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${fondo})` }}
        >
            <header className="absolute top-0 w-full">
                <nav className="relative flex justify-center items-center">
                    
                    {/* Mobile Menu Button */}
                    <div className="md:hidden absolute left-5 top-10 -translate-y-1/2 z-50">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-md hover:bg-white/10 transition-colors"
                        >
                            {isMenuOpen ? (
                                <X className="w-6 h-6 text-gray3-anbu" />
                            ) : (
                                <Menu className="w-6 h-6 text-black-anbu" />
                            )}
                        </button>
                    </div>

                    {/* Back Button - Desktop only */}
                    <div className="hidden md:block absolute left-5 top-10 -translate-y-1/2">
                        <a href="#back">
                            <img src={iconoAtras} alt="Regresar" className="w-11 hover:invert hover:scale-105 transition-transform duration-300" />
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex justify-center items-center space-x-10">
                        <li><a href="#inicio" className="text-xl text-black-anbu block text-center hover:text-red-anbu" style={textShadow}>Inicio</a></li>
                        <li><a href="#Misiones" className="text-xl text-black-anbu block text-center hover:text-red-anbu" style={textShadow}>Misiones</a></li>
                        <li><img src={logoBlanco} alt="Logo" className="w-16 h-16 md:w-22 md:h-22 invert" /></li>
                        <li><a href="#agentes" className="text-xl text-black-anbu block text-center hover:text-red-anbu" style={textShadow}>Agentes</a></li>
                        <li><a href="#reportes" className="text-xl text-black-anbu block text-center hover:text-red-anbu" style={textShadow}>Reportes</a></li>
                    </ul>

                    {/* Desktop Bell Icon */}
                    <div className="hidden md:block absolute right-5 top-0">
                        <img src={iconoCampana} alt="Campana" className="h-55 hover:scale-105 transition-transform duration-300" />
                    </div>

                    {/* Mobile Menu Overlay */}
                    <div className={`md:hidden fixed inset-0 bg-black/95 backdrop-blur-sm z-40 transition-opacity duration-300 ${
                        isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}>
                        <div className="flex flex-col items-center justify-center h-full space-y-8">
                            <img src={logoBlanco} alt="Logo" className="w-20 h-20 mb-8" />
                            
                            <nav className="flex flex-col space-y-6 text-center">
                                <a 
                                    href="#inicio" 
                                    className="text-2xl font-medium text-gray3-anbu hover:text-red-anbu transition-colors px-6 py-3" 
                                    style={textShadow}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Inicio
                                </a>
                                <a 
                                    href="#Misiones" 
                                    className="text-2xl font-medium text-gray3-anbu hover:text-red-anbu transition-colors px-6 py-3" 
                                    style={textShadow}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Misiones
                                </a>
                                <a 
                                    href="#agentes" 
                                    className="text-2xl font-medium text-gray3-anbu hover:text-red-anbu transition-colors px-6 py-3" 
                                    style={textShadow}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Agentes
                                </a>
                                <a 
                                    href="#reportes" 
                                    className="text-2xl font-medium text-gray3-anbu hover:text-red-anbu transition-colors px-6 py-3" 
                                    style={textShadow}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Reportes
                                </a>
                            

                                <button className="text-2xl font-medium text-gray3-anbu hover:text-red-anbu transition-colors px-6 py-3">
                                    <span>Notificaciones</span>
                                </button>

                                <button 
                                    className="text-2xl font-medium text-gray3-anbu hover:text-red-anbu transition-colors px-6 py-3"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <span>Cerrar sesión</span>
                                </button>
                            </nav>
                        </div>
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