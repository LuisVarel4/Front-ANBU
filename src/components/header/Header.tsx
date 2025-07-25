import React, { useState } from "react";

import LogOutButton from "./LogOutButton.tsx";
import DesktopNav from "./DesktopNav.tsx";
import MobileMenuButton from "./MobileMenuButton.tsx";
import MobileMenuOverlay from "./MobileMenuOverlay.tsx";
import BellWithNotifications from "./BellWithNotifications.tsx";

type Props = { color: string; floating?: boolean };
const Header: React.FC<Props> = ({ color, floating }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isRedBg = color.includes("bg-red-anbu");

  return (
    <header
      className={`h-18 w-full ${color} ${floating ? "absolute top-0 left-0 z-50" : ""}`}
    >
      <nav className="relative flex items-center justify-center">
        {/* Mobile Menu Button */}
        <div className="absolute top-10 left-5 z-50 -translate-y-1/2 md:hidden">
          <MobileMenuButton
            isOpen={isMenuOpen}
            toggle={() => setIsMenuOpen(!isMenuOpen)}
            background={isRedBg ? "red" : "transparent"}
          />
        </div>

        {/* Back Button - Desktop only */}
        <LogOutButton background={isRedBg ? "red" : "transparent"} />

        {/* Desktop Navigation */}
        <DesktopNav background={isRedBg ? "red" : "transparent"} />

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
};

export default Header;
