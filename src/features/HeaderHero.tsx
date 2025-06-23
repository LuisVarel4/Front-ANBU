import { useState, useEffect } from "react";
import fondo from "../assets/ilustrations/itachi_bg.svg";
import MobileMenuButton from "../components/header/MobileMenuButton";
import DesktopNav from "../components/header/DesktopNav";
import MobileMenuOverlay from "../components/header/MobileMenuOverlay";
import BackButton from "../components/header/BackButton";
import WelcomeMessage from "../components/header/WelcomeMessage";
import BellWithNotifications from "../components/header/BellWithNotifications.tsx";
import useScrollLock from "../hooks/useScrollLock";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const textShadow = { textShadow: "1px 1px 4px rgba(0, 0, 0, 0.7)" };
    useScrollLock(isMenuOpen);

    return (
        <div
            className="relative h-screen w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${fondo})` }}
        >
            <header className="absolute top-0 w-full">
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
                    <DesktopNav textShadow={textShadow} />

                    {/* Desktop Bell Icon */}
                    <BellWithNotifications />

                    {/* Mobile Menu Overlay */}
                    <MobileMenuOverlay
                        isOpen={isMenuOpen}
                        closeMenu={() => setIsMenuOpen(false)}
                        textShadow={textShadow}
                    />
                </nav>
            </header>

            <main className="z-0 flex h-full w-full items-center justify-center">
                <WelcomeMessage textShadow={textShadow} />
            </main>
        </div>
    );
}

export default Header;
