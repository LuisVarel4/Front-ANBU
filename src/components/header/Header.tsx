import { useState } from "react";
import BackButton from "./BackButton.tsx";
import DesktopNav from "./DesktopNav.tsx";
import MobileMenuButton from "./MobileMenuButton.tsx";
import MobileMenuOverlay from "./MobileMenuOverlay.tsx";
import BellWithNotifications from "./BellWithNotifications.tsx";

const Header = ({color}: {color: string}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <header className={`top-0 h-20 w-full ${color}`}>
            <nav className="relative flex items-center justify-center">
                {/* Mobile Menu Button */}
                <div className="absolute top-10 left-5 z-50 -translate-y-1/2 md:hidden">
                    <MobileMenuButton
                        isOpen={isMenuOpen}
                        toggle={() => setIsMenuOpen(!isMenuOpen)}
                    />
                </div>

                {/* Back Button - Desktop only */}
                <BackButton />

                {/* Desktop Navigation */}
                <DesktopNav />

                {/* Desktop Bell Icon */}
                <BellWithNotifications />

                {/* Mobile Menu Overlay */}
                <MobileMenuOverlay
                    isOpen={isMenuOpen}
                    closeMenu={() => setIsMenuOpen(false)}
                />
            </nav>
        </header>
    );
}

export default Header;
