import logoBlanco from "../../assets/icons/mask_icon.png";
import { NavLink, useNavigate } from "react-router-dom";

interface MobileMenuOverlayProps {
  isOpen: boolean;
  closeMenu: () => void;
}

function MobileMenuOverlay({ isOpen, closeMenu }: MobileMenuOverlayProps) {
  const navigate = useNavigate();

  const baseTextColor = "text-gray3-anbu";
  const activeTextColor = "text-red-anbu";
  const hoverTextColor = "hover:text-red-anbu";

  return (
    <div
      className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
        isOpen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="flex h-full flex-col items-center justify-center space-y-8">
        <img src={logoBlanco} alt="Logo" className="mt-15 h-20 w-20" />

        <nav className="flex flex-col space-y-6 text-center">
          <NavLink
            to="/homepage"
            onClick={closeMenu}
            className={({ isActive }) =>
              `px-6 py-3 text-2xl font-medium transition-colors ${
                isActive ? activeTextColor : baseTextColor
              } ${hoverTextColor}`
            }
          >
            Inicio
          </NavLink>

          <NavLink
            to="/mision"
            onClick={closeMenu}
            className={({ isActive }) =>
              `px-6 py-3 text-2xl font-medium transition-colors ${
                isActive ? activeTextColor : baseTextColor
              } ${hoverTextColor}`
            }
          >
            Misiones
          </NavLink>

          <NavLink
            to="/agent-list"
            onClick={closeMenu}
            className={({ isActive }) =>
              `px-6 py-3 text-2xl font-medium transition-colors ${
                isActive ? activeTextColor : baseTextColor
              } ${hoverTextColor}`
            }
          >
            Agentes
          </NavLink>

          <NavLink
            to="/reportes"
            onClick={closeMenu}
            className={({ isActive }) =>
              `px-6 py-3 text-2xl font-medium transition-colors ${
                isActive ? activeTextColor : baseTextColor
              } ${hoverTextColor}`
            }
          >
            Reportes
          </NavLink>

          <NavLink
            to="/auth"
            onClick={closeMenu}
            className={({ isActive }) =>
              `px-6 py-3 text-2xl font-medium transition-colors ${
                isActive ? activeTextColor : baseTextColor
              } ${hoverTextColor}`
            }
          >
            Cerrar sesión
          </NavLink>
        </nav>
      </div>
    </div>
  );
}

export default MobileMenuOverlay;
