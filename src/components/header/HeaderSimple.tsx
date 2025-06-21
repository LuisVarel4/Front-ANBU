import { useState } from 'react';
import BackButton from './BackButton';
import BellIcon from './BellIcon';
import DesktopNav from './DesktopNav';
import MobileMenuButton from './MobileMenuButton';
import MobileMenuOverlay from './MobileMenuOverlay';

function HeaderSimple() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const textShadow = { textShadow: '1px 1px 4px rgba(0, 0, 0, 0.7)' };
    return (
        <header className="bg-red-anbu/90 top-0 h-20 w-full">
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
    );
  }
  
export default HeaderSimple;