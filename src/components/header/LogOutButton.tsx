import LogOutIcon from "../../assets/icons/arrow_back_anbu.svg?react";
import React from "react";
import { useAuthContext } from "../../context/auth/context.ts";

type Props = {
  background: string;
};

const LogOutButton: React.FC<Props> = ({ background }) => {
  const { logout } = useAuthContext();

  const isRedBg = background === "red";
  const hoverEffect = isRedBg
    ? "group-hover:fill-white"
    : "group-hover:fill-red-anbu";
  return (
    <div
      className="group absolute top-10 left-5 hidden -translate-y-1/2 cursor-pointer md:block"
      onClick={logout}
    >
      <LogOutIcon
        className={`w-11 transition-all duration-300 ease-in-out group-hover:-translate-x-1 ${hoverEffect}`}
      />
    </div>
  );
};

export default LogOutButton;
