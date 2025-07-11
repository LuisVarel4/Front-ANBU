import logoBlanco from "../../assets/icons/mask_icon.png";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../context/auth/context.ts";

interface MobileMenuOverlayProps {
  isOpen: boolean;
  closeMenu: () => void;
}

function MobileMenuOverlay({ isOpen, closeMenu }: MobileMenuOverlayProps) {
  const baseTextColor = "text-gray3-anbu";
  const activeTextColor = "text-red-anbu";
  const hoverTextColor = "hover:text-red-anbu";

  const { logout } = useAuthContext();

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
            to="/reports"
            onClick={closeMenu}
            className={({ isActive }) =>
              `px-6 py-3 text-2xl font-medium transition-colors ${
                isActive ? activeTextColor : baseTextColor
              } ${hoverTextColor}`
            }
          >
            Reportes
          </NavLink>

          <a
            onClick={() => {
              logout();
              closeMenu();
            }}
            className={`px-6 py-3 text-2xl font-medium transition-colors ${baseTextColor} ${hoverTextColor} cursor-pointer`}
          >
            Cerrar sesión
          </a>
        </nav>
      </div>
    </div>
  );
}

export default MobileMenuOverlay;
