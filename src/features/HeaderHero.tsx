import { useState } from 'react'
import fondo from '../assets/ilustrations/itachi_bg.svg'
import MobileMenuButton from '../components/header/MobileMenuButton'
import DesktopNav from '../components/header/DesktopNav'
import MobileMenuOverlay from '../components/header/MobileMenuOverlay'
import BackButton from '../components/header/BackButton'
import BellIcon from '../components/header/BellIcon'
import WelcomeMessage from '../components/header/WelcomeMessage'

function Header() {
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
                        <MobileMenuButton isOpen={isMenuOpen} toggle={() => setIsMenuOpen(!isMenuOpen)} />
                    </div>

                    {/* Back Button - Desktop only */}
                    <BackButton />

                    {/* Desktop Navigation */}
                    <DesktopNav textShadow={textShadow} />

                    {/* Desktop Bell Icon */}
                    <BellIcon />

                    {/* Mobile Menu Overlay */}
                    <MobileMenuOverlay isOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)} textShadow={textShadow} />
                </nav>
            </header>

            <main className="w-full h-full flex items-center justify-center z-0">
                <WelcomeMessage textShadow={textShadow} />
            </main>
        </div>
    );
}

export default Header;