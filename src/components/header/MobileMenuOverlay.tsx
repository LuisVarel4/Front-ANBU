import logoBlanco from '../../assets/icons/mask_icon.png';

interface MobileMenuOverlayProps {
  isOpen: boolean;
  closeMenu: () => void;
  textShadow: React.CSSProperties;
}

function MobileMenuOverlay({ isOpen, closeMenu, textShadow }: MobileMenuOverlayProps) {
  return (
    <div className={`md:hidden fixed inset-0 bg-black/95 backdrop-blur-sm z-40 transition-opacity duration-300 ${
      isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
      <div className="flex flex-col items-center justify-center h-full space-y-8">
        <img src={logoBlanco} alt="Logo" className="w-20 h-20 mt-15"/>

        <nav className="flex flex-col space-y-6 text-center">
          {["inicio", "Misiones", "agentes", "reportes"].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="text-2xl font-medium text-gray3-anbu hover:text-red-anbu transition-colors px-6 py-3"
              style={textShadow}
              onClick={closeMenu}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}

          <button className="text-2xl font-medium text-gray3-anbu hover:text-red-anbu transition-colors px-6 py-3">
            <span>Notificaciones</span>
          </button>

          <button
            className="text-2xl font-medium text-gray3-anbu hover:text-red-anbu transition-colors px-6 py-3"
            onClick={closeMenu}
          >
            <span>Cerrar sesión</span>
          </button>
        </nav>
      </div>
    </div>
  );
}

export default MobileMenuOverlay; 