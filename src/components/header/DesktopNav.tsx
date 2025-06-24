import logoBlanco from "../../assets/icons/mask_icon.png";
import { NavLink } from "react-router-dom";
import React from "react";

type Props = {
  background: string;
};

const DesktopNav: React.FC<Props> = ({ background = "transparent" }) => {
  const isRedBg = background === "red";
  const baseTextColor = isRedBg ? "text-white" : "text-gray2-anbu";
  const hoverTextColor = isRedBg
    ? "hover:text-yellow-anbu"
    : "hover:text-red-anbu";
  const activeTextColor = isRedBg ? "text-yellow-anbu" : "text-red-anbu";

  return (
    <ul className="hidden items-center justify-center space-x-10 md:flex text-shadow-lg/30">
      <li>
        <NavLink
          to="/homepage"
          className={({ isActive }) =>
            `block text-center text-xl ${isActive ? activeTextColor : baseTextColor} ${hoverTextColor}`
          }
        >
          Inicio
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/mision"
          className={({ isActive }) =>
            `block text-center text-xl ${isActive ? activeTextColor : baseTextColor} ${hoverTextColor} `
          }
        >
          Misiones
        </NavLink>
      </li>
      <li>
        <img
          src={logoBlanco}
          alt="Logo"
          className="h-16 w-16 md:h-22 md:w-22"
        />
      </li>
      <li>
        <NavLink
          to="/agent-list"
          className={({ isActive }) =>
            `block text-center text-xl ${isActive ? activeTextColor : baseTextColor} ${hoverTextColor}`
          }
        >
          Agentes
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/reports"
          className={({ isActive }) =>
            `block text-center text-xl ${isActive ? activeTextColor : baseTextColor} ${hoverTextColor}`
          }
        >
          Reportes
        </NavLink>
      </li>
    </ul>
  );
};

export default DesktopNav;
